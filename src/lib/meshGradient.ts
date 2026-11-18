/**
 * Gradiente mesh animado con un fragment shader mínimo (sin librerías).
 * Renderiza a media resolución, se pausa fuera de pantalla o con la pestaña oculta,
 * y dibuja un solo frame si el usuario prefiere movimiento reducido.
 */
const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 a,b,c,bg;
float blob(vec2 p,vec2 o,float s){vec2 d=p-o;return exp(-dot(d,d)*s);}
void main(){
  vec2 uv=gl_FragCoord.xy/r;float ar=r.x/r.y;vec2 p=vec2(uv.x*ar,uv.y);
  p+=0.06*vec2(sin(p.y*3.1+t*0.31),cos(p.x*2.7-t*0.27));
  float b1=blob(p,vec2(ar*(0.78+0.12*sin(t*0.21)),0.72+0.12*cos(t*0.17)),3.2);
  float b2=blob(p,vec2(ar*(0.95+0.10*cos(t*0.19)),0.25+0.14*sin(t*0.23)),4.8);
  float b3=blob(p,vec2(ar*(0.45+0.18*sin(t*0.13+1.0)),0.95+0.08*sin(t*0.29)),5.0);
  vec3 col=bg;
  col=mix(col,a,b1*0.6);
  col=mix(col,b,b2*0.4);
  col=mix(col,c,b3*0.32);
  float n=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
  col+=(n-0.5)/255.0;
  gl_FragColor=vec4(col,1.0);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.trim().replace('#', '');
  const n = parseInt(h.length === 3 ? h.replace(/./g, '$&$&') : h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function startMeshGradient(canvas: HTMLCanvasElement, reduced: boolean): () => void {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    depth: false,
    powerPreference: 'low-power',
  });
  if (!gl) return () => {};

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return () => {};
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uR = u('r');
  const uT = u('t');

  const setColors = () => {
    const css = getComputedStyle(document.documentElement);
    for (const [name, v] of [
      ['a', '--mesh-a'],
      ['b', '--mesh-b'],
      ['c', '--mesh-c'],
      ['bg', '--mesh-d'],
    ] as const) {
      gl.uniform3fv(u(name), hexToRgb(css.getPropertyValue(v) || '#000'));
    }
  };

  const resize = () => {
    const scale = 0.5; // media resolución: el gradiente es suave, nadie nota la diferencia
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uR, canvas.width, canvas.height);
  };

  let raf = 0;
  let visible = true;
  const start = performance.now() - 8000;
  const draw = (now: number) => {
    gl.uniform1f(uT, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const loop = (now: number) => {
    draw(now);
    raf = requestAnimationFrame(loop);
  };
  const play = () => {
    cancelAnimationFrame(raf);
    if (reduced) draw(performance.now());
    else if (visible && !document.hidden) raf = requestAnimationFrame(loop);
  };

  setColors();
  resize();
  play();
  canvas.dataset.ready = 'true';

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    play();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(() => {
    resize();
    if (reduced) play();
  });
  ro.observe(canvas);
  const onTheme = () => {
    setColors();
    play();
  };
  window.addEventListener('themechange', onTheme);
  document.addEventListener('visibilitychange', play);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('themechange', onTheme);
    document.removeEventListener('visibilitychange', play);
  };
}
