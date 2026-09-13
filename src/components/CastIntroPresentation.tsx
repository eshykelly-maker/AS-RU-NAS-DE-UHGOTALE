import React, { useState, useEffect } from 'react';
import { FriendPreset } from '../types';
import { soundEngine } from '../utils/audio';
import { Sparkles, Heart, Play, Volume2, VolumeX, ArrowRight, Disc } from 'lucide-react';

interface CastIntroPresentationProps {
  preset: FriendPreset;
  onStartGame: () => void;
  onBackToMenu?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

interface CharacterSpotlight {
  id: string;
  name: string;
  title: string;
  quote: string;
  color: string;
}

export const CastIntroPresentation: React.FC<CastIntroPresentationProps> = ({
  preset,
  onStartGame,
  onBackToMenu,
  isMuted = false,
  onToggleMute,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterSpotlight | null>(null);
  const [prologueStep, setPrologueStep] = useState<number>(0);

  // Play Once Upon a Time on cast presentation start
  useEffect(() => {
    soundEngine.startBgm('ONCE_UPON_A_TIME');
    return () => {
      // Clean up if unmounted
    };
  }, []);

  // Keyboard shortcut: Space or Enter to start
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key.toLowerCase() === 'z') {
        soundEngine.playBattleStartSound();
        onStartGame();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStartGame]);

  const castCharacters: Record<string, CharacterSpotlight> = {
    frisk: {
      id: 'frisk',
      name: 'Frisk / Você',
      title: 'A Alma Determinada',
      quote: `* Olhar para todos reunidos aqui enche você de DETERMINAÇÃO para comemorar o dia de ${preset.friendName}!`,
      color: '#38bdf8',
    },
    flowey: {
      id: 'flowey',
      name: 'Flowey a Flor',
      title: 'O Companheiro Inesperado',
      quote: '* Neste dia especial... é CELEBRAR ou SER CELEBRADO! Feliz aniversário, idiota!',
      color: '#facc15',
    },
    sans: {
      id: 'sans',
      name: 'Sans o Esqueleto',
      title: 'O Sentinela Piadista',
      quote: `* e aí, ${preset.friendName.toLowerCase()}. mais um ano de vida? seus ossos tão ficando cada vez mais sábios... e preguiçosos. ba-dum-tss.`,
      color: '#60a5fa',
    },
    papyrus: {
      id: 'papyrus',
      name: 'O Grande Papyrus',
      title: 'Mestre Culinário & Amigo Real',
      quote: `* NYEH HEH HEH! EU, O GRANDE PAPYRUS, PREPAREI UM BOLO DE ESPAGUETE ESPECIAL PARA ${preset.friendName.toUpperCase()}!`,
      color: '#f97316',
    },
    toriel: {
      id: 'toriel',
      name: 'Toriel Dreemurr',
      title: 'A Guardiã das Ruínas',
      quote: `* Minha querida criança ${preset.friendName}... fiz uma torta de canela e caramelo fresquinha para celebrar o seu dia!`,
      color: '#c084fc',
    },
    asgore: {
      id: 'asgore',
      name: 'Rei Asgore',
      title: 'O Rei do Underground',
      quote: `* Gostaria de uma xícara de chá de flores douradas? Parabéns pelo seu aniversário, ${preset.friendName}. Você sempre será bem-vindo(a) aqui.`,
      color: '#fde047',
    },
    undyne: {
      id: 'undyne',
      name: 'Undyne',
      title: 'Capitã da Guarda Real',
      quote: `* NGAHHH!! FELIZ ANIVERSÁRIO, ${preset.friendName.toUpperCase()}!! HOJE VAMOS TREINAR, COZINHAR E ESMAGAR AQUELE BOLO!`,
      color: '#38bdf8',
    },
    alphys: {
      id: 'alphys',
      name: 'Dra. Alphys',
      title: 'A Cientista Real',
      quote: `* O-oi! E-eu fiz alguns cálculos com o Mettaton e... a probabilidade de hoje ser o melhor aniversário da sua vida é de 100%!`,
      color: '#fef08a',
    },
    mettaton: {
      id: 'mettaton',
      name: 'Mettaton EX',
      title: 'A Estrela do Underground',
      quote: `* OHHH YESSS, QUERIDINHO(A)! O PALCO INTEIRO HOJE É SEU, ${preset.friendName.toUpperCase()}! QUE BRILHO!`,
      color: '#f472b6',
    },
    muffet: {
      id: 'muffet',
      name: 'Muffet',
      title: 'A Padeira das Aranhas',
      quote: '* Ahuhuhu~ Nossas aranhas teceram o laço do seu presente de aniversário!',
      color: '#c084fc',
    },
    monsterkid: {
      id: 'monsterkid',
      name: 'Monster Kid',
      title: 'O Maior Fã',
      quote: `* Uau! É o seu aniversário, ${preset.friendName}?! Isso é muito legal! Cara, nem sei o que dizer!`,
      color: '#facc15',
    },
  };

  const handleSelectCharacter = (charKey: string) => {
    soundEngine.playMoveSound();
    setSelectedCharacter(castCharacters[charKey]);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-between p-3 sm:p-6 select-none relative overflow-hidden">
      {/* Subtle Starfield / Dust Motes */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Top Header Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between z-20 pt-1">
        <div className="flex items-center gap-2">
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-white text-neutral-300 hover:text-white rounded text-xs transition"
            >
              ← Voltar ao Menu
            </button>
          )}
          <span className="text-[11px] sm:text-xs text-neutral-400 font-bold uppercase tracking-wider hidden sm:inline">
            Apresentação do Elenco • Edição Especial
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onToggleMute && (
            <button
              onClick={onToggleMute}
              className="p-2 bg-neutral-900 border border-neutral-700 hover:border-yellow-400 rounded text-xs transition flex items-center gap-1.5"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-green-400" />}
              <span className="text-[11px] hidden sm:inline">{isMuted ? 'Mudo' : 'Once Upon a Time'}</span>
            </button>
          )}
          <button
            onClick={() => {
              soundEngine.playBattleStartSound();
              onStartGame();
            }}
            className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm rounded border-2 border-white transition flex items-center gap-1.5 shadow-lg active:scale-95"
          >
            <span>Pular / Iniciar [Z]</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* CENTERPIECE: THE FULL UNDERTALE CAST ENSEMBLE (REFERENCE IMAGE 1) */}
      <div className="relative w-full max-w-3xl flex flex-col items-center justify-center my-auto py-2 z-10">
        {/* Title Prologue Subtext */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 text-yellow-300 font-extrabold text-xs sm:text-sm uppercase tracking-widest bg-yellow-950/60 px-4 py-1 rounded-full border border-yellow-500/40 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>OS AMIGOS DO UNDERGROUND SE REÚNEM</span>
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-[11px] sm:text-xs text-neutral-400 mt-1 max-w-md mx-auto">
            Clique em qualquer personagem para ouvir o que ele tem a dizer para <span className="text-yellow-300 font-bold">{preset.friendName}</span>!
          </p>
        </div>

        {/* SVG CAST ARTWORK CONTAINER (Authentic pixel recreation of Image 1) */}
        <div className="relative w-full max-w-lg aspect-[16/13] bg-black/90 flex items-center justify-center p-2 rounded border-2 border-neutral-900 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
          <svg
            viewBox="0 0 320 250"
            className="w-full h-full select-none"
            style={{ imageRendering: 'pixelated' }}
            shapeRendering="crispEdges"
          >
            {/* 1. ASGORE (Back Center) */}
            <g
              onClick={() => handleSelectCharacter('asgore')}
              className="cursor-pointer hover:opacity-90 transition-opacity group"
            >
              {/* Cape */}
              <polygon points="110,65 210,65 225,160 95,160" fill="#581c87" />
              <polygon points="120,65 200,65 215,155 105,155" fill="#6b21a8" />
              {/* Golden Pauldrons */}
              <ellipse cx="120" cy="78" rx="22" ry="14" fill="#eab308" />
              <ellipse cx="200" cy="78" rx="22" ry="14" fill="#eab308" />
              <rect x="135" y="70" width="50" height="15" fill="#ca8a04" />
              {/* Golden Horns */}
              <path d="M125 50 Q110 20 135 15 Q138 35 138 48 Z" fill="#f8fafc" />
              <path d="M195 50 Q210 20 185 15 Q182 35 182 48 Z" fill="#f8fafc" />
              {/* Golden Crown */}
              <polygon points="150,28 155,34 160,25 165,34 170,28 170,38 150,38" fill="#facc15" />
              {/* Face & White Fur */}
              <ellipse cx="160" cy="55" rx="24" ry="20" fill="#ffffff" />
              <ellipse cx="160" cy="62" rx="22" ry="14" fill="#fef08a" />
              {/* Eyes & Smile */}
              <rect x="150" y="52" width="4" height="4" fill="#000000" />
              <rect x="166" y="52" width="4" height="4" fill="#000000" />
              <path d="M152 64 Q160 70 168 64" stroke="#000000" strokeWidth="2" fill="none" />
              {/* White Beard */}
              <polygon points="142,65 178,65 160,82" fill="#ffffff" />
            </g>

            {/* 2. TORIEL (Left of Asgore) */}
            <g
              onClick={() => handleSelectCharacter('toriel')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Purple Robe with White Sleeves */}
              <polygon points="65,100 115,100 120,175 60,175" fill="#3b0764" />
              <polygon points="70,105 110,105 115,170 65,170" fill="#581c87" />
              {/* Delta Rune Emblem on Chest */}
              <circle cx="90" cy="120" r="3.5" fill="#ffffff" />
              <polygon points="80,126 86,126 83,130" fill="#ffffff" />
              <polygon points="94,126 100,126 97,130" fill="#ffffff" />
              <polygon points="90,132 86,128 94,128" fill="#ffffff" />
              {/* White Monster Head & Horns */}
              <rect x="74" y="60" width="32" height="34" rx="10" fill="#ffffff" />
              {/* Horns */}
              <polygon points="72,62 76,50 82,60" fill="#ffffff" />
              <polygon points="108,62 104,50 98,60" fill="#ffffff" />
              {/* Drooping Ears */}
              <rect x="68" y="70" width="8" height="20" rx="3" fill="#ffffff" />
              <rect x="104" y="70" width="8" height="20" rx="3" fill="#ffffff" />
              {/* Toriel Eyes & Sweet Smile */}
              <ellipse cx="82" cy="74" rx="2.5" ry="4" fill="#000000" />
              <ellipse cx="98" cy="74" rx="2.5" ry="4" fill="#000000" />
              <path d="M84 84 Q90 89 96 84" stroke="#000000" strokeWidth="2" fill="none" />
              <rect x="89" y="80" width="2" height="2" fill="#000000" />
            </g>

            {/* 3. METTATON EX (Floating behind Toriel / Left Upper) */}
            <g
              onClick={() => handleSelectCharacter('mettaton')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Black Swoop Hair */}
              <polygon points="105,30 135,28 142,50 115,55 95,45" fill="#000000" />
              {/* Metallic Face */}
              <rect x="115" y="42" width="18" height="18" fill="#ffffff" />
              <rect x="122" y="48" width="4" height="2" fill="#ec4899" />
              <path d="M120 54 Q124 58 128 54" stroke="#000000" strokeWidth="1.5" fill="none" />
              {/* Pink Chestpiece */}
              <rect x="112" y="60" width="24" height="15" fill="#db2777" />
              <circle cx="124" cy="67" r="4" fill="#f472b6" />
              <polygon points="124,65 126,67 124,69 122,67" fill="#ffffff" />
            </g>

            {/* 4. UNDYNE (Right of Asgore) */}
            <g
              onClick={() => handleSelectCharacter('undyne')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Red Ponytail blowing in the wind */}
              <polygon points="245,40 260,18 248,60 238,70" fill="#dc2626" />
              <polygon points="250,25 268,15 255,45" fill="#ef4444" />
              {/* Blue Fish Head */}
              <ellipse cx="242" cy="75" rx="14" ry="16" fill="#38bdf8" />
              {/* Red / Blue Fin Ears */}
              <polygon points="224,70 230,62 228,80" fill="#dc2626" />
              <polygon points="260,70 254,62 256,80" fill="#dc2626" />
              {/* Eyepatch Left */}
              <rect x="233" y="70" width="6" height="6" fill="#000000" />
              {/* Yellow Eye Right with Black Slit */}
              <rect x="245" y="70" width="6" height="5" fill="#facc15" />
              <rect x="247" y="70" width="2" height="5" fill="#000000" />
              {/* Fierce Shark Smile */}
              <rect x="234" y="80" width="16" height="4" fill="#000000" />
              <polygon points="236,80 238,84 240,80" fill="#ffffff" />
              <polygon points="242,80 244,84 246,80" fill="#ffffff" />
              <polygon points="248,80 250,84 252,80" fill="#ffffff" />
              {/* Black Tank Top Body */}
              <polygon points="232,92 252,92 256,150 228,150" fill="#020617" />
              {/* Blue Arms */}
              <rect x="226" y="94" width="6" height="45" rx="2" fill="#38bdf8" />
              <rect x="252" y="94" width="6" height="45" rx="2" fill="#38bdf8" />
            </g>

            {/* 5. PAPYRUS (Left Side, Tall & Proud) */}
            <g
              onClick={() => handleSelectCharacter('papyrus')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Skull */}
              <rect x="44" y="88" width="20" height="22" rx="4" fill="#ffffff" />
              <rect x="48" y="92" width="4" height="6" fill="#000000" />
              <rect x="56" y="92" width="4" height="6" fill="#000000" />
              <rect x="46" y="104" width="16" height="3" fill="#000000" />
              <rect x="49" y="104" width="2" height="3" fill="#ffffff" />
              <rect x="53" y="104" width="2" height="3" fill="#ffffff" />
              <rect x="57" y="104" width="2" height="3" fill="#ffffff" />
              {/* Flowing Red Scarf */}
              <polygon points="35,110 75,110 82,125 30,120" fill="#dc2626" />
              <polygon points="25,115 40,110 32,150 20,140" fill="#ef4444" />
              {/* Battle Body (White Armor) */}
              <rect x="46" y="122" width="16" height="20" rx="3" fill="#ffffff" />
              <ellipse cx="54" cy="132" rx="5" ry="6" fill="#eab308" />
              {/* Blue Underwear */}
              <rect x="46" y="142" width="16" height="8" fill="#1e40af" />
              {/* Red Gloves & Skeleton Arms */}
              <rect x="36" y="125" width="4" height="25" fill="#ffffff" />
              <rect x="34" y="145" width="8" height="10" fill="#dc2626" />
              <rect x="68" y="125" width="4" height="25" fill="#ffffff" />
              <rect x="66" y="145" width="8" height="10" fill="#dc2626" />
              {/* Skeleton Legs */}
              <rect x="47" y="150" width="4" height="20" fill="#ffffff" />
              <rect x="57" y="150" width="4" height="20" fill="#ffffff" />
              {/* Tall Red Boots */}
              <rect x="44" y="165" width="9" height="18" fill="#dc2626" />
              <rect x="55" y="165" width="9" height="18" fill="#dc2626" />
            </g>

            {/* 6. SANS (Beside Frisk, in Front of Toriel) */}
            <g
              onClick={() => handleSelectCharacter('sans')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Skull */}
              <ellipse cx="102" cy="130" rx="14" ry="12" fill="#ffffff" />
              <rect x="94" y="126" width="5" height="6" rx="2" fill="#000000" />
              <rect x="105" y="126" width="5" height="6" rx="2" fill="#000000" />
              {/* Blue glowing eye pupil */}
              <rect x="95" y="128" width="2" height="2" fill="#38bdf8" />
              <rect x="106" y="128" width="2" height="2" fill="#ffffff" />
              {/* Smile */}
              <path d="M96 136 Q102 140 108 136" stroke="#000000" strokeWidth="2" fill="none" />
              <rect x="98" y="135" width="8" height="2" fill="#000000" />
              <rect x="100" y="135" width="1" height="2" fill="#ffffff" />
              <rect x="103" y="135" width="1" height="2" fill="#ffffff" />
              {/* Blue Hoodie */}
              <rect x="88" y="142" width="28" height="24" rx="4" fill="#2563eb" />
              {/* White Fluffy Collar */}
              <ellipse cx="102" cy="143" rx="10" ry="4" fill="#f8fafc" />
              {/* White Shirt */}
              <rect x="99" y="146" width="6" height="18" fill="#ffffff" />
              {/* Hands in Pockets */}
              <rect x="85" y="148" width="5" height="14" fill="#1d4ed8" />
              <rect x="114" y="148" width="5" height="14" fill="#1d4ed8" />
              {/* Black Shorts with White Stripe */}
              <rect x="91" y="166" width="22" height="10" fill="#0f172a" />
              <rect x="90" y="166" width="2" height="10" fill="#ffffff" />
              <rect x="111" y="166" width="2" height="10" fill="#ffffff" />
              {/* Pink Slippers */}
              <rect x="87" y="174" width="11" height="7" rx="2" fill="#f472b6" />
              <rect x="105" y="174" width="11" height="7" rx="2" fill="#f472b6" />
            </g>

            {/* 7. FRISK (Dead Center) */}
            <g
              onClick={() => handleSelectCharacter('frisk')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Brown Hair */}
              <rect x="135" y="112" width="34" height="22" rx="4" fill="#3b200a" />
              <rect x="132" y="118" width="40" height="14" fill="#2d1807" />
              {/* Yellow Face */}
              <rect x="139" y="122" width="26" height="16" fill="#fde047" />
              {/* Eyes (-_- Determination) */}
              <rect x="143" y="128" width="6" height="2" fill="#000000" />
              <rect x="155" y="128" width="6" height="2" fill="#000000" />
              {/* Mouth */}
              <rect x="149" y="134" width="6" height="1.5" fill="#854d0e" />
              {/* Blue Sweater with Magenta Stripes */}
              <rect x="136" y="138" width="32" height="24" fill="#2563eb" />
              <rect x="136" y="144" width="32" height="4" fill="#db2777" />
              <rect x="136" y="152" width="32" height="4" fill="#db2777" />
              {/* Blue Arms */}
              <rect x="130" y="138" width="6" height="18" fill="#2563eb" />
              <rect x="168" y="138" width="6" height="18" fill="#2563eb" />
              <rect x="130" y="154" width="6" height="4" fill="#fde047" />
              <rect x="168" y="154" width="6" height="4" fill="#fde047" />
              {/* Blue Pants */}
              <rect x="140" y="162" width="10" height="14" fill="#1e3a8a" />
              <rect x="154" y="162" width="10" height="14" fill="#1e3a8a" />
              {/* Brown Boots */}
              <rect x="138" y="174" width="13" height="7" fill="#451a03" />
              <rect x="153" y="174" width="13" height="7" fill="#451a03" />
            </g>

            {/* 8. ALPHYS (Right of Frisk) */}
            <g
              onClick={() => handleSelectCharacter('alphys')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Yellow Reptile Head */}
              <ellipse cx="192" cy="132" rx="14" ry="12" fill="#facc15" />
              <polygon points="186,120 192,112 196,120" fill="#facc15" />
              <polygon points="194,120 200,114 202,122" fill="#facc15" />
              {/* Glasses */}
              <rect x="182" y="128" width="8" height="8" rx="2" fill="#ffffff" />
              <rect x="194" y="128" width="8" height="8" rx="2" fill="#ffffff" />
              <rect x="184" y="130" width="4" height="4" fill="#000000" />
              <rect x="196" y="130" width="4" height="4" fill="#000000" />
              <line x1="190" y1="132" x2="194" y2="132" stroke="#000000" strokeWidth="2" />
              {/* Buck Teeth Smile */}
              <rect x="190" y="138" width="4" height="3" fill="#ffffff" />
              {/* White Lab Coat */}
              <polygon points="180,144 206,144 212,180 174,180" fill="#ffffff" />
              <rect x="188" y="146" width="8" height="30" fill="#e2e8f0" />
              {/* Cute Claw Hands held together */}
              <ellipse cx="192" cy="158" rx="5" ry="4" fill="#facc15" />
            </g>

            {/* 9. MUFFET (Far Right Behind Undyne) */}
            <g
              onClick={() => handleSelectCharacter('muffet')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Purple Spider Head & Pigtails */}
              <ellipse cx="238" cy="140" rx="10" ry="9" fill="#c084fc" />
              <rect x="226" y="135" width="4" height="12" fill="#7e22ce" />
              <rect x="246" y="135" width="4" height="12" fill="#7e22ce" />
              <polygon points="225,134 228,130 230,135" fill="#dc2626" />
              <polygon points="245,134 248,130 250,135" fill="#dc2626" />
              {/* Spider Eyes */}
              <circle cx="234" cy="138" r="1.5" fill="#000000" />
              <circle cx="242" cy="138" r="1.5" fill="#000000" />
              <circle cx="236" cy="135" r="1" fill="#000000" />
              <circle cx="240" cy="135" r="1" fill="#000000" />
              <circle cx="238" cy="133" r="1" fill="#000000" />
              {/* Dress */}
              <polygon points="230,148 246,148 248,172 228,172" fill="#9333ea" />
            </g>

            {/* 10. MONSTER KID (Far Right Front) */}
            <g
              onClick={() => handleSelectCharacter('monsterkid')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Yellow Head */}
              <ellipse cx="270" cy="134" rx="14" ry="12" fill="#facc15" />
              {/* Big Eyes */}
              <rect x="262" y="130" width="5" height="5" fill="#000000" />
              <rect x="273" y="130" width="5" height="5" fill="#000000" />
              {/* Big Grin */}
              <path d="M264 138 Q270 144 276 138" stroke="#000000" strokeWidth="2" fill="none" />
              {/* Brown Striped Shirt */}
              <rect x="260" y="146" width="20" height="20" fill="#ca8a04" />
              <rect x="260" y="150" width="20" height="3" fill="#78350f" />
              <rect x="260" y="158" width="20" height="3" fill="#78350f" />
              {/* Tail */}
              <polygon points="280,154 290,160 280,164" fill="#facc15" />
              {/* Small Legs */}
              <rect x="263" y="166" width="4" height="8" fill="#78350f" />
              <rect x="273" y="166" width="4" height="8" fill="#78350f" />
            </g>

            {/* 11. FLOWEY THE FLOWER (Bottom Center Smiling) */}
            <g
              onClick={() => handleSelectCharacter('flowey')}
              className="cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Golden Yellow Petals */}
              <circle cx="152" cy="202" r="15" fill="#facc15" />
              <circle cx="160" cy="195" r="7" fill="#facc15" />
              <circle cx="144" cy="195" r="7" fill="#facc15" />
              <circle cx="140" cy="205" r="7" fill="#facc15" />
              <circle cx="164" cy="205" r="7" fill="#facc15" />
              <circle cx="148" cy="214" r="7" fill="#facc15" />
              <circle cx="156" cy="214" r="7" fill="#facc15" />
              {/* White Face Center */}
              <circle cx="152" cy="204" r="9" fill="#ffffff" />
              {/* Eyes */}
              <rect x="148" y="201" width="2" height="3" fill="#000000" />
              <rect x="154" y="201" width="2" height="3" fill="#000000" />
              {/* Mischievous Smile */}
              <path d="M148 207 Q152 211 156 207" stroke="#000000" strokeWidth="1.5" fill="none" />
              {/* Green Stem & Leaves */}
              <rect x="151" y="217" width="2" height="15" fill="#16a34a" />
              <polygon points="151,222 144,220 151,226" fill="#15803d" />
              <polygon points="153,225 160,223 153,229" fill="#15803d" />
            </g>
          </svg>
        </div>

        {/* LOGO "UNDERTALE" EXACT PIXEL TYPOGRAPHY WITH RED HEART */}
        <div className="flex flex-col items-center justify-center mt-2 space-y-1">
          <div className="flex items-center gap-2 sm:gap-3 text-2xl sm:text-4xl font-black tracking-[0.25em] text-white drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
            <span>U N D E R</span>
            <span className="inline-flex items-center justify-center text-red-500 animate-pulse px-0.5">
              <Heart className="w-5 h-5 sm:w-7 sm:h-7 fill-red-500 stroke-red-600" />
            </span>
            <span>T A L E</span>
          </div>

          <div className="text-yellow-400 font-bold text-xs sm:text-sm tracking-widest uppercase">
            ★ EDIÇÃO ESPECIAL DE ANIVERSÁRIO: {preset.friendName.toUpperCase()} ★
          </div>
        </div>
      </div>

      {/* CHARACTER SPOTLIGHT / DIALOGUE BOX (CLICK ON CHARACTERS TO VIEW) */}
      <div className="w-full max-w-2xl bg-black border-4 border-white p-3 sm:p-4 rounded-sm shadow-2xl z-20 min-h-[95px] flex flex-col justify-center">
        {selectedCharacter ? (
          <div className="space-y-1 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div
                className="font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: selectedCharacter.color }}
              >
                <span>★ {selectedCharacter.name}</span>
                <span className="text-neutral-400 text-xs font-normal">({selectedCharacter.title})</span>
              </div>
              <button
                onClick={() => setSelectedCharacter(null)}
                className="text-[10px] text-neutral-500 hover:text-white px-1.5 py-0.5 border border-neutral-800 rounded"
              >
                Fechar
              </button>
            </div>
            <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
              {selectedCharacter.quote}
            </p>
          </div>
        ) : (
          <div className="text-center text-xs sm:text-sm text-neutral-300 font-bold leading-relaxed">
            * <span className="text-yellow-300">"Há muito tempo, humanos e monstros viviam no Underground..."</span>
            <br />
            * Hoje, todos se reuniram com um único propósito: comemorar o aniversário de{' '}
            <span className="text-white font-extrabold uppercase">{preset.friendName}</span>!
          </div>
        )}
      </div>

      {/* FOOTER ACTION BUTTONS */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-3 pt-3 z-20">
        <button
          onClick={() => {
            soundEngine.playBattleStartSound();
            onStartGame();
          }}
          className="w-full sm:w-auto px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm sm:text-base rounded border-2 border-white transition shadow-[0_0_20px_rgba(250,204,21,0.4)] active:scale-95 flex items-center justify-center gap-2 group"
        >
          <Play className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
          <span>COMEÇAR AVENTURA [Z / ENTER]</span>
        </button>
      </div>
    </div>
  );
};
