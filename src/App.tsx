import React, { useState, useEffect } from 'react';
import { GameState, FriendPreset, PlayerStats } from './types';
import { defaultFriendPreset, defaultInventoryItems } from './data/defaultPreset';
import { soundEngine, TobyFoxTrack } from './utils/audio';
import { Overworld } from './components/Overworld';
import { BattleScreen } from './components/BattleScreen';
import { BirthdayCardEnding } from './components/BirthdayCardEnding';
import { CastIntroPresentation } from './components/CastIntroPresentation';
import { CustomizerModal } from './components/CustomizerModal';
import { HowToPlayModal } from './components/HowToPlayModal';
import { JukeboxModal } from './components/JukeboxModal';
import { Heart, Sparkles, Play, Edit, HelpCircle, Music, VolumeX, Disc } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [preset, setPreset] = useState<FriendPreset>(defaultFriendPreset);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showJukebox, setShowJukebox] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<TobyFoxTrack>('ONCE_UPON_A_TIME');
  const [endingType, setEndingType] = useState<'PACIFIST' | 'NEUTRAL'>('PACIFIST');

  // Player stats
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    hp: 20,
    maxHp: 20,
    lv: 1,
    gold: 50,
    items: [...defaultInventoryItems],
    moralPoints: 0,
  });

  // Start background menu theme with Toby Fox tracks per game phase
  useEffect(() => {
    if (gameState === 'MENU' || gameState === 'INTRO') {
      soundEngine.startBgm('ONCE_UPON_A_TIME');
      setCurrentTrack('ONCE_UPON_A_TIME');
    } else if (gameState === 'OVERWORLD') {
      soundEngine.startBgm('FALLEN_DOWN');
      setCurrentTrack('FALLEN_DOWN');
    } else if (gameState === 'BATTLE') {
      soundEngine.startBgm('MEGALOVANIA');
      setCurrentTrack('MEGALOVANIA');
    } else if (gameState === 'ENDING') {
      soundEngine.startBgm('HOPES_AND_DREAMS');
      setCurrentTrack('HOPES_AND_DREAMS');
    }
    return () => soundEngine.stopBgm();
  }, [gameState]);

  const handleToggleMute = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectTrack = (track: TobyFoxTrack) => {
    setCurrentTrack(track);
    soundEngine.playTrack(track);
  };

  const handleStartGame = () => {
    soundEngine.playBattleStartSound();
    // Reset player stats for fresh play
    setPlayerStats({
      hp: 20,
      maxHp: 20,
      lv: 1,
      gold: 50,
      items: [...defaultInventoryItems],
      moralPoints: 0,
    });
    setGameState('INTRO');
  };

  return (
    <div className="min-h-screen bg-black font-mono text-white select-none relative overflow-x-hidden">
      {/* 1. MAIN MENU SCREEN */}
      {gameState === 'MENU' && (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-black to-black">
          {/* Audio toggle corner buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setShowJukebox(true)}
              className="p-2.5 bg-yellow-950/80 border-2 border-yellow-400 hover:bg-yellow-900 rounded text-xs font-bold text-yellow-300 transition flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
            >
              <Disc className="w-4 h-4 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline">Trilha Toby Fox</span>
            </button>
            <button
              onClick={handleToggleMute}
              className="p-2.5 bg-neutral-900 border border-neutral-700 hover:border-yellow-400 rounded text-xs transition flex items-center gap-2"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Music className="w-4 h-4 text-green-400" />}
              <span className="hidden sm:inline">{isMuted ? 'Mudo' : 'Som ON'}</span>
            </button>
          </div>

          {/* Undertale Style Main Menu Card */}
          <div className="w-full max-w-xl bg-black border-4 border-white p-6 sm:p-10 rounded-sm shadow-[0_0_35px_rgba(255,255,255,0.15)] text-center space-y-8 relative">
            {/* Title Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2 text-red-500 animate-pulse">
                <Heart className="w-6 h-6 fill-red-500" />
                <span className="text-xs font-bold tracking-widest uppercase">SERVIDOR RPG UHGOTALE</span>
                <Heart className="w-6 h-6 fill-red-500" />
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)] uppercase">
                UHGOTALE: NIVER LENDÁRIO
              </h1>

              <div className="text-yellow-400 font-bold text-sm sm:text-base tracking-widest uppercase flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>EDIÇÃO ESPECIAL PARA {preset.friendName.toUpperCase()}</span>
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
            </div>

            {/* Iconic Determination Quote Box */}
            <div className="bg-neutral-950 border-2 border-neutral-800 p-4 rounded text-xs sm:text-sm text-yellow-300 font-bold leading-relaxed text-left">
              * O aniversário de <span className="text-white uppercase font-black">{preset.friendName}</span> enche você de <span className="text-red-500 font-extrabold uppercase animate-pulse">DETERMINAÇÃO</span>.
            </div>

            {/* Menu Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleStartGame}
                className="w-full p-4 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-sm sm:text-base border-2 border-white rounded shadow-lg transition active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Play className="w-5 h-5 text-black fill-black group-hover:scale-110 transition-transform" />
                <span>NOVO JOGO (INICIAR AVENTURA)</span>
              </button>

              <button
                onClick={() => setGameState('INTRO')}
                className="w-full p-3 bg-purple-950/70 hover:bg-purple-900 border-2 border-purple-400 text-purple-200 font-bold text-xs sm:text-sm rounded transition flex items-center justify-center gap-2 shadow"
              >
                <span>🎭 Apresentação do Elenco (Abertura)</span>
              </button>

              <button
                onClick={() => setShowJukebox(true)}
                className="w-full p-3 bg-yellow-950/60 hover:bg-yellow-900/80 border-2 border-yellow-400 text-yellow-200 font-bold text-xs sm:text-sm rounded transition flex items-center justify-center gap-2 shadow"
              >
                <Disc className="w-4 h-4 text-yellow-400" />
                <span>🎵 Trilha Sonora de Toby Fox (Jukebox)</span>
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => setShowCustomizer(true)}
                  className="p-3 bg-purple-950 hover:bg-purple-900 border-2 border-purple-400 text-purple-200 font-bold text-xs sm:text-sm rounded transition flex items-center justify-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Editar Memórias & Piadas</span>
                </button>

                <button
                  onClick={() => setShowHowToPlay(true)}
                  className="p-3 bg-neutral-900 hover:bg-neutral-800 border-2 border-neutral-600 text-neutral-200 font-bold text-xs sm:text-sm rounded transition flex items-center justify-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Como Jogar</span>
                </button>
              </div>
            </div>

            {/* Footer info */}
            <div className="text-[11px] text-neutral-500 border-t border-neutral-800 pt-3">
              Um presente interativo criado por <span className="text-neutral-300 font-bold">{preset.creatorName}</span>
            </div>
          </div>
        </div>
      )}

      {/* 1.5 CAST INTRO PRESENTATION */}
      {gameState === 'INTRO' && (
        <CastIntroPresentation
          preset={preset}
          onStartGame={() => {
            soundEngine.playBattleStartSound();
            setGameState('OVERWORLD');
          }}
          onBackToMenu={() => setGameState('MENU')}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {/* 2. OVERWORLD CHAPTER 1 */}
      {gameState === 'OVERWORLD' && (
        <Overworld
          preset={preset}
          playerStats={playerStats}
          setPlayerStats={setPlayerStats}
          onTriggerBattle={() => setGameState('BATTLE')}
          onOpenCustomizer={() => setShowCustomizer(true)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenJukebox={() => setShowJukebox(true)}
        />
      )}

      {/* 3. FINAL BOSS BATTLE CHAPTER 2 */}
      {gameState === 'BATTLE' && (
        <BattleScreen
          preset={preset}
          playerStats={playerStats}
          setPlayerStats={setPlayerStats}
          onBattleEnd={(ending) => {
            setEndingType(ending);
            setGameState('ENDING');
          }}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenJukebox={() => setShowJukebox(true)}
        />
      )}

      {/* 4. BIRTHDAY CELEBRATION ENDING CARD */}
      {gameState === 'ENDING' && (
        <BirthdayCardEnding
          preset={preset}
          endingType={endingType}
          onRestart={() => setGameState('MENU')}
          onOpenCustomizer={() => setShowCustomizer(true)}
        />
      )}

      {/* MODALS */}
      {showJukebox && (
        <JukeboxModal
          isOpen={showJukebox}
          onClose={() => setShowJukebox(false)}
          currentTrack={currentTrack}
          onSelectTrack={handleSelectTrack}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />
      )}

      {showCustomizer && (
        <CustomizerModal
          preset={preset}
          onSavePreset={(newPreset) => setPreset(newPreset)}
          onClose={() => setShowCustomizer(false)}
        />
      )}

      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
    </div>
  );
}

