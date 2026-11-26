/**
 * Sonidos de la interfaz sintetizados con Web Audio, salvo el gruñido del oso y el maullido de la gata,
 * que son audios. Solo suenan tras un clic del visitante.
 */

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

/** Audios reales: se cargan la primera vez que se usan. */
const clips: Record<string, HTMLAudioElement> = {};
function clip(file: string, volume: number) {
  const el = (clips[file] ??= new Audio(`${import.meta.env.BASE_URL}assets/sounds/${file}`));
  el.volume = volume;
  el.currentTime = 0;
  void el.play().catch(() => {});
}

const sounds: Record<SoundName, () => void> = {
  // Gruñido: Universfield (Pixabay). Maullido: audio que eligió Zannián.
  growl: () => clip('oso.mp3', 0.7),
  meow: () => clip('gata.mp3', 0.8),
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

export function play(name: SoundName) {
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
