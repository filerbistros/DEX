// Web Audio API Sound Synthesizer (No external audio file dependencies needed)

class SoundAlertsService {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public playOpportunityFound(spreadPct: number) {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;

      const now = this.audioCtx.currentTime;

      if (spreadPct >= 3.0) {
        // High Spread: Golden chime (C6 -> E6 -> G6)
        this.playTone(1046.50, now, 0.12, 'sine', 0.25);
        this.playTone(1318.51, now + 0.1, 0.15, 'sine', 0.25);
        this.playTone(1567.98, now + 0.22, 0.35, 'triangle', 0.3);
      } else if (spreadPct >= 1.5) {
        // Medium Spread: Crisp ping (A5 -> E6)
        this.playTone(880.00, now, 0.1, 'sine', 0.2);
        this.playTone(1318.51, now + 0.08, 0.25, 'sine', 0.25);
      } else {
        // Low Spread: Soft blip
        this.playTone(659.25, now, 0.08, 'sine', 0.15);
      }
    } catch {
      // Audio context might be restricted before first user interaction
    }
  }

  private playTone(freq: number, startTime: number, duration: number, type: OscillatorType = 'sine', gainVal = 0.2) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(gainVal, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const soundAlerts = new SoundAlertsService();
