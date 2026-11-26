/**
 * Sonidos de la interfaz sintetizados con Web Audio (sin archivos), salvo el gruñido del oso, que es un audio.
 * Solo suenan tras un clic del visitante y se pueden apagar desde la barra (prefs.ts).
 */
import { soundOn } from './prefs';

export type SoundName = 'growl' | 'meow' | 'chime' | 'pop' | 'tick' | 'success' | 'error' | 'none';

let ctx: AudioContext | undefined;
let master: GainNode;

function audio() {
  if (!ctx) {
    ctx = new AudioContext();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
}

/** Nota corta con envolvente: sube en `attack` y se apaga en `dur`. */
function tone(
  type: OscillatorType,
  from: number,
  to: number,
  start: number,
  dur: number,
  vol: number,
) {
  const a = audio();
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + dur);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(vol, start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(master);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

/** Gruñido del oso: audio real (Universfield, Pixabay), se carga solo la primera vez que se usa. */
let growlAudio: HTMLAudioElement | undefined;
function growl() {
  growlAudio ??= new Audio(`${import.meta.env.BASE_URL}assets/sounds/oso.mp3`);
  growlAudio.volume = 0.7;
  growlAudio.currentTime = 0;
  void growlAudio.play().catch(() => {});
}

/** Maullido: tono que sube y baja ("mi-au") pasado por un filtro que imita la boca abriéndose. */
function meow() {
  const a = audio();
  const t = a.currentTime;
  const dur = 0.55;
  const osc = a.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(520, t);
  osc.frequency.linearRampToValueAtTime(820, t + 0.18);
  osc.frequency.linearRampToValueAtTime(460, t + dur);
  const mouth = a.createBiquadFilter();
  mouth.type = 'bandpass';
  mouth.Q.value = 4;
  mouth.frequency.setValueAtTime(700, t);
  mouth.frequency.linearRampToValueAtTime(1600, t + 0.2);
  mouth.frequency.linearRampToValueAtTime(800, t + dur);
  const env = a.createGain();
  env.gain.setValueAtTime(0.0001, t);
  env.gain.exponentialRampToValueAtTime(0.5, t + 0.05);
  env.gain.setValueAtTime(0.5, t + 0.3);
  env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(mouth).connect(env).connect(master);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

const sounds: Record<SoundName, () => void> = {
  growl,
  meow,
  chime: () => {
    const t = audio().currentTime;
    [1319, 1760, 2637].forEach((f, i) => tone('sine', f, f, t + i * 0.07, 0.5, 0.18));
  },
  pop: () => tone('sine', 620, 280, audio().currentTime, 0.09, 0.22),
  tick: () => tone('triangle', 1900, 1500, audio().currentTime, 0.03, 0.06),
  success: () => {
    const t = audio().currentTime;
    [659, 880, 1319].forEach((f, i) => tone('triangle', f, f, t + i * 0.09, 0.35, 0.2));
  },
  error: () => tone('square', 190, 120, audio().currentTime, 0.25, 0.08),
  none: () => {},
};

export function play(name: SoundName, force = false) {
  if (!force && !soundOn()) return;
  try {
    sounds[name]();
  } catch {
    /* navegador sin Web Audio: la web sigue igual, sin sonido */
  }
}

/** Clics de toda la web: `data-sound` elige el sonido; cualquier otro enlace o botón hace un "tick". */
export function initClickSounds() {
  const onClick = (e: MouseEvent) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('[data-sound], a, button');
    if (!el) return;
    play((el.dataset.sound as SoundName | undefined) ?? 'tick');
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
