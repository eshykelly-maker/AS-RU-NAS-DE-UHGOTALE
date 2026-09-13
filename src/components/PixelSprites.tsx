import React from 'react';

// --- PIXEL FRISK / KRIS PLAYER SPRITE ---
interface PixelPlayerProps {
  direction?: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
  isWalking?: boolean;
  className?: string;
}

export const PixelPlayer: React.FC<PixelPlayerProps> = ({
  direction = 'DOWN',
  isWalking = false,
  className = '',
}) => {
  const walkOffsetY = isWalking ? -2 : 0;

  return (
    <div
      className={`relative w-8 h-10 select-none transition-transform duration-100 ${
        isWalking ? 'animate-bounce' : ''
      } ${className}`}
      style={{ transform: `translateY(${walkOffsetY}px)` }}
    >
      <svg
        viewBox="0 0 16 20"
        className="w-full h-full"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Shadow */}
        <ellipse cx="8" cy="19" rx="6" ry="1.5" fill="#000" opacity="0.4" />

        {/* Direction UP (Back view) */}
        {direction === 'UP' && (
          <g>
            {/* Hair */}
            <rect x="3" y="1" width="10" height="7" fill="#3b200a" />
            <rect x="2" y="2" width="12" height="5" fill="#2d1807" />
            <rect x="4" y="0" width="8" height="2" fill="#3b200a" />
            {/* Blue Shirt Back */}
            <rect x="3" y="8" width="10" height="6" fill="#2563eb" />
            <rect x="3" y="10" width="10" height="1" fill="#db2777" />
            <rect x="3" y="12" width="10" height="1" fill="#db2777" />
            {/* Pants */}
            <rect x="4" y="14" width="3" height="4" fill="#1e3a8a" />
            <rect x="9" y="14" width="3" height="4" fill="#1e3a8a" />
            {/* Boots */}
            <rect x="3" y="17" width="4" height="2" fill="#500724" />
            <rect x="9" y="17" width="4" height="2" fill="#500724" />
          </g>
        )}

        {/* Direction DOWN (Front view) */}
        {direction === 'DOWN' && (
          <g>
            {/* Hair */}
            <rect x="3" y="1" width="10" height="5" fill="#3b200a" />
            <rect x="2" y="2" width="12" height="3" fill="#2d1807" />
            {/* Face */}
            <rect x="4" y="5" width="8" height="4" fill="#fce0a6" />
            {/* Eyes - Frisk/Kris determination expression */}
            <rect x="5" y="6" width="2" height="1" fill="#000000" />
            <rect x="9" y="6" width="2" height="1" fill="#000000" />
            {/* Mouth */}
            <rect x="7" y="8" width="2" height="1" fill="#8d5b4c" />
            {/* Cheeks */}
            <rect x="4" y="7" width="1" height="1" fill="#f87171" opacity="0.6" />
            <rect x="11" y="7" width="1" height="1" fill="#f87171" opacity="0.6" />
            {/* Blue Shirt */}
            <rect x="3" y="9" width="10" height="5" fill="#2563eb" />
            <rect x="3" y="10" width="10" height="1" fill="#db2777" />
            <rect x="3" y="12" width="10" height="1" fill="#db2777" />
            {/* Arms */}
            <rect x="2" y="9" width="1" height="4" fill="#2563eb" />
            <rect x="13" y="9" width="1" height="4" fill="#2563eb" />
            <rect x="2" y="13" width="1" height="1" fill="#fce0a6" />
            <rect x="13" y="13" width="1" height="1" fill="#fce0a6" />
            {/* Pants */}
            <rect x="4" y="14" width="3" height="4" fill="#1e3a8a" />
            <rect x="9" y="14" width="3" height="4" fill="#1e3a8a" />
            {/* Shoes */}
            <rect x="3" y="17" width="4" height="2" fill="#500724" />
            <rect x="9" y="17" width="4" height="2" fill="#500724" />
          </g>
        )}

        {/* Direction LEFT */}
        {direction === 'LEFT' && (
          <g>
            {/* Hair */}
            <rect x="4" y="1" width="8" height="5" fill="#3b200a" />
            <rect x="3" y="2" width="9" height="4" fill="#2d1807" />
            {/* Face Side */}
            <rect x="3" y="5" width="6" height="4" fill="#fce0a6" />
            <rect x="4" y="6" width="1" height="1" fill="#000000" />
            <rect x="3" y="8" width="2" height="1" fill="#8d5b4c" />
            {/* Body Side */}
            <rect x="4" y="9" width="7" height="5" fill="#2563eb" />
            <rect x="4" y="10" width="7" height="1" fill="#db2777" />
            <rect x="4" y="12" width="7" height="1" fill="#db2777" />
            {/* Arm Side */}
            <rect x="6" y="9" width="2" height="4" fill="#1d4ed8" />
            <rect x="6" y="13" width="2" height="1" fill="#fce0a6" />
            {/* Pants Side */}
            <rect x="5" y="14" width="5" height="3" fill="#1e3a8a" />
            {/* Shoes Side */}
            <rect x="4" y="17" width="5" height="2" fill="#500724" />
          </g>
        )}

        {/* Direction RIGHT */}
        {direction === 'RIGHT' && (
          <g>
            {/* Hair */}
            <rect x="4" y="1" width="8" height="5" fill="#3b200a" />
            <rect x="4" y="2" width="9" height="4" fill="#2d1807" />
            {/* Face Side */}
            <rect x="7" y="5" width="6" height="4" fill="#fce0a6" />
            <rect x="11" y="6" width="1" height="1" fill="#000000" />
            <rect x="11" y="8" width="2" height="1" fill="#8d5b4c" />
            {/* Body Side */}
            <rect x="5" y="9" width="7" height="5" fill="#2563eb" />
            <rect x="5" y="10" width="7" height="1" fill="#db2777" />
            <rect x="5" y="12" width="7" height="1" fill="#db2777" />
            {/* Arm Side */}
            <rect x="8" y="9" width="2" height="4" fill="#1d4ed8" />
            <rect x="8" y="13" width="2" height="1" fill="#fce0a6" />
            {/* Pants Side */}
            <rect x="6" y="14" width="5" height="3" fill="#1e3a8a" />
            {/* Shoes Side */}
            <rect x="7" y="17" width="5" height="2" fill="#500724" />
          </g>
        )}
      </svg>
    </div>
  );
};

// --- PIXEL SANS THE SKELETON ---
export const PixelSans: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-9 h-11 select-none animate-pulse ${className}`}>
    <svg viewBox="0 0 18 22" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Shadow */}
      <ellipse cx="9" cy="20.5" rx="7" ry="1.5" fill="#000" opacity="0.4" />

      {/* Skull Head */}
      <rect x="4" y="1" width="10" height="8" fill="#ffffff" />
      <rect x="3" y="2" width="12" height="6" fill="#ffffff" />
      {/* Skull Shading */}
      <rect x="4" y="8" width="10" height="1" fill="#e2e8f0" />
      {/* Eyes sockets */}
      <rect x="5" y="3" width="3" height="3" fill="#000000" />
      <rect x="10" y="3" width="3" height="3" fill="#000000" />
      {/* Blue glowing eye pupil in left socket */}
      <rect x="6" y="4" width="1" height="1" fill="#38bdf8" />
      <rect x="11" y="4" width="1" height="1" fill="#ffffff" />
      {/* Smile */}
      <rect x="6" y="7" width="6" height="1" fill="#000000" />
      <rect x="7" y="7" width="1" height="1" fill="#ffffff" />
      <rect x="9" y="7" width="1" height="1" fill="#ffffff" />

      {/* Blue Hoodie Jacket */}
      <rect x="3" y="9" width="12" height="7" fill="#2563eb" />
      <rect x="2" y="10" width="14" height="5" fill="#1d4ed8" />
      {/* Fluffy White Hood Collar */}
      <rect x="4" y="9" width="10" height="2" fill="#f8fafc" />
      {/* White T-Shirt showing */}
      <rect x="8" y="11" width="2" height="5" fill="#ffffff" />

      {/* Hands in Pockets */}
      <rect x="2" y="13" width="2" height="2" fill="#2563eb" />
      <rect x="14" y="13" width="2" height="2" fill="#2563eb" />

      {/* Dark Shorts with White Side Stripe */}
      <rect x="5" y="16" width="8" height="3" fill="#0f172a" />
      <rect x="4" y="16" width="1" height="3" fill="#ffffff" />
      <rect x="13" y="16" width="1" height="3" fill="#ffffff" />

      {/* Pink Slippers */}
      <rect x="4" y="19" width="4" height="2" fill="#f472b6" />
      <rect x="10" y="19" width="4" height="2" fill="#f472b6" />
    </svg>
  </div>
);

// --- PIXEL ANNOYING DOG (CÃO DA FESTA) ---
export const PixelDog: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-8 h-8 select-none animate-bounce ${className}`}>
    <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Shadow */}
      <ellipse cx="8" cy="15" rx="6" ry="1" fill="#000" opacity="0.4" />

      {/* Party Hat */}
      <polygon points="8,0 6,4 10,4" fill="#facc15" />
      <rect x="7" y="1" width="2" height="1" fill="#ec4899" />

      {/* Dog Head & Ears */}
      <rect x="3" y="3" width="3" height="3" fill="#ffffff" />
      <rect x="10" y="3" width="3" height="3" fill="#ffffff" />
      <rect x="4" y="4" width="8" height="6" fill="#ffffff" />
      {/* Nose & Eyes */}
      <rect x="5" y="6" width="1" height="2" fill="#000000" />
      <rect x="10" y="6" width="1" height="2" fill="#000000" />
      <rect x="7" y="7" width="2" height="2" fill="#000000" />

      {/* Body */}
      <rect x="3" y="9" width="10" height="4" fill="#ffffff" />
      {/* Collar */}
      <rect x="4" y="9" width="8" height="1" fill="#ef4444" />
      {/* Legs */}
      <rect x="4" y="13" width="2" height="2" fill="#ffffff" />
      <rect x="10" y="13" width="2" height="2" fill="#ffffff" />
      {/* Tail */}
      <rect x="13" y="8" width="2" height="2" fill="#ffffff" />
    </svg>
  </div>
);

// --- PIXEL BIRTHDAY CAKE ---
export const PixelCake: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-8 h-8 select-none ${className}`}>
    <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Plate */}
      <rect x="1" y="13" width="14" height="2" fill="#cbd5e1" />

      {/* Cake Bottom Layer (Chocolate) */}
      <rect x="2" y="9" width="12" height="4" fill="#78350f" />
      <rect x="2" y="11" width="12" height="1" fill="#f472b6" />

      {/* Cake Top Layer (Pink Frosting) */}
      <rect x="3" y="6" width="10" height="3" fill="#f472b6" />
      {/* Frosting drips */}
      <rect x="3" y="9" width="2" height="2" fill="#f472b6" />
      <rect x="7" y="9" width="2" height="2" fill="#f472b6" />
      <rect x="11" y="9" width="2" height="2" fill="#f472b6" />

      {/* Candles */}
      <rect x="4" y="3" width="1" height="3" fill="#38bdf8" />
      <rect x="8" y="3" width="1" height="3" fill="#facc15" />
      <rect x="11" y="3" width="1" height="3" fill="#4ade80" />

      {/* Candle Flames */}
      <rect x="4" y="1" width="1" height="2" fill="#ef4444" className="animate-ping" />
      <rect x="8" y="1" width="1" height="2" fill="#ef4444" className="animate-ping" />
      <rect x="11" y="1" width="1" height="2" fill="#ef4444" className="animate-ping" />
    </svg>
  </div>
);

// --- PIXEL CHEST ---
export const PixelChest: React.FC<{ isOpen?: boolean; className?: string }> = ({
  isOpen = false,
  className = '',
}) => (
  <div className={`relative w-8 h-8 select-none ${className}`}>
    <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Base Box */}
      <rect x="2" y="7" width="12" height="7" fill="#854d0e" />
      <rect x="1" y="8" width="14" height="5" fill="#a16207" />
      {/* Gold trims */}
      <rect x="1" y="8" width="2" height="6" fill="#facc15" />
      <rect x="13" y="8" width="2" height="6" fill="#facc15" />
      <rect x="7" y="10" width="2" height="2" fill="#facc15" />

      {/* Lid */}
      {!isOpen ? (
        <g>
          <rect x="2" y="3" width="12" height="5" fill="#ca8a04" />
          <rect x="1" y="4" width="14" height="3" fill="#eab308" />
          <rect x="1" y="4" width="2" height="3" fill="#facc15" />
          <rect x="13" y="4" width="2" height="3" fill="#facc15" />
        </g>
      ) : (
        <g>
          {/* Opened lid tilted up */}
          <rect x="2" y="0" width="12" height="4" fill="#a16207" />
          <rect x="3" y="4" width="10" height="3" fill="#fef08a" className="animate-pulse" />
        </g>
      )}
    </svg>
  </div>
);

// --- PIXEL ANCIENT DOOR WITH DELTA RUNE ---
export const PixelDoor: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-12 h-14 select-none ${className}`}>
    <svg viewBox="0 0 24 28" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Stone Archway Frame */}
      <rect x="2" y="0" width="20" height="28" fill="#334155" />
      <rect x="0" y="2" width="24" height="24" fill="#1e293b" />
      {/* Arch Curve top */}
      <rect x="4" y="0" width="16" height="4" fill="#475569" />

      {/* Wooden Gate Interior */}
      <rect x="4" y="4" width="16" height="22" fill="#451a03" />
      <rect x="5" y="5" width="14" height="20" fill="#78350f" />

      {/* Door Panels / Vertical Beams */}
      <rect x="11" y="4" width="2" height="22" fill="#27272a" />

      {/* Delta Rune Emblem Glowing Yellow */}
      <g className="animate-pulse">
        {/* Orb at top */}
        <circle cx="12" cy="9" r="2" fill="#facc15" />
        {/* Wings */}
        <polygon points="6,12 10,12 8,15" fill="#facc15" />
        <polygon points="18,12 14,12 16,15" fill="#facc15" />
        {/* Inverted Triangle */}
        <polygon points="12,18 9,14 15,14" fill="#facc15" />
      </g>
    </svg>
  </div>
);

// --- PIXEL MEMORY PHOTO FRAME ---
export const PixelMemoryFrame: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-8 h-8 select-none ${className}`}>
    <svg viewBox="0 0 16 16" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Outer Golden Frame */}
      <rect x="1" y="1" width="14" height="14" fill="#facc15" />
      <rect x="2" y="2" width="12" height="12" fill="#ca8a04" />
      {/* Inner Canvas Background */}
      <rect x="3" y="3" width="10" height="10" fill="#38bdf8" />
      {/* Mountain & Sun Pixel Art inside Frame */}
      <circle cx="10" cy="5" r="1.5" fill="#fef08a" />
      <polygon points="3,12 7,6 10,12" fill="#15803d" />
      <polygon points="7,12 11,8 13,12" fill="#166534" />
      {/* Two Pixel Friends holding hands inside */}
      <rect x="5" y="9" width="1" height="3" fill="#db2777" />
      <rect x="8" y="9" width="1" height="3" fill="#2563eb" />
      <rect x="6" y="10" width="2" height="1" fill="#fef08a" />
    </svg>
  </div>
);

// --- PIXEL BOSS (FRIEND WITH BIRTHDAY CROWN & PARTY CAPE) ---
export const PixelBossFriend: React.FC<{ friendName: string; className?: string }> = ({
  friendName,
  className = '',
}) => (
  <div className={`relative w-24 h-28 select-none flex flex-col items-center ${className}`}>
    {/* Floating Birthday Crown & Sparkles */}
    <div className="text-xs font-black text-yellow-300 font-mono tracking-wider bg-black/80 px-2 py-0.5 rounded border border-yellow-400 mb-1 animate-bounce">
      👑 {friendName.toUpperCase()}
    </div>

    <svg viewBox="0 0 32 36" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Aura Glow */}
      <circle cx="16" cy="18" r="15" fill="#fef08a" opacity="0.15" className="animate-ping" />

      {/* Golden Crown */}
      <polygon points="10,2 12,6 16,1 20,6 22,2 23,8 9,8" fill="#facc15" />
      <rect x="11" y="4" width="1" height="1" fill="#ef4444" />
      <rect x="16" y="3" width="1" height="1" fill="#38bdf8" />
      <rect x="20" y="4" width="1" height="1" fill="#4ade80" />

      {/* Head */}
      <rect x="10" y="8" width="12" height="9" fill="#fde047" />
      <rect x="9" y="9" width="14" height="7" fill="#fef08a" />

      {/* Cheerful Eyes */}
      <rect x="12" y="11" width="2" height="3" fill="#000000" />
      <rect x="18" y="11" width="2" height="3" fill="#000000" />
      <rect x="13" y="12" width="1" height="1" fill="#ffffff" />
      <rect x="19" y="12" width="1" height="1" fill="#ffffff" />

      {/* Big Rosy Cheeks */}
      <rect x="10" y="14" width="2" height="2" fill="#f43f5e" />
      <rect x="20" y="14" width="2" height="2" fill="#f43f5e" />

      {/* Smile */}
      <rect x="14" y="15" width="4" height="1" fill="#000000" />
      <rect x="15" y="16" width="2" height="1" fill="#000000" />

      {/* Royal Party Cape (Purple/Gold) */}
      <rect x="6" y="17" width="20" height="13" fill="#6b21a8" />
      <rect x="8" y="17" width="16" height="11" fill="#7e22ce" />
      <rect x="10" y="17" width="12" height="10" fill="#a855f7" />

      {/* Golden Star Emblem on Chest */}
      <polygon points="16,19 17,21 19,21 17.5,22.5 18,24.5 16,23 14,24.5 14.5,22.5 13,21 15,21" fill="#facc15" />

      {/* Party Ribbon holding Cape */}
      <rect x="10" y="17" width="12" height="2" fill="#facc15" />

      {/* Boots */}
      <rect x="10" y="28" width="4" height="4" fill="#3b0764" />
      <rect x="18" y="28" width="4" height="4" fill="#3b0764" />
      <rect x="9" y="31" width="5" height="2" fill="#facc15" />
      <rect x="18" y="31" width="5" height="2" fill="#facc15" />
    </svg>
  </div>
);

// --- PIXEL MIRROR WITH GOLDEN FLOWERS & WALL LAMP (REFERENCE IMAGE 3) ---
export const PixelMirror: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-8 h-10 select-none flex flex-col items-center ${className}`}>
    <svg viewBox="0 0 20 24" className="w-full h-full" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {/* Wall Sconce / Lamp on left */}
      <rect x="1" y="2" width="2" height="3" fill="#fef08a" />
      <rect x="1.5" y="5" width="1" height="3" fill="#475569" />

      {/* Mirror Outer Wooden Frame */}
      <rect x="5" y="2" width="9" height="12" fill="#78716c" />
      <rect x="6" y="3" width="7" height="10" fill="#cbd5e1" />
      {/* Inner reflection shimmer */}
      <rect x="7" y="4" width="5" height="4" fill="#94a3b8" />
      {/* Tiny reflection face in mirror */}
      <rect x="8" y="6" width="3" height="3" fill="#fde047" />
      <rect x="8" y="7" width="1" height="1" fill="#000000" />
      <rect x="10" y="7" width="1" height="1" fill="#000000" />

      {/* Stone Vase with Golden Buttercups on right */}
      <rect x="15" y="8" width="3" height="3" fill="#facc15" />
      <rect x="16" y="9" width="1" height="1" fill="#854d0e" />
      <rect x="16" y="11" width="1" height="3" fill="#15803d" />
      {/* Vase */}
      <polygon points="15,14 18,14 18,19 15,19" fill="#64748b" />

      {/* Base Floor Stand */}
      <rect x="4" y="14" width="11" height="1" fill="#44403c" />
    </svg>
  </div>
);

