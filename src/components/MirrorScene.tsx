import React, { useState, useEffect } from 'react';
import { FriendPreset } from '../types';
import { soundEngine } from '../utils/audio';
import { RetroText } from './RetroText';
import { Heart, Sparkles, ArrowLeft, Eye, RefreshCw } from 'lucide-react';

interface MirrorSceneProps {
  preset: FriendPreset;
  onClose: () => void;
}

export const MirrorScene: React.FC<MirrorSceneProps> = ({ preset, onClose }) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [isSparkling, setIsSparkling] = useState(false);
  const [currentMemory, setCurrentMemory] = useState<string | null>(null);

  const mirrorQuotes = [
    `É você!`,
    `Apesar de tudo, ainda é você, ${preset.friendName}.`,
    `Mais um ano se passou, e todas as suas experiências moldaram quem você é hoje.`,
    `Olhar para o seu próprio reflexo enche você de DETERMINAÇÃO.`,
  ];

  // Play a soft chime on mirror approach
  useEffect(() => {
    soundEngine.playSaveSound();
  }, []);

  const handleTouchMirror = () => {
    soundEngine.playHealSound();
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 2000);
  };

  const handleRecallMemory = () => {
    soundEngine.playVictorySound();
    const randomMem = preset.memories[Math.floor(Math.random() * preset.memories.length)];
    setCurrentMemory(randomMem);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-3 sm:p-6 select-none font-mono animate-fadeIn">
      {/* Return Button */}
      <div className="w-full max-w-2xl flex items-center justify-between pb-3">
        <button
          onClick={onClose}
          className="px-3.5 py-1.5 bg-neutral-900 border-2 border-white hover:bg-neutral-800 text-white rounded text-xs font-bold transition flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Underground [ESC]</span>
        </button>

        <div className="text-yellow-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span>O Espelho do Destino</span>
        </div>
      </div>

      {/* VINTAGE ROOM & MIRROR CANVAS (ACCURATELY MATCHING REFERENCE IMAGE 3) */}
      <div className="relative w-full max-w-2xl aspect-[4/3] sm:aspect-[16/10] bg-[#bfbba2] rounded-lg border-4 border-white shadow-[0_0_50px_rgba(255,255,255,0.2)] overflow-hidden flex flex-col">
        {/* Upper Wall Section (#8e8979 / #a8a28e) */}
        <div className="relative w-full h-[62%] bg-[#9e9885] border-b-4 border-[#787260] flex items-center justify-between px-6 sm:px-12">
          {/* Subtle Wall Texture Shading */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent pointer-events-none" />

          {/* 1. LEFT: VINTAGE WALL SCONCE / LAMP */}
          <div className="relative w-12 h-24 flex flex-col items-center select-none">
            {/* Lamp Light Glow */}
            <div className="absolute -top-3 w-16 h-16 bg-yellow-200/30 rounded-full blur-md animate-pulse" />

            <svg
              viewBox="0 0 20 40"
              className="w-full h-full"
              style={{ imageRendering: 'pixelated' }}
              shapeRendering="crispEdges"
            >
              {/* White Glass Shade */}
              <rect x="5" y="4" width="10" height="3" fill="#ffffff" />
              <rect x="4" y="7" width="12" height="6" fill="#f8fafc" />
              <rect x="6" y="13" width="8" height="2" fill="#e2e8f0" />
              {/* Lamp Bulb / Warm filament */}
              <rect x="8" y="8" width="4" height="4" fill="#fef08a" className="animate-pulse" />
              {/* Metal Wall Bracket */}
              <rect x="8" y="15" width="4" height="12" fill="#334155" />
              <rect x="6" y="27" width="8" height="4" fill="#1e293b" />
              <rect x="9" y="31" width="2" height="6" fill="#334155" />
            </svg>
          </div>

          {/* 2. CENTER: WALL MIRROR WITH FRISK & REFLECTION */}
          <div className="relative w-56 sm:w-64 h-40 sm:h-44 flex items-center justify-center">
            {/* Mirror Wooden Plank Frame */}
            <div className="relative w-48 sm:w-56 h-28 sm:h-32 bg-[#cac4ad] border-4 border-[#57534e] rounded-sm shadow-inner flex items-center justify-center overflow-hidden">
              {/* Horizontal Plank Lines in Mirror */}
              <div className="absolute inset-0 flex flex-col justify-between py-1 opacity-25 pointer-events-none">
                <div className="w-full h-0.5 bg-[#44403c]" />
                <div className="w-full h-0.5 bg-[#44403c]" />
                <div className="w-full h-0.5 bg-[#44403c]" />
                <div className="w-full h-0.5 bg-[#44403c]" />
              </div>

              {/* Shimmer Light Reflection Angle */}
              <div className="absolute -top-10 -left-10 w-24 h-48 bg-white/20 rotate-45 pointer-events-none" />

              {/* FRISK'S REFLECTION (Front Face looking back at player!) */}
              <div className="relative z-10 flex flex-col items-center scale-110 -mb-2">
                <svg
                  viewBox="0 0 20 20"
                  className="w-16 h-16 drop-shadow-md"
                  style={{ imageRendering: 'pixelated' }}
                  shapeRendering="crispEdges"
                >
                  {/* Hair */}
                  <rect x="3" y="1" width="14" height="7" fill="#3b200a" />
                  <rect x="2" y="3" width="16" height="5" fill="#271406" />
                  {/* Face */}
                  <rect x="5" y="7" width="10" height="7" fill="#facc15" />
                  {/* Bangs */}
                  <rect x="4" y="6" width="12" height="3" fill="#3b200a" />
                  <rect x="4" y="9" width="2" height="2" fill="#3b200a" />
                  <rect x="14" y="9" width="2" height="2" fill="#3b200a" />
                  {/* Calm Determination Eyes (-_-) */}
                  <rect x="6" y="9" width="3" height="1.5" fill="#000000" />
                  <rect x="11" y="9" width="3" height="1.5" fill="#000000" />
                  {/* Mouth */}
                  <rect x="9" y="12" width="2" height="1" fill="#713f12" />
                  {/* Cheerful Birthday Crown option on top of reflection */}
                  <polygon points="7,0 9,3 10,0 11,3 13,0 13,4 7,4" fill="#fde047" />
                  <rect x="10" y="2" width="1" height="1" fill="#ef4444" />
                </svg>
              </div>

              {/* Sparkle FX */}
              {isSparkling && (
                <div className="absolute inset-0 flex items-center justify-center bg-yellow-300/20 pointer-events-none animate-ping">
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                </div>
              )}
            </div>
          </div>

          {/* 3. RIGHT: TALL FACETED STONE VASE WITH GOLDEN FLOWERS */}
          <div className="relative w-20 h-36 flex flex-col items-center justify-end select-none">
            <svg
              viewBox="0 0 32 60"
              className="w-full h-full drop-shadow-lg"
              style={{ imageRendering: 'pixelated' }}
              shapeRendering="crispEdges"
            >
              {/* TWO LARGE GOLDEN BUTTERCUP FLOWERS */}
              {/* Top Flower */}
              <g className="animate-pulse">
                {/* 5 Yellow Petals */}
                <circle cx="20" cy="12" r="5" fill="#facc15" />
                <circle cx="25" cy="8" r="4.5" fill="#eab308" />
                <circle cx="15" cy="8" r="4.5" fill="#eab308" />
                <circle cx="16" cy="16" r="4.5" fill="#eab308" />
                <circle cx="24" cy="16" r="4.5" fill="#eab308" />
                {/* Center Core */}
                <circle cx="20" cy="12" r="2.5" fill="#854d0e" />
              </g>

              {/* Lower Flower */}
              <g>
                <circle cx="10" cy="22" r="5" fill="#facc15" />
                <circle cx="15" cy="18" r="4.5" fill="#eab308" />
                <circle cx="5" cy="18" r="4.5" fill="#eab308" />
                <circle cx="6" cy="26" r="4.5" fill="#eab308" />
                <circle cx="14" cy="26" r="4.5" fill="#eab308" />
                <circle cx="10" cy="22" r="2.5" fill="#854d0e" />
              </g>

              {/* Green Stems */}
              <rect x="19" y="15" width="2" height="20" fill="#15803d" />
              <rect x="10" y="25" width="2" height="10" fill="#15803d" />

              {/* Tall Faceted Stone Vase (Grey Modern Column) */}
              <polygon points="12,32 24,32 26,58 10,58" fill="#57534e" />
              <polygon points="14,34 22,34 24,56 12,56" fill="#78716c" />
              {/* Facet Highlights */}
              <polygon points="16,34 20,34 21,56 15,56" fill="#a8a29e" />
            </svg>
          </div>
        </div>

        {/* Lower Floor Section: Wooden Planks (#cfcbba / #b5b09d) */}
        <div className="relative w-full h-[38%] bg-[#c5c0ac] flex flex-col justify-around py-1 px-4">
          {/* Floor Planks horizontal lines */}
          <div className="w-full h-0.5 bg-[#8a8470]" />
          <div className="w-full h-0.5 bg-[#8a8470]" />
          <div className="w-full h-0.5 bg-[#8a8470]" />

          {/* FRISK FROM BEHIND STANDING IN FRONT OF THE MIRROR */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-20 flex flex-col items-center">
            {/* Frisk back sprite */}
            <div className="relative w-12 h-16 select-none drop-shadow-[0_8px_8px_rgba(0,0,0,0.6)]">
              <svg
                viewBox="0 0 16 20"
                className="w-full h-full"
                style={{ imageRendering: 'pixelated' }}
                shapeRendering="crispEdges"
              >
                {/* Shadow */}
                <ellipse cx="8" cy="19" rx="6" ry="1.5" fill="#000" opacity="0.5" />

                {/* Brown Hair Back */}
                <rect x="3" y="1" width="10" height="7" fill="#3b200a" />
                <rect x="2" y="2" width="12" height="6" fill="#2d1807" />
                <rect x="4" y="0" width="8" height="2" fill="#3b200a" />

                {/* Blue Shirt Back */}
                <rect x="3" y="8" width="10" height="6" fill="#2563eb" />
                {/* Two Magenta Stripes */}
                <rect x="3" y="10" width="10" height="1" fill="#db2777" />
                <rect x="3" y="12" width="10" height="1" fill="#db2777" />

                {/* Blue Pants */}
                <rect x="4" y="14" width="3" height="4" fill="#1e3a8a" />
                <rect x="9" y="14" width="3" height="4" fill="#1e3a8a" />

                {/* Dark Brown Shoes */}
                <rect x="3" y="17" width="4" height="2" fill="#451a03" />
                <rect x="9" y="17" width="4" height="2" fill="#451a03" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* UNDERTALE DIALOGUE TEXT BOX */}
      <div className="w-full max-w-2xl mt-4 z-20">
        <RetroText
          key={`mirror-${dialogueIndex}`}
          text={mirrorQuotes[dialogueIndex]}
          speakerName="Espelho da Alma"
          speed={30}
          onComplete={() => {}}
        />

        {/* Action Controls underneath dialogue */}
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 bg-neutral-900/90 border border-neutral-700 p-2.5 rounded">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playMoveSound();
                setDialogueIndex((prev) => (prev + 1) % mirrorQuotes.length);
              }}
              className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs rounded border border-white transition flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Próxima Fala [Z]</span>
            </button>

            <button
              onClick={handleTouchMirror}
              className="px-3 py-1.5 bg-purple-900 hover:bg-purple-800 text-purple-200 font-bold text-xs rounded border border-purple-400 transition flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>Tocar no Espelho</span>
            </button>

            <button
              onClick={handleRecallMemory}
              className="px-3 py-1.5 bg-cyan-900 hover:bg-cyan-800 text-cyan-200 font-bold text-xs rounded border border-cyan-400 transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-300" />
              <span>Relembrar Memória</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded border border-neutral-600 transition"
          >
            Sair do Espelho
          </button>
        </div>

        {/* Memory Reveal Card if clicked */}
        {currentMemory && (
          <div className="mt-3 p-3 bg-neutral-950 border-2 border-yellow-400 text-yellow-200 text-xs sm:text-sm rounded animate-fadeIn flex items-start gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold text-yellow-400 uppercase">Memória Relembrada:</div>
              <p className="mt-0.5 italic">"{currentMemory}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
