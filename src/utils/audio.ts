// Toby Fox Soundtrack Synthesizer Engine for Undertale & Deltarune

export type TobyFoxTrack = 
  | 'MEGALOVANIA' 
  | 'FALLEN_DOWN' 
  | 'BONETROUSLE' 
  | 'ONCE_UPON_A_TIME' 
  | 'FIELD_OF_HOPES' 
  | 'HOPES_AND_DREAMS';

export interface TrackMetadata {
  id: TobyFoxTrack;
  title: string;
  game: 'Undertale' | 'Deltarune';
  character: string;
  tempoBpm: number;
  description: string;
}

export const TOBY_FOX_TRACKS: TrackMetadata[] = [
  {
    id: 'MEGALOVANIA',
    title: 'MEGALOVANIA',
    game: 'Undertale',
    character: 'Sans',
    tempoBpm: 120,
    description: 'Tema épico e acelerado de batalha de Sans com solos de sintetizador rápidos.'
  },
  {
    id: 'FALLEN_DOWN',
    title: 'Fallen Down',
    game: 'Undertale',
    character: 'Toriel / Ruínas',
    tempoBpm: 80,
    description: 'Melodia calma e nostálgica das Ruínas e do lar de Toriel.'
  },
  {
    id: 'BONETROUSLE',
    title: 'Bonetrousle',
    game: 'Undertale',
    character: 'Papyrus',
    tempoBpm: 150,
    description: 'Tema saltitante e bem-humorado do grande Papyrus!'
  },
  {
    id: 'ONCE_UPON_A_TIME',
    title: 'Once Upon a Time',
    game: 'Undertale',
    character: 'A Lenda do Underground',
    tempoBpm: 100,
    description: 'O tema principal inspirador da história do Underground.'
  },
  {
    id: 'FIELD_OF_HOPES',
    title: 'Field of Hopes and Dreams',
    game: 'Deltarune',
    character: 'Ralsei & O Mundo das Sombras',
    tempoBpm: 130,
    description: 'O empolgante tema do Capítulo 1 do Mundo Escuro de Deltarune.'
  },
  {
    id: 'HOPES_AND_DREAMS',
    title: 'Hopes and Dreams',
    game: 'Undertale',
    character: 'Asriel Dreemurr',
    tempoBpm: 140,
    description: 'Tema de clímax triunfante cheio de Determinação!'
  }
];

// Note frequencies in Hz
const NOTES = {
  // Octave 2/3
  C3: 130.81, Db3: 138.59, D3: 146.83, Eb3: 155.56, E3: 164.81, F3: 174.61, Gb3: 185.00, G3: 196.00, Ab3: 207.65, A3: 220.00, Bb3: 233.08, B3: 246.94,
  // Octave 4
  C4: 261.63, Db4: 277.18, D4: 293.66, Eb4: 311.13, E4: 329.63, F4: 349.23, Gb4: 369.99, G4: 392.00, Ab4: 415.30, A4: 440.00, Bb4: 466.16, B4: 493.88,
  // Octave 5
  C5: 523.25, Db5: 554.37, D5: 587.33, Eb5: 622.25, E5: 659.25, F5: 698.46, Gb5: 739.99, G5: 783.99, Ab5: 830.61, A5: 880.00, Bb5: 932.33, B5: 987.77,
  // Octave 6
  C6: 1046.50, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98,
  REST: 0,
};

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private bgmInterval: number | null = null;
  private currentTrack: TobyFoxTrack = 'ONCE_UPON_A_TIME';
  private isBgmPlaying: boolean = false;
  private volume: number = 0.5; // 0 to 1

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : this.volume;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getCurrentTrack(): TobyFoxTrack {
    return this.currentTrack;
  }

  public isPlaying(): boolean {
    return this.isBgmPlaying && !this.isMuted;
  }

  // --- SOUND EFFECTS ---
  public playTextBlip(pitchOffset: number = 0) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      const freq = 220 + Math.random() * 40 + pitchOffset;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Audio context fallbacks
    }
  }

  public playMoveSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.03 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Ignore
    }
  }

  public playHitSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(40, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.12 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // Ignore
    }
  }

  public playGrazeSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1760, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.05 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  public playHealSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const notes = [261.63, 329.63, 392.00, 523.25];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.06 * this.volume, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.06 + 0.1);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.1);
      });
    } catch {
      // Ignore
    }
  }

  public playSaveSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.08 * this.volume, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.05 + 0.18);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.18);
      });
    } catch {
      // Ignore
    }
  }

  public playSwitchSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(400, this.ctx.currentTime);
      osc.frequency.setValueAtTime(800, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.08 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }

  public playPuzzleSolvedSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0.08 * this.volume, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.15);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.15);
      });
    } catch {
      // Ignore
    }
  }

  public playBattleStartSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(0.15 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignore
    }
  }

  public playAttackSwingSound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.08 * this.volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch {
      // Ignore
    }
  }

  public playVictorySound() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx || !this.masterGain) return;

      const melody = [
        { note: NOTES.C5, duration: 0.12 },
        { note: NOTES.C5, duration: 0.12 },
        { note: NOTES.C5, duration: 0.12 },
        { note: NOTES.E5, duration: 0.25 },
        { note: NOTES.D5, duration: 0.15 },
        { note: NOTES.E5, duration: 0.4 },
      ];

      let now = this.ctx.currentTime;
      melody.forEach((item) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(item.note, now);

        gain.gain.setValueAtTime(0.08 * this.volume, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.duration);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(now);
        osc.stop(now + item.duration);

        now += item.duration + 0.03;
      });
    } catch {
      // Ignore
    }
  }

  // --- TOBY FOX SOUNDTRACK GENERATOR (SYNTHESIZER ENGINE) ---
  public playTrack(track: TobyFoxTrack) {
    this.currentTrack = track;
    this.startBgm(track);
  }

  public startBgm(track: TobyFoxTrack = 'ONCE_UPON_A_TIME') {
    this.stopBgm();
    this.currentTrack = track;
    this.isBgmPlaying = true;
    this.initCtx();

    if (!this.ctx || !this.masterGain) return;

    // Build specific Toby Fox melody & bass note arrays
    let leadNotes: number[] = [];
    let bassNotes: number[] = [];
    let noteDurationMs = 120;
    let waveType: OscillatorType = 'square';

    switch (track) {
      case 'MEGALOVANIA': {
        // Authentic Megalovania Riff Sequence by Toby Fox
        // D D D(8va) A Ab G F D F G | C C D(8va) A Ab G F D F G | B B D(8va) A Ab G F D F G | Bb Bb D(8va) A Ab G F D F G
        noteDurationMs = 110;
        waveType = 'square';

        const seqD = [NOTES.D4, NOTES.D4, NOTES.D5, NOTES.A4, NOTES.REST, NOTES.Ab4, NOTES.REST, NOTES.G4, NOTES.REST, NOTES.F4, NOTES.D4, NOTES.F4, NOTES.G4];
        const seqC = [NOTES.C4, NOTES.C4, NOTES.D5, NOTES.A4, NOTES.REST, NOTES.Ab4, NOTES.REST, NOTES.G4, NOTES.REST, NOTES.F4, NOTES.D4, NOTES.F4, NOTES.G4];
        const seqB = [NOTES.B3, NOTES.B3, NOTES.D5, NOTES.A4, NOTES.REST, NOTES.Ab4, NOTES.REST, NOTES.G4, NOTES.REST, NOTES.F4, NOTES.D4, NOTES.F4, NOTES.G4];
        const seqBb = [NOTES.Bb3, NOTES.Bb3, NOTES.D5, NOTES.A4, NOTES.REST, NOTES.Ab4, NOTES.REST, NOTES.G4, NOTES.REST, NOTES.F4, NOTES.D4, NOTES.F4, NOTES.G4];

        leadNotes = [...seqD, ...seqC, ...seqB, ...seqBb];
        bassNotes = [NOTES.D3, NOTES.D3, NOTES.REST, NOTES.C3, NOTES.C3, NOTES.REST, NOTES.B3, NOTES.B3, NOTES.REST, NOTES.Bb3, NOTES.Bb3, NOTES.REST];
        break;
      }

      case 'FALLEN_DOWN': {
        // Toby Fox - Fallen Down (Toriel/Ruins theme, warm 3/4 waltz)
        noteDurationMs = 210;
        waveType = 'triangle';

        leadNotes = [
          NOTES.E4, NOTES.G4, NOTES.B4, NOTES.A4, NOTES.G4, NOTES.E4,
          NOTES.D4, NOTES.C4, NOTES.D4, NOTES.E4, NOTES.G4, NOTES.E4,
          NOTES.C4, NOTES.B3, NOTES.A3, NOTES.B3, NOTES.C4, NOTES.D4,
          NOTES.E4, NOTES.G4, NOTES.C5, NOTES.B4, NOTES.A4, NOTES.G4,
        ];
        bassNotes = [
          NOTES.C3, NOTES.REST, NOTES.REST, NOTES.A3, NOTES.REST, NOTES.REST,
          NOTES.F3, NOTES.REST, NOTES.REST, NOTES.G3, NOTES.REST, NOTES.REST,
        ];
        break;
      }

      case 'BONETROUSLE': {
        // Toby Fox - Bonetrousle (Papyrus battle theme)
        noteDurationMs = 125;
        waveType = 'sawtooth';

        leadNotes = [
          NOTES.D4, NOTES.F4, NOTES.A4, NOTES.D5, NOTES.C5, NOTES.A4, NOTES.F4, NOTES.D4,
          NOTES.C4, NOTES.E4, NOTES.G4, NOTES.C5, NOTES.B4, NOTES.G4, NOTES.E4, NOTES.C4,
          NOTES.Bb3, NOTES.D4, NOTES.F4, NOTES.Bb4, NOTES.A4, NOTES.F4, NOTES.D4, NOTES.Bb3,
          NOTES.A3, NOTES.C4, NOTES.E4, NOTES.A4, NOTES.G4, NOTES.E4, NOTES.C4, NOTES.A3,
        ];
        bassNotes = [
          NOTES.D3, NOTES.A3, NOTES.D3, NOTES.A3, NOTES.C3, NOTES.G3, NOTES.C3, NOTES.G3,
          NOTES.Bb3, NOTES.F3, NOTES.Bb3, NOTES.F3, NOTES.A3, NOTES.E3, NOTES.A3, NOTES.E3,
        ];
        break;
      }

      case 'FIELD_OF_HOPES': {
        // Toby Fox - Field of Hopes and Dreams (Deltarune Ch.1)
        noteDurationMs = 130;
        waveType = 'square';

        leadNotes = [
          NOTES.D4, NOTES.E4, NOTES.F4, NOTES.A4, NOTES.G4, NOTES.F4, NOTES.E4, NOTES.D4,
          NOTES.C4, NOTES.E4, NOTES.G4, NOTES.C5, NOTES.B4, NOTES.G4, NOTES.E4, NOTES.D4,
          NOTES.F4, NOTES.G4, NOTES.A4, NOTES.C5, NOTES.Bb4, NOTES.A4, NOTES.G4, NOTES.F4,
          NOTES.E4, NOTES.G4, NOTES.B4, NOTES.E5, NOTES.D5, NOTES.B4, NOTES.G4, NOTES.E4,
        ];
        bassNotes = [
          NOTES.D3, NOTES.F3, NOTES.A3, NOTES.C3, NOTES.E3, NOTES.G3,
          NOTES.Bb3, NOTES.D4, NOTES.F4, NOTES.A3, NOTES.C4, NOTES.E4,
        ];
        break;
      }

      case 'HOPES_AND_DREAMS': {
        // Toby Fox - Hopes and Dreams (Asriel climax)
        noteDurationMs = 120;
        waveType = 'sawtooth';

        leadNotes = [
          NOTES.E4, NOTES.E4, NOTES.G4, NOTES.A4, NOTES.B4, NOTES.A4, NOTES.G4, NOTES.E4,
          NOTES.D4, NOTES.D4, NOTES.F4, NOTES.G4, NOTES.A4, NOTES.G4, NOTES.F4, NOTES.D4,
          NOTES.C4, NOTES.C4, NOTES.E4, NOTES.G4, NOTES.A4, NOTES.G4, NOTES.E4, NOTES.C4,
          NOTES.D4, NOTES.E4, NOTES.F4, NOTES.G4, NOTES.A4, NOTES.B4, NOTES.C5, NOTES.D5,
        ];
        bassNotes = [
          NOTES.E3, NOTES.E3, NOTES.REST, NOTES.D3, NOTES.D3, NOTES.REST,
          NOTES.C3, NOTES.C3, NOTES.REST, NOTES.B3, NOTES.B3, NOTES.REST,
        ];
        break;
      }

      case 'ONCE_UPON_A_TIME':
      default: {
        // Toby Fox - Once Upon a Time (Undertale Main Theme)
        noteDurationMs = 175;
        waveType = 'triangle';

        leadNotes = [
          NOTES.C4, NOTES.D4, NOTES.E4, NOTES.G4, NOTES.E4, NOTES.D4, NOTES.C4, NOTES.REST,
          NOTES.E4, NOTES.G4, NOTES.A4, NOTES.C5, NOTES.B4, NOTES.A4, NOTES.G4, NOTES.E4,
          NOTES.C4, NOTES.D4, NOTES.E4, NOTES.D4, NOTES.C4, NOTES.REST, NOTES.G3, NOTES.C4,
        ];
        bassNotes = [
          NOTES.C3, NOTES.REST, NOTES.G3, NOTES.REST, NOTES.A3, NOTES.REST, NOTES.F3, NOTES.REST,
        ];
        break;
      }
    }

    let step = 0;
    this.bgmInterval = window.setInterval(() => {
      if (this.isMuted || !this.isBgmPlaying || !this.ctx || !this.masterGain) return;
      try {
        const leadFreq = leadNotes[step % leadNotes.length];
        const bassFreq = bassNotes[step % bassNotes.length];

        // Lead synth note
        if (leadFreq !== NOTES.REST) {
          const oscLead = this.ctx.createOscillator();
          const gainLead = this.ctx.createGain();

          oscLead.type = waveType;
          oscLead.frequency.setValueAtTime(leadFreq, this.ctx.currentTime);

          const vol = 0.035 * this.volume;
          gainLead.gain.setValueAtTime(vol, this.ctx.currentTime);
          gainLead.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (noteDurationMs / 1000) * 0.88);

          oscLead.connect(gainLead);
          gainLead.connect(this.masterGain);

          oscLead.start();
          oscLead.stop(this.ctx.currentTime + (noteDurationMs / 1000) * 0.88);
        }

        // Bass accompaniment note
        if (bassFreq !== NOTES.REST && step % 2 === 0) {
          const oscBass = this.ctx.createOscillator();
          const gainBass = this.ctx.createGain();

          oscBass.type = 'triangle';
          oscBass.frequency.setValueAtTime(bassFreq, this.ctx.currentTime);

          const volBass = 0.045 * this.volume;
          gainBass.gain.setValueAtTime(volBass, this.ctx.currentTime);
          gainBass.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (noteDurationMs / 1000) * 1.5);

          oscBass.connect(gainBass);
          gainBass.connect(this.masterGain);

          oscBass.start();
          oscBass.stop(this.ctx.currentTime + (noteDurationMs / 1000) * 1.5);
        }

        step++;
      } catch {
        // Ignore audio errors
      }
    }, noteDurationMs);
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.bgmInterval !== null) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const soundEngine = new SoundEngine();
