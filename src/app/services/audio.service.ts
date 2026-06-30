import { Service } from '@angular/core';

/**
 * Lightweight audio + haptic feedback using the Web Audio API. The AudioContext
 * is created lazily on first use so it is unlocked by a user gesture (required by
 * mobile browsers), and tones are synthesised on the fly — no asset files needed.
 */
@Service()
export class AudioService {
  #context: AudioContext | null = null;

  /** Lazily create / resume the shared AudioContext. */
  #ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') {
      return null;
    }
    if (!this.#context) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) {
        return null;
      }
      this.#context = new Ctor();
    }
    if (this.#context.state === 'suspended') {
      void this.#context.resume();
    }
    return this.#context;
  }

  /** Prime the audio context as part of a user gesture (e.g. "Start Workout"). */
  unlock(): void {
    this.#ensureContext();
  }

  /** Play a single tone with a short attack/decay envelope. */
  #tone(frequency: number, durationMs: number, type: OscillatorType = 'sine', gain = 0.18): void {
    const ctx = this.#ensureContext();
    if (!ctx) {
      return;
    }
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);

    const seconds = durationMs / 1000;
    amp.gain.setValueAtTime(0, now);
    amp.gain.linearRampToValueAtTime(gain, now + 0.01);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + seconds);

    osc.connect(amp).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + seconds);
  }

  /** Short countdown beep for the final seconds of a phase. */
  beep(): void {
    this.#tone(880, 130, 'square', 0.14);
    this.#vibrate(40);
  }

  /** Rising two-note chime when a work interval begins. */
  workChime(): void {
    this.#tone(660, 130, 'sine');
    window.setTimeout(() => this.#tone(990, 200, 'sine'), 130);
    this.#vibrate([60, 40, 80]);
  }

  /** Falling two-note chime when a rest interval begins. */
  restChime(): void {
    this.#tone(520, 140, 'sine');
    window.setTimeout(() => this.#tone(390, 220, 'sine'), 140);
    this.#vibrate(80);
  }

  /** Celebratory arpeggio when the workout completes. */
  finishFanfare(): void {
    [523, 659, 784, 1047].forEach((freq, i) => {
      window.setTimeout(() => this.#tone(freq, 220, 'triangle', 0.2), i * 140);
    });
    this.#vibrate([80, 60, 80, 60, 160]);
  }

  #vibrate(pattern: number | number[]): void {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }
}
