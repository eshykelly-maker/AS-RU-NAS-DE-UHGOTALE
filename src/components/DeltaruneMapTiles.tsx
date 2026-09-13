import React from 'react';
import {
  PixelPlayer,
  PixelSans,
  PixelDog,
  PixelCake,
  PixelChest,
  PixelMirror,
} from './PixelSprites';

interface DeltaruneMapGridProps {
  playerPos: { x: number; y: number };
  playerDir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  isWalking: boolean;
  hasTakenCake: boolean;
  hasOpenedChest: boolean;
  isSwitchFlipped?: boolean;
  pressedStones?: number[];
  onTileClick: (x: number, y: number) => void;
  onToggleSwitch?: () => void;
  onStoneClick?: (index: number) => void;
  onSignClick?: () => void;
  onDoorClick?: () => void;
}

export const DeltaruneMapGrid: React.FC<DeltaruneMapGridProps> = ({
  playerPos,
  playerDir,
  isWalking,
  hasTakenCake,
  hasOpenedChest,
  isSwitchFlipped = false,
  pressedStones = [],
  onTileClick,
  onToggleSwitch,
  onStoneClick,
  onSignClick,
  onDoorClick,
}) => {
  const cols = 12;
  const rows = 8;

  // Stepping stones exact locations in 12x8 grid
  const stonePositions = [
    { id: 0, x: 7, y: 3, cx: 196, cy: 108 },
    { id: 1, x: 9, y: 3, cx: 236, cy: 108 },
    { id: 2, x: 8, y: 4, cx: 216, cy: 132 },
    { id: 3, x: 7, y: 5, cx: 196, cy: 154 },
    { id: 4, x: 9, y: 5, cx: 236, cy: 154 },
    { id: 5, x: 8, y: 6, cx: 216, cy: 176 },
  ];

  return (
    <div className="relative w-full aspect-[4/3] max-w-3xl mx-auto bg-black rounded-lg border-4 border-[#781870] shadow-[0_0_40px_rgba(168,62,160,0.5)] overflow-hidden select-none">
      {/* 1. AUTHENTIC UNDERTALE RUINS BACKGROUND (Matches uploaded reference photo 1:1) */}
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}
      >
        <defs>
          {/* Brick Horizontal & Vertical Pattern */}
          <pattern id="ruinsBricks" width="16" height="8" patternUnits="userSpaceOnUse">
            <rect width="16" height="8" fill="#8f2d84" />
            {/* Top row mortar */}
            <line x1="0" y1="0" x2="16" y2="0" stroke="#000000" strokeWidth="1" />
            <line x1="0" y1="4" x2="16" y2="4" stroke="#000000" strokeWidth="1" />
            {/* Vertical brick dividers */}
            <line x1="8" y1="0" x2="8" y2="4" stroke="#000000" strokeWidth="1" />
            <line x1="0" y1="4" x2="0" y2="8" stroke="#000000" strokeWidth="1" />
            <line x1="16" y1="4" x2="16" y2="8" stroke="#000000" strokeWidth="1" />
            {/* Brick Highlights */}
            <rect x="1" y="1" width="6" height="1" fill="#a43d99" />
            <rect x="9" y="1" width="6" height="1" fill="#a43d99" />
            <rect x="1" y="5" width="14" height="1" fill="#a43d99" />
          </pattern>

          {/* Stepped Brick Pattern for side pillars */}
          <pattern id="pillarHatch" width="4" height="4" patternUnits="userSpaceOnUse">
            <rect width="4" height="4" fill="#691a60" />
            <line x1="0" y1="0" x2="4" y2="4" stroke="#460d40" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Pitch Black Void Background */}
        <rect width="320" height="240" fill="#000000" />

        {/* Outer Purple Room Silhouette Contour */}
        <polygon
          points="
            128,0 128,20 64,20 64,40 48,40 48,64 44,64 44,180
            104,222 144,222 144,240 176,240 176,222 216,222 276,180
            276,64 272,64 272,40 256,40 256,20 192,20 192,0
          "
          fill="#842479"
          stroke="#000000"
          strokeWidth="2"
        />

        {/* Deep Ruins Purple Floor Polygon */}
        <polygon
          points="
            50,88 128,88 128,80 192,80 192,88 270,88
            270,178 214,218 176,218 176,240 144,240 144,218 106,218
            50,178
          "
          fill="#8c2b82"
        />

        {/* Ambient Floor Shadow at corners */}
        <polygon points="50,88 128,88 100,116 50,128" fill="#68195e" opacity="0.6" />
        <polygon points="270,88 192,88 220,116 270,128" fill="#68195e" opacity="0.6" />
        <polygon points="50,178 106,218 80,190" fill="#581250" opacity="0.7" />
        <polygon points="270,178 214,218 240,190" fill="#581250" opacity="0.7" />

        {/* The Authentic Winding Lavender Path (matches image.png 1:1) */}
        <g fill="#bf6ab8">
          {/* Bottom Corridor Entrance Segment */}
          <rect x="144" y="180" width="32" height="60" />
          {/* Bottom Swerve Left */}
          <ellipse cx="140" cy="188" rx="28" ry="18" />
          <ellipse cx="120" cy="176" rx="26" ry="20" />
          <ellipse cx="112" cy="154" rx="24" ry="22" />
          <ellipse cx="118" cy="132" rx="26" ry="22" />
          <ellipse cx="132" cy="112" rx="28" ry="20" />
          {/* Curve into Purple Door */}
          <ellipse cx="148" cy="94" rx="26" ry="18" />
          <rect x="132" y="80" width="36" height="24" />
        </g>

        {/* BACK WALL (Brick Textures & Perspective Layers) */}
        {/* Left Back Wall */}
        <rect x="68" y="20" width="60" height="68" fill="url(#ruinsBricks)" />
        {/* Left Wall Top Edge */}
        <line x1="68" y1="20" x2="128" y2="20" stroke="#000000" strokeWidth="2" />
        <line x1="68" y1="88" x2="128" y2="88" stroke="#000000" strokeWidth="2" />

        {/* Right Back Wall */}
        <rect x="192" y="20" width="60" height="68" fill="url(#ruinsBricks)" />
        {/* Right Wall Top Edge */}
        <line x1="192" y1="20" x2="252" y2="20" stroke="#000000" strokeWidth="2" />
        <line x1="192" y1="88" x2="252" y2="88" stroke="#000000" strokeWidth="2" />

        {/* LEFT STEPPED PILLARS & 3D SIDE WALLS */}
        <g>
          {/* Stepped Pillar 1 */}
          <rect x="48" y="40" width="20" height="72" fill="url(#ruinsBricks)" />
          {/* Side 3D projection */}
          <polygon points="68,20 68,40 68,88 68,88" stroke="#000000" strokeWidth="1" />
          {/* Stepped Pillar 2 (Outer Left) */}
          <rect x="44" y="64" width="10" height="54" fill="#751f6e" />
          {/* Stepped Horizontal mortar lines */}
          <line x1="48" y1="40" x2="68" y2="40" stroke="#000000" strokeWidth="2" />
          <line x1="48" y1="48" x2="68" y2="48" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="56" x2="68" y2="56" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="64" x2="68" y2="64" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="72" x2="68" y2="72" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="80" x2="68" y2="80" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="88" x2="68" y2="88" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="96" x2="68" y2="96" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="104" x2="68" y2="104" stroke="#000000" strokeWidth="1" />
          <line x1="48" y1="112" x2="68" y2="112" stroke="#000000" strokeWidth="2" />
        </g>

        {/* RIGHT STEPPED PILLARS & 3D SIDE WALLS */}
        <g>
          {/* Stepped Pillar 1 */}
          <rect x="252" y="40" width="20" height="72" fill="url(#ruinsBricks)" />
          {/* Stepped Pillar 2 (Outer Right) */}
          <rect x="266" y="64" width="10" height="54" fill="#751f6e" />
          {/* Stepped Horizontal mortar lines */}
          <line x1="252" y1="40" x2="272" y2="40" stroke="#000000" strokeWidth="2" />
          <line x1="252" y1="48" x2="272" y2="48" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="56" x2="272" y2="56" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="64" x2="272" y2="64" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="72" x2="272" y2="72" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="80" x2="272" y2="80" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="88" x2="272" y2="88" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="96" x2="272" y2="96" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="104" x2="272" y2="104" stroke="#000000" strokeWidth="1" />
          <line x1="252" y1="112" x2="272" y2="112" stroke="#000000" strokeWidth="2" />
        </g>

        {/* Left Vertical & Diagonal Outer Border Outlines */}
        <line x1="44" y1="64" x2="44" y2="180" stroke="#000000" strokeWidth="3" />
        <line x1="44" y1="180" x2="104" y2="222" stroke="#000000" strokeWidth="3" />
        <line x1="104" y1="222" x2="144" y2="222" stroke="#000000" strokeWidth="3" />

        {/* Right Vertical & Diagonal Outer Border Outlines */}
        <line x1="276" y1="64" x2="276" y2="180" stroke="#000000" strokeWidth="3" />
        <line x1="276" y1="180" x2="216" y2="222" stroke="#000000" strokeWidth="3" />
        <line x1="216" y1="222" x2="176" y2="222" stroke="#000000" strokeWidth="3" />

        {/* ======================================================== */}
        {/* CENTER INSET ARCH & PURPLE BOSS DOOR (WITH DELTA RUNE EMBLEM) */}
        {/* ======================================================== */}
        <g>
          {/* Black Doorway Cavity */}
          <rect x="128" y="0" width="36" height="80" fill="#000000" />

          {/* Arched Purple Door */}
          <path
            d="M 132,80 L 132,32 A 16,16 0 0,1 164,32 L 164,80 Z"
            fill={isSwitchFlipped ? '#93188b' : '#72126c'}
            stroke="#000000"
            strokeWidth="2"
          />

          {/* Door Center Vertical Seam */}
          <line x1="148" y1="18" x2="148" y2="80" stroke="#000000" strokeWidth="1.5" />

          {/* Authentic Black Delta Rune Emblem on Door */}
          {/* Wings */}
          <path
            d="M 148,36 Q 144,30 137,34 Q 143,36 148,39 Q 153,36 159,34 Q 152,30 148,36 Z"
            fill="#000000"
          />
          {/* Circle Orb */}
          <circle cx="148" cy="45" r="3.5" fill="#000000" />
          {/* Three Inverted Triangles */}
          <polygon points="148,51 145,56 151,56" fill="#000000" />
          <polygon points="141,59 138,64 144,64" fill="#000000" />
          <polygon points="155,59 152,64 158,64" fill="#000000" />

          {/* Door Bottom Frame Accent */}
          <line x1="130" y1="80" x2="166" y2="80" stroke="#000000" strokeWidth="2" />
        </g>

        {/* ======================================================== */}
        {/* ANCIENT STONE TABLET / PLAQUE (ON LEFT WALL) */}
        {/* ======================================================== */}
        <g className="cursor-pointer">
          {/* Slate Plaque Body */}
          <rect x="94" y="36" width="18" height="18" fill="#6f7b8d" stroke="#2a3342" strokeWidth="1.5" />
          {/* Inner Inscription Marks */}
          <rect x="96" y="39" width="3" height="2" fill="#303b4d" />
          <rect x="101" y="39" width="4" height="2" fill="#303b4d" />
          <rect x="107" y="39" width="3" height="2" fill="#303b4d" />
          <rect x="97" y="44" width="5" height="2" fill="#303b4d" />
          <rect x="104" y="44" width="4" height="2" fill="#303b4d" />
          <rect x="96" y="49" width="4" height="2" fill="#303b4d" />
          <rect x="102" y="49" width="6" height="2" fill="#303b4d" />
        </g>

        {/* ======================================================== */}
        {/* GOLDEN LEVER / SWITCH (ON RIGHT WALL) */}
        {/* ======================================================== */}
        <g className="cursor-pointer">
          {/* Bright Yellow Frame */}
          <rect x="212" y="46" width="6" height="16" fill="#000000" stroke="#eab308" strokeWidth="1.5" />
          {/* Black Inner Slot */}
          <rect x="214" y="48" width="2" height="12" fill="#18181b" />
          {/* Lever Handle */}
          {isSwitchFlipped ? (
            // Switched Down
            <>
              <circle cx="215" cy="57" r="2.5" fill="#fde047" stroke="#ca8a04" strokeWidth="0.5" />
              <line x1="215" y1="52" x2="215" y2="57" stroke="#eab308" strokeWidth="1.5" />
            </>
          ) : (
            // Switched Up
            <>
              <circle cx="215" cy="50" r="2.5" fill="#fde047" stroke="#ca8a04" strokeWidth="0.5" />
              <line x1="215" y1="50" x2="215" y2="55" stroke="#eab308" strokeWidth="1.5" />
            </>
          )}
        </g>

        {/* ======================================================== */}
        {/* THE 6 STEPPING STONES / PRESSURE SWITCHES (RIGHT SECTION) */}
        {/* ======================================================== */}
        {stonePositions.map((stone) => {
          const isPressed = pressedStones.includes(stone.id);
          const offsetY = isPressed ? 2 : 0;
          return (
            <g key={stone.id} className="cursor-pointer">
              {/* Soft purple shadow cast onto the floor */}
              <ellipse
                cx={stone.cx}
                cy={stone.cy + 6}
                rx="9"
                ry="5"
                fill="#55124e"
                opacity="0.85"
              />

              {/* Stone 3D Side Elevation */}
              <ellipse
                cx={stone.cx}
                cy={stone.cy + offsetY + 2}
                rx="8"
                ry="4"
                fill="#374151"
                stroke="#111827"
                strokeWidth="1"
              />

              {/* Stone Top Surface (depresses when pressed) */}
              <ellipse
                cx={stone.cx}
                cy={stone.cy + offsetY}
                rx="8"
                ry="4"
                fill={isPressed ? '#fef08a' : '#d1d5db'}
                stroke="#000000"
                strokeWidth="1"
              />

              {/* Top Highlight Specular */}
              <ellipse
                cx={stone.cx - 2}
                cy={stone.cy + offsetY - 1}
                rx="3.5"
                ry="1.5"
                fill={isPressed ? '#ffffff' : '#f3f4f6'}
                opacity="0.9"
              />

              {/* Pressed Glow Indicator */}
              {isPressed && (
                <circle
                  cx={stone.cx}
                  cy={stone.cy + offsetY}
                  r="3"
                  fill="#facc15"
                  className="animate-pulse"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* 2. INTERACTIVE TILE OVERLAY (Grid 12x8 for Player & Objects) */}
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 w-full h-full z-10">
        {Array.from({ length: cols * rows }).map((_, index) => {
          const x = index % cols;
          const y = Math.floor(index / cols);

          const isPlayerHere = playerPos.x === x && playerPos.y === y;

          // Object Positions mapped to match the reference photo
          const isDoor = (x === 5 || x === 6) && y === 1;
          const isSign = x === 3 && y === 1;
          const isSwitch = x === 8 && y === 1;
          const isMirror = x === 1 && y === 2;
          const isCake = x === 2 && y === 3;
          const isDog = x === 3 && y === 4;
          const isSans = x === 2 && y === 5;
          const isChest = x === 4 && y === 6;

          // Check if this tile is one of the 6 stepping stones
          const stone = stonePositions.find((s) => s.x === x && s.y === y);
          const isStonePressed = stone && pressedStones.includes(stone.id);

          return (
            <div
              key={index}
              onClick={() => {
                if (isDoor && onDoorClick) onDoorClick();
                else if (isSign && onSignClick) onSignClick();
                else if (isSwitch && onToggleSwitch) onToggleSwitch();
                else if (stone && onStoneClick) onStoneClick(stone.id);
                else onTileClick(x, y);
              }}
              className="relative flex items-center justify-center cursor-pointer transition-colors hover:bg-white/5"
            >
              {/* INTERACTIVE LABELS & SPRITES */}

              {/* Door Glow Target */}
              {isDoor && x === 5 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-[8px] font-mono font-bold text-yellow-300 bg-black/80 px-1 py-0.5 rounded border border-yellow-400 -mt-6 animate-pulse z-30">
                    👑 PORTA BOSS
                  </span>
                </div>
              )}

              {/* Stone Tablet Label */}
              {isSign && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[7px] font-mono font-bold text-neutral-200 bg-black/80 px-1 rounded -mt-6 border border-neutral-600">
                    📜 PLACA
                  </span>
                </div>
              )}

              {/* Golden Switch Label */}
              {isSwitch && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[7px] font-mono font-bold text-yellow-300 bg-black/80 px-1 rounded -mt-6 border border-yellow-500">
                    🕹️ ALAVANCA
                  </span>
                </div>
              )}

              {/* Stepping Stone Indicator */}
              {stone && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span
                    className={`text-[7px] font-mono font-bold px-1 rounded -mt-4 z-20 ${
                      isStonePressed
                        ? 'text-green-300 bg-black/90 border border-green-400'
                        : 'text-yellow-200 bg-black/70'
                    }`}
                  >
                    {isStonePressed ? '✓ ATIVO' : `PEDRA ${stone.id + 1}`}
                  </span>
                </div>
              )}

              {/* Legendary Mirror at (1, 2) */}
              {isMirror && (
                <div className="z-20 flex flex-col items-center">
                  <span className="text-[8px] font-mono font-bold text-yellow-300 bg-black/85 px-1 rounded mb-0.5 border border-yellow-400 shadow animate-pulse">
                    🪞 ESPELHO
                  </span>
                  <PixelMirror className="scale-100" />
                </div>
              )}

              {/* Birthday Cake at (2, 3) */}
              {isCake && (
                <div className="z-20 flex flex-col items-center">
                  <span className="text-[8px] font-mono font-bold text-pink-300 bg-black/85 px-1 rounded mb-0.5 border border-pink-400 shadow">
                    🎂 BOLO
                  </span>
                  <PixelCake className="scale-95" />
                  {hasTakenCake && (
                    <span className="text-[7px] font-mono text-pink-200 bg-black/80 px-1 rounded -mt-1">
                      (Vazio)
                    </span>
                  )}
                </div>
              )}

              {/* Annoying Dog at (3, 4) */}
              {isDog && (
                <div className="z-20 flex flex-col items-center">
                  <span className="text-[8px] font-mono font-bold text-yellow-300 bg-black/85 px-1 rounded mb-0.5">
                    🐶 CÃO
                  </span>
                  <PixelDog className="scale-100" />
                </div>
              )}

              {/* Sans NPC at (2, 5) */}
              {isSans && (
                <div className="z-20 flex flex-col items-center">
                  <span className="text-[8px] font-mono font-bold text-cyan-300 bg-black/85 px-1 rounded mb-0.5 border border-cyan-400">
                    💀 SANS
                  </span>
                  <PixelSans className="scale-100" />
                </div>
              )}

              {/* Gift Chest at (4, 6) */}
              {isChest && (
                <div className="z-20 flex flex-col items-center">
                  <PixelChest isOpen={hasOpenedChest} className="scale-100" />
                </div>
              )}

              {/* Player Character Sprite (Frisk) */}
              {isPlayerHere && (
                <div className="z-40 flex flex-col items-center">
                  <PixelPlayer
                    direction={playerDir}
                    isWalking={isWalking}
                    className="scale-110 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Decorative Bottom Bar for Puzzle Progress */}
      <div className="absolute bottom-1 left-2 right-2 flex items-center justify-between pointer-events-none z-20">
        <div className="bg-black/90 border border-purple-500/60 px-2 py-0.5 rounded text-[9px] font-mono text-purple-200 flex items-center gap-2">
          <span>Enigma das Pedras:</span>
          <span className="text-yellow-300 font-bold">
            {pressedStones.length}/6 Ativadas
          </span>
        </div>

        <div className="bg-black/90 border border-yellow-500/60 px-2 py-0.5 rounded text-[9px] font-mono text-yellow-300">
          {isSwitchFlipped ? '⚡ Alavanca: ATIVADA' : '⚪ Alavanca: DESLIGADA'}
        </div>
      </div>
    </div>
  );
};
