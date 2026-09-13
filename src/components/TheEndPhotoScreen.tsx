import React from 'react';
import { FriendPreset } from '../types';
import { soundEngine } from '../utils/audio';
import { Heart, Sparkles, Gift, Share2, RotateCcw, ArrowRight } from 'lucide-react';

interface TheEndPhotoScreenProps {
  preset: FriendPreset;
  onOpenCard: () => void;
  onRestart: () => void;
  onShareWhatsApp: () => void;
}

export const TheEndPhotoScreen: React.FC<TheEndPhotoScreenProps> = ({
  preset,
  onOpenCard,
  onRestart,
  onShareWhatsApp,
}) => {
  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-between p-4 sm:p-8 select-none relative overflow-hidden animate-fadeIn">
      {/* Top Subtle Subtitle */}
      <div className="w-full max-w-2xl flex items-center justify-between text-neutral-400 text-xs font-bold uppercase tracking-widest pt-2">
        <span className="flex items-center gap-1.5 text-yellow-400">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          FINAL VERDADEIRO: AMIZADE ETERNA
        </span>
        <span className="text-neutral-500">PARA: {preset.friendName.toUpperCase()}</span>
      </div>

      {/* THE ICONIC "THE END" PHOTOGRAPH (ACCURATELY MATCHING REFERENCE IMAGE 2) */}
      <div className="relative w-full max-w-xl flex flex-col items-center justify-center my-auto py-4">
        {/* Crisp White Photo Frame */}
        <div className="w-full bg-[#f8f5ee] p-3 sm:p-5 rounded-md border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.25)] flex flex-col items-center">
          {/* Inner Rounded Photo Cutout in Sepia/Monochrome Tone */}
          <div className="relative w-full aspect-[16/11] bg-[#d9ceb9] rounded-2xl overflow-hidden border-2 border-[#b5a68e] shadow-inner flex items-center justify-center">
            {/* Center Vertical Beam of Sunlight streaming down */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-28 sm:w-36 bg-gradient-to-b from-white/60 via-amber-100/30 to-transparent pointer-events-none blur-sm" />

            {/* Vintage Sepia Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_55%,rgba(74,54,34,0.35)_100%)] pointer-events-none" />

            {/* THE ASSEMBLED GROUP PHOTO ARTWORK (Sepia pixel recreation of Image 2) */}
            <svg
              viewBox="0 0 320 220"
              className="w-full h-full select-none"
              style={{ imageRendering: 'pixelated' }}
              shapeRendering="crispEdges"
            >
              {/* Monochromatic Sepia Palette */}
              {/* 1. ASGORE (Center Back) */}
              <g id="photo-asgore">
                {/* Cape */}
                <polygon points="115,45 205,45 220,150 100,150" fill="#6d5843" />
                {/* Golden/Sepia Horns */}
                <path d="M125 45 Q115 15 135 12 Q138 28 138 42 Z" fill="#eee5d3" />
                <path d="M195 45 Q205 15 185 12 Q182 28 182 42 Z" fill="#eee5d3" />
                {/* Pauldrons */}
                <ellipse cx="122" cy="65" rx="18" ry="12" fill="#c4aa82" />
                <ellipse cx="198" cy="65" rx="18" ry="12" fill="#c4aa82" />
                {/* Face & White Fur */}
                <ellipse cx="160" cy="50" rx="22" ry="18" fill="#f5ede0" />
                <rect x="151" y="46" width="3" height="3" fill="#38291c" />
                <rect x="166" y="46" width="3" height="3" fill="#38291c" />
                <path d="M154 58 Q160 63 166 58" stroke="#38291c" strokeWidth="2" fill="none" />
                {/* Beard */}
                <polygon points="144,58 176,58 160,72" fill="#e8dcce" />
              </g>

              {/* 2. TORIEL (Left Behind Sans) */}
              <g id="photo-toriel">
                {/* Robe */}
                <polygon points="68,85 110,85 115,165 65,165" fill="#544439" />
                {/* Head */}
                <rect x="74" y="52" width="28" height="30" rx="8" fill="#fbf7ee" />
                {/* Horns */}
                <polygon points="72,55 76,44 80,53" fill="#fbf7ee" />
                <polygon points="104,55 100,44 96,53" fill="#fbf7ee" />
                {/* Ears */}
                <rect x="70" y="60" width="6" height="18" rx="2" fill="#fbf7ee" />
                <rect x="100" y="60" width="6" height="18" rx="2" fill="#fbf7ee" />
                {/* Gentle Eyes & Smile */}
                <ellipse cx="82" cy="65" rx="2" ry="3" fill="#38291c" />
                <ellipse cx="94" cy="65" rx="2" ry="3" fill="#38291c" />
                <path d="M84 74 Q88 78 92 74" stroke="#38291c" strokeWidth="1.5" fill="none" />
              </g>

              {/* 3. PAPYRUS (Far Left) */}
              <g id="photo-papyrus">
                {/* Skull */}
                <rect x="42" y="70" width="18" height="20" rx="3" fill="#fbf7ee" />
                <rect x="46" y="74" width="3" height="5" fill="#38291c" />
                <rect x="53" y="74" width="3" height="5" fill="#38291c" />
                <rect x="45" y="83" width="12" height="3" fill="#38291c" />
                {/* Scarf */}
                <polygon points="36,88 66,88 70,102 34,98" fill="#8c4b38" />
                {/* Body */}
                <rect x="44" y="98" width="14" height="22" rx="2" fill="#fbf7ee" />
                <rect x="44" y="118" width="14" height="8" fill="#4d535e" />
                {/* Boots */}
                <rect x="42" y="140" width="8" height="25" fill="#8c4b38" />
                <rect x="52" y="140" width="8" height="25" fill="#8c4b38" />
              </g>

              {/* 4. SANS (Beside Frisk, in front of Toriel) */}
              <g id="photo-sans">
                {/* Skull */}
                <ellipse cx="102" cy="108" rx="13" ry="11" fill="#fbf7ee" />
                <rect x="95" y="104" width="4" height="5" rx="1.5" fill="#38291c" />
                <rect x="105" y="104" width="4" height="5" rx="1.5" fill="#38291c" />
                <path d="M97 113 Q102 117 107 113" stroke="#38291c" strokeWidth="2" fill="none" />
                {/* Hoodie */}
                <rect x="88" y="120" width="28" height="26" rx="4" fill="#52627a" />
                <ellipse cx="102" cy="120" rx="9" ry="3.5" fill="#fbf7ee" />
                {/* Shorts */}
                <rect x="91" y="144" width="22" height="12" fill="#2a2e36" />
                {/* Slippers */}
                <rect x="88" y="156" width="10" height="6" rx="2" fill="#c28b9f" />
                <rect x="104" y="156" width="10" height="6" rx="2" fill="#c28b9f" />
              </g>

              {/* 5. FRISK / FRIEND (Center of the Photo) */}
              <g id="photo-frisk">
                {/* Hair */}
                <rect x="136" y="92" width="30" height="18" rx="3" fill="#4a3727" />
                <rect x="133" y="98" width="36" height="12" fill="#38291c" />
                {/* Face */}
                <rect x="140" y="102" width="22" height="13" fill="#e8c792" />
                {/* Happy Peaceful Eyes */}
                <path d="M143 107 Q146 109 149 107" stroke="#38291c" strokeWidth="1.5" fill="none" />
                <path d="M153 107 Q156 109 159 107" stroke="#38291c" strokeWidth="1.5" fill="none" />
                {/* Gentle Smile */}
                <path d="M148 112 Q151 114 154 112" stroke="#66462c" strokeWidth="1.5" fill="none" />
                {/* Striped Shirt */}
                <rect x="137" y="115" width="28" height="24" fill="#50698a" />
                <rect x="137" y="120" width="28" height="4" fill="#9e5672" />
                <rect x="137" y="127" width="28" height="4" fill="#9e5672" />
                {/* Pants */}
                <rect x="141" y="139" width="8" height="16" fill="#39475c" />
                <rect x="153" y="139" width="8" height="16" fill="#39475c" />
                {/* Boots */}
                <rect x="139" y="154" width="11" height="8" fill="#4a3727" />
                <rect x="152" y="154" width="11" height="8" fill="#4a3727" />
              </g>

              {/* 6. ALPHYS (In front of Asgore, Right of Frisk) */}
              <g id="photo-alphys">
                {/* Yellow/Sepia Lizard Head */}
                <ellipse cx="188" cy="112" rx="12" ry="10" fill="#dfbe76" />
                <polygon points="183,103 188,96 192,103" fill="#dfbe76" />
                {/* Glasses */}
                <rect x="179" y="108" width="7" height="7" rx="1.5" fill="#ffffff" />
                <rect x="190" y="108" width="7" height="7" rx="1.5" fill="#ffffff" />
                <circle cx="182" cy="111" r="1.5" fill="#38291c" />
                <circle cx="193" cy="111" r="1.5" fill="#38291c" />
                {/* Teeth smile */}
                <rect x="187" y="117" width="3" height="2" fill="#ffffff" />
                {/* Lab Coat */}
                <polygon points="178,122 198,122 202,156 174,156" fill="#f8f4eb" />
              </g>

              {/* 7. UNDYNE (Right Side) */}
              <g id="photo-undyne">
                {/* Tall Red/Sepia Ponytail */}
                <polygon points="234,60 248,35 240,75 230,82" fill="#9c3b31" />
                {/* Head */}
                <ellipse cx="230" cy="85" rx="12" ry="14" fill="#6ba7b8" />
                {/* Eyepatch */}
                <rect x="222" y="81" width="5" height="5" fill="#2a2e36" />
                {/* Smile with Sharp Tooth */}
                <rect x="223" y="90" width="14" height="3" fill="#2a2e36" />
                <polygon points="225,90 227,93 229,90" fill="#ffffff" />
                <polygon points="231,90 233,93 235,90" fill="#ffffff" />
                {/* Tank Top */}
                <polygon points="222,99 238,99 240,150 220,150" fill="#2a2e36" />
                {/* Arms */}
                <rect x="216" y="100" width="5" height="35" fill="#6ba7b8" />
                <rect x="239" y="100" width="5" height="35" fill="#6ba7b8" />
              </g>
            </svg>
          </div>

          {/* Subtitle Inside Photo Frame */}
          <div className="mt-2 text-center text-[10px] sm:text-xs text-[#705e49] font-bold tracking-widest uppercase">
            A GRANDE FAMÍLIA DO UNDERGROUND • ANIVERSÁRIO DE {preset.friendName.toUpperCase()}
          </div>
        </div>

        {/* MASSIVE "THE END" TYPOGRAPHY (EXACTLY AS IN REFERENCE IMAGE 2) */}
        <div className="flex flex-col items-center justify-center mt-6 space-y-2">
          <div className="text-4xl sm:text-6xl font-black tracking-[0.3em] text-white drop-shadow-[0_4px_12px_rgba(255,255,255,0.4)]">
            THE END
          </div>

          <div className="flex items-center gap-2 text-red-500 fill-red-500 animate-pulse">
            <Heart className="w-5 h-5 fill-red-500 stroke-red-600" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-yellow-300">
              DETERMINAÇÃO E AMIZADE SUPERAM QUALQUER DESAFIO!
            </span>
            <Heart className="w-5 h-5 fill-red-500 stroke-red-600" />
          </div>
        </div>
      </div>

      {/* FOOTER INTERACTION PANEL */}
      <div className="w-full max-w-2xl bg-neutral-950 border-2 border-neutral-700 p-3 sm:p-4 rounded-lg flex flex-wrap items-center justify-between gap-3 z-20">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenCard}
            className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm rounded border-2 border-white transition flex items-center gap-2 shadow-lg active:scale-95"
          >
            <Gift className="w-4 h-4" />
            <span>Ver Cartão com Foto & Mensagem</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onShareWhatsApp}
            className="px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs sm:text-sm rounded border border-white/60 transition flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartilhar WhatsApp</span>
          </button>
        </div>

        <button
          onClick={onRestart}
          className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-bold text-xs rounded border border-neutral-700 transition flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Voltar ao Início</span>
        </button>
      </div>
    </div>
  );
};
