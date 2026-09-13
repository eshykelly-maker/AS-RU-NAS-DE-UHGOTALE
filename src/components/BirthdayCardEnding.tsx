import React, { useState, useEffect, useRef } from 'react';
import { FriendPreset } from '../types';
import { soundEngine } from '../utils/audio';
import { RetroText } from './RetroText';
import { TheEndPhotoScreen } from './TheEndPhotoScreen';
import { PartyPopper, Heart, Sparkles, Copy, Check, RotateCcw, Trophy, Gift, Award, Camera, Upload, Edit3, Image as ImageIcon, Music, Volume2, Film } from 'lucide-react';

interface BirthdayCardEndingProps {
  preset: FriendPreset;
  endingType: 'PACIFIST' | 'NEUTRAL';
  onRestart: () => void;
  onOpenCustomizer: () => void;
}

type TabType = 'THE_END' | 'PHOTO_CARD' | 'RPG_STORY' | 'EDIT_CARD';

export const BirthdayCardEnding: React.FC<BirthdayCardEndingProps> = ({
  preset,
  endingType,
  onRestart,
  onOpenCustomizer,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('THE_END');
  const [copied, setCopied] = useState(false);

  // Local card state for live editing inside the ending view
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string>(
    preset.photoUrl || 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80'
  );
  const [currentWishMessage, setCurrentWishMessage] = useState<string>(preset.birthdayWishMessage);
  const [currentFriendName, setCurrentFriendName] = useState<string>(preset.friendName);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    soundEngine.playVictorySound();
    soundEngine.startBgm('HOPES_AND_DREAMS');
    return () => soundEngine.stopBgm();
  }, []);

  const handleCopyCardText = () => {
    const cardText = `🎉 PARABÉNS, ${currentFriendName.toUpperCase()}! 🎉\n\n` +
      `Você concluiu a jornada lendária no RPG de Aniversário inspirado em Undertale & Deltarune!\n\n` +
      `💌 Mensagem Especial de ${preset.creatorName}:\n` +
      `"${currentWishMessage}"\n\n` +
      `🤣 Piadas Internas & Memórias Relembradas:\n` +
      preset.insideJokes.map((j) => `• ${j.title}: ${j.description}`).join('\n') +
      `\n\n✨ Sua amizade enche este dia de DETERMINAÇÃO! Feliz Aniversário! 👑🎂`;

    navigator.clipboard.writeText(cardText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Handle local photo file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCurrentPhotoUrl(event.target.result as string);
          soundEngine.playHealSound();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const playFanfare = () => {
    soundEngine.playVictorySound();
  };

  if (activeTab === 'THE_END') {
    return (
      <div className="relative">
        <div className="fixed top-2 right-2 z-50 flex items-center gap-2">
          <button
            onClick={() => {
              soundEngine.playMoveSound();
              setActiveTab('PHOTO_CARD');
            }}
            className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs rounded border border-white shadow-lg transition flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Ver Cartão de Aniversário</span>
          </button>
        </div>
        <TheEndPhotoScreen
          preset={preset}
          onOpenCard={() => setActiveTab('PHOTO_CARD')}
          onRestart={onRestart}
          onShareWhatsApp={handleCopyCardText}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 p-3 sm:p-6 flex flex-col items-center justify-center text-white font-mono select-none relative overflow-x-hidden">
      {/* Background Animated Confetti Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#eab308_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Celebration Header */}
      <div className="w-full max-w-3xl text-center space-y-3 mb-4 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/20 border-2 border-yellow-400 text-yellow-300 rounded-full text-xs sm:text-sm font-bold tracking-widest uppercase animate-pulse">
          <PartyPopper className="w-5 h-5 text-yellow-400" />
          <span>FIM DE JOGO - FINAL {endingType === 'PACIFIST' ? 'AMIZADE PACIFISTA' : 'NEUTRO LENDÁRIO'}</span>
          <PartyPopper className="w-5 h-5 text-yellow-400" />
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 drop-shadow-md">
          FELIZ ANIVERSÁRIO, {currentFriendName.toUpperCase()}! 👑🎂
        </h1>

        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto">
          Você enfrentou o desafio, compartilhou risadas e provou que a amizade é a maior força do Underground!
        </p>
      </div>

      {/* Tabs Navigation Header */}
      <div className="w-full max-w-3xl flex items-center justify-center gap-2 mb-4 z-10 font-mono text-xs sm:text-sm">
        <button
          onClick={() => {
            soundEngine.playMoveSound();
            setActiveTab('THE_END');
          }}
          className="px-4 py-2.5 rounded-t-lg border-2 border-b-0 font-extrabold transition flex items-center gap-2 bg-neutral-900 text-amber-300 border-neutral-700 hover:border-amber-400 hover:text-white"
        >
          <Film className="w-4 h-4 text-amber-400" />
          <span>🖼️ FOTO "THE END"</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playMoveSound();
            setActiveTab('PHOTO_CARD');
          }}
          className={`px-4 py-2.5 rounded-t-lg border-2 border-b-0 font-extrabold transition flex items-center gap-2 ${
            activeTab === 'PHOTO_CARD'
              ? 'bg-yellow-400 text-black border-yellow-400 shadow-[0_-4px_12px_rgba(234,179,8,0.4)]'
              : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>📸 CARTÃO & MENSAGEM</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playMoveSound();
            setActiveTab('RPG_STORY');
          }}
          className={`px-4 py-2.5 rounded-t-lg border-2 border-b-0 font-extrabold transition flex items-center gap-2 ${
            activeTab === 'RPG_STORY'
              ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_-4px_12px_rgba(34,211,238,0.4)]'
              : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>📜 HISTÓRIA & PIADAS</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playMoveSound();
            setActiveTab('EDIT_CARD');
          }}
          className={`px-4 py-2.5 rounded-t-lg border-2 border-b-0 font-extrabold transition flex items-center gap-2 ${
            activeTab === 'EDIT_CARD'
              ? 'bg-purple-400 text-black border-purple-400 shadow-[0_-4px_12px_rgba(192,132,252,0.4)]'
              : 'bg-neutral-900 text-neutral-400 border-neutral-700 hover:text-white'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>⚙️ EDITAR FOTO & MENSAGEM</span>
        </button>
      </div>

      {/* Main Content Box for Active Tab */}
      <div className="w-full max-w-3xl bg-black border-4 border-yellow-400 p-5 sm:p-8 rounded-lg shadow-[0_0_40px_rgba(234,179,8,0.3)] space-y-6 relative overflow-hidden z-10">
        <Sparkles className="absolute top-3 left-3 text-yellow-400 w-6 h-6 animate-spin" />
        <Sparkles className="absolute top-3 right-3 text-pink-400 w-6 h-6 animate-pulse" />
        <Heart className="absolute bottom-3 left-3 text-red-500 fill-red-500 w-6 h-6 animate-bounce" />

        {/* TAB 1: PHOTO & MESSAGE BIRTHDAY CARD */}
        {activeTab === 'PHOTO_CARD' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Friend Photo Frame Section */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative group">
                {/* Glowing Golden RPG Frame */}
                <div className="w-44 h-44 sm:w-52 sm:h-52 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 rounded-2xl p-2 shadow-[0_0_25px_rgba(234,179,8,0.6)] border-4 border-white overflow-hidden flex items-center justify-center">
                  <img
                    src={currentPhotoUrl}
                    alt={`Foto de ${currentFriendName}`}
                    className="w-full h-full object-cover rounded-xl border-2 border-black"
                    onError={(e) => {
                      // Fallback image if url is broken
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80';
                    }}
                  />
                </div>

                {/* Quick Upload Button on Image Hover */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-2 bg-yellow-400 text-black font-bold rounded-full border-2 border-black shadow-lg hover:scale-110 transition flex items-center gap-1 text-xs"
                  title="Trocar Foto"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Trocar</span>
                </button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />

              <div>
                <div className="text-yellow-300 font-extrabold text-xl sm:text-2xl tracking-wide flex items-center justify-center gap-2">
                  <span>👑 {currentFriendName}</span>
                </div>
                <div className="text-xs text-neutral-400 mt-1">
                  {preset.bossTitle} | Cartão Especial de <span className="text-white font-bold">{preset.creatorName}</span>
                </div>
              </div>
            </div>

            {/* Heartfelt Birthday Message Letter */}
            <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-yellow-400/80 p-5 rounded-lg space-y-3 relative shadow-inner">
              <div className="flex items-center justify-between border-b border-yellow-500/30 pb-2">
                <div className="text-yellow-400 font-extrabold text-sm tracking-wide uppercase flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  <span>MENSAGEM DE FELIZ ANIVERSÁRIO:</span>
                </div>
                <button
                  onClick={playFanfare}
                  className="p-1.5 bg-yellow-400/20 hover:bg-yellow-400/40 text-yellow-300 border border-yellow-400 rounded text-xs flex items-center gap-1 transition"
                  title="Tocar Fanfarra de Aniversário"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Tocar Vinheta 🎺</span>
                </button>
              </div>

              <p className="whitespace-pre-wrap text-neutral-100 font-mono text-sm leading-relaxed italic p-1">
                "{currentWishMessage}"
              </p>
            </div>

            {/* Quick Share / Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleCopyCardText}
                className="flex-1 min-w-[220px] p-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm rounded border-2 border-white transition flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                {copied ? <Check className="w-4 h-4 text-black" /> : <Copy className="w-4 h-4 text-black" />}
                <span>{copied ? 'MENSAGEM COPIADA!' : 'COPIAR CARTÃO PARA O WHATSAPP'}</span>
              </button>

              <button
                onClick={() => setActiveTab('EDIT_CARD')}
                className="px-4 py-3.5 bg-purple-900 hover:bg-purple-800 text-purple-200 font-bold text-xs rounded border border-purple-400 transition flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                <span>Mudar Foto / Mensagem</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: RPG STORY & INSIDE JOKES */}
        {activeTab === 'RPG_STORY' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Story Summary Banner */}
            <div className="bg-neutral-900 border-2 border-cyan-400 p-4 rounded space-y-2 text-xs leading-relaxed">
              <div className="text-cyan-300 font-extrabold text-sm uppercase flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cyan-300" />
                <span>RESUMO DA JORNADA RPG DE ANIVERSÁRIO</span>
              </div>
              <p className="text-neutral-300">
                Iniciando no Reino das Velas de Niver, Kris, Susie e Ralsei juntaram forças com {preset.creatorName}. 
                Vocês enfrentaram tempestades de confete, desvendaram piadas infames e provaram que nem o chefão supremo consegue resistir ao poder da amizade e da comemoração!
              </p>
            </div>

            {/* Inside Jokes List */}
            <div className="space-y-3">
              <div className="text-yellow-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-yellow-300" />
                <span>PIADAS INTERNAS & LEMBRANÇAS DESBLOQUEADAS NA BATALHA:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {preset.insideJokes.map((joke, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-900 p-3 rounded border border-neutral-700 flex items-start gap-2.5"
                  >
                    <span className="text-yellow-400 font-bold text-sm">★</span>
                    <div>
                      <div className="font-bold text-yellow-200">{joke.title}</div>
                      <div className="text-[11px] text-neutral-300 mt-0.5">{joke.description}</div>
                      <div className="text-[10px] text-cyan-300 italic mt-1">
                        " Fala do Amigo: {joke.bossReaction} "
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Party Status Badges */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-bold border-t border-neutral-800 pt-3">
              <div className="bg-cyan-950 border border-cyan-500 p-2 rounded text-cyan-300">
                🛡️ KRIS: LV 99 DETERMINAÇÃO
              </div>
              <div className="bg-fuchsia-950 border border-fuchsia-500 p-2 rounded text-fuchsia-300">
                🪓 SUSIE: AMIZADE MÁXIMA
              </div>
              <div className="bg-emerald-950 border border-emerald-500 p-2 rounded text-emerald-300">
                ✨ RALSEI: BOLO INFINITO
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: EDIT PHOTO & MESSAGE DIRECTLY */}
        {activeTab === 'EDIT_CARD' && (
          <div className="space-y-4 animate-fadeIn text-xs">
            <div className="text-purple-300 font-bold text-sm uppercase flex items-center gap-2 border-b border-purple-500/40 pb-2">
              <Edit3 className="w-4 h-4 text-purple-300" />
              <span>EDITAR FOTO E MENSAGEM DO CARTÃO EM TEMPO REAL</span>
            </div>

            {/* Photo Selection / Upload Controls */}
            <div className="space-y-2">
              <label className="block text-yellow-300 font-bold">1. Foto do Aniversariante:</label>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="w-20 h-20 bg-neutral-900 border-2 border-yellow-400 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={currentPhotoUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 space-y-2 w-full">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full p-2 bg-purple-900 hover:bg-purple-800 text-purple-200 border border-purple-400 rounded font-bold flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Carregar Foto do Computador/Celular</span>
                  </button>
                  <input
                    type="text"
                    placeholder="Ou cole o Link / URL da Imagem aqui"
                    value={currentPhotoUrl.startsWith('data:') ? 'Foto Carregada do Arquivo' : currentPhotoUrl}
                    onChange={(e) => setCurrentPhotoUrl(e.target.value)}
                    className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Name Field */}
            <div>
              <label className="block text-yellow-300 font-bold mb-1">2. Nome do Aniversariante:</label>
              <input
                type="text"
                value={currentFriendName}
                onChange={(e) => setCurrentFriendName(e.target.value)}
                className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono text-xs"
              />
            </div>

            {/* Birthday Message Textarea */}
            <div>
              <label className="block text-yellow-300 font-bold mb-1">3. Mensagem de Feliz Aniversário:</label>
              <textarea
                rows={4}
                value={currentWishMessage}
                onChange={(e) => setCurrentWishMessage(e.target.value)}
                className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono text-xs leading-relaxed"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  soundEngine.playHealSound();
                  setActiveTab('PHOTO_CARD');
                }}
                className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs rounded border-2 border-white transition flex items-center gap-2 shadow-lg"
              >
                <Check className="w-4 h-4" />
                <span>VISUALIZAR CARTÃO PRONTO</span>
              </button>
            </div>
          </div>
        )}

        {/* Global Bottom Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-800 pt-4">
          <button
            onClick={onOpenCustomizer}
            className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-bold text-xs rounded border border-neutral-700 transition"
          >
            ✏️ Editor Geral de Memórias
          </button>

          <button
            onClick={onRestart}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded border border-white/60 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Voltar ao Menu Principal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

