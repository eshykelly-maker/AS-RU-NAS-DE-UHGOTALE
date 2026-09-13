import React from 'react';

interface PartySpriteProps {
  type: 'KRIS' | 'SUSIE' | 'RALSEI';
  action?: 'IDLE' | 'ATTACK' | 'DEFEND' | 'MAGIC';
  className?: string;
}

export const DeltarunePartySprites: React.FC<PartySpriteProps> = ({
  type,
  action = 'IDLE',
  className = '',
}) => {
  const isAttack = action === 'ATTACK';
  const isDefend = action === 'DEFEND';
  const isMagic = action === 'MAGIC';

  // --- 1. KRIS (Dark World Knight) ---
  if (type === 'KRIS') {
    return (
      <div
        className={`relative w-12 h-16 select-none transition-transform duration-200 ${
          isAttack
            ? 'scale-125 -translate-y-2 text-cyan-300'
            : isDefend
            ? 'scale-95 opacity-90'
            : 'hover:scale-105'
        } ${className}`}
      >
        <svg
          viewBox="0 0 24 30"
          className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
          style={{ imageRendering: 'pixelated' }}
          shapeRendering="crispEdges"
        >
          {/* Floor Shadow */}
          <ellipse cx="12" cy="28.5" rx="8" ry="1.5" fill="#000000" opacity="0.5" />

          {/* Pink Scarf / Cape Flowing */}
          <rect x="5" y="10" width="14" height="3" fill="#db2777" />
          <rect x="3" y="12" width="5" height="8" fill="#be185d" />
          <rect x="2" y="16" width="4" height="6" fill="#9d174d" />

          {/* Hair (Slate/Dark Blue messy bangs) */}
          <rect x="7" y="1" width="10" height="6" fill="#1e293b" />
          <rect x="6" y="2" width="12" height="5" fill="#0f172a" />
          <rect x="5" y="4" width="14" height="4" fill="#1e293b" />

          {/* Face (Cyan Dark World Skin) */}
          <rect x="7" y="6" width="10" height="5" fill="#38bdf8" />
          {/* Bangs covering upper eyes */}
          <rect x="6" y="5" width="12" height="3" fill="#0f172a" />
          <rect x="7" y="7" width="3" height="2" fill="#1e293b" />
          <rect x="14" y="7" width="3" height="2" fill="#1e293b" />
          {/* Eyes underneath */}
          <rect x="8" y="8" width="2" height="1" fill="#0284c7" />
          <rect x="14" y="8" width="2" height="1" fill="#0284c7" />

          {/* Silver/Blue Armor Torso */}
          <rect x="6" y="11" width="12" height="9" fill="#0284c7" />
          {/* Chest Plate Highlight */}
          <rect x="8" y="12" width="8" height="6" fill="#38bdf8" />
          <rect x="9" y="13" width="6" height="4" fill="#e0f2fe" />

          {/* Shoulder Pads */}
          <rect x="4" y="11" width="3" height="4" fill="#0369a1" />
          <rect x="17" y="11" width="3" height="4" fill="#0369a1" />

          {/* Arms & Hands */}
          <rect x="4" y="15" width="2" height="4" fill="#0284c7" />
          <rect x="18" y="15" width="2" height="4" fill="#0284c7" />
          <rect x="4" y="18" width="2" height="2" fill="#38bdf8" />
          <rect x="18" y="18" width="2" height="2" fill="#38bdf8" />

          {/* Belt */}
          <rect x="6" y="19" width="12" height="2" fill="#1e1b4b" />
          <rect x="11" y="19" width="2" height="2" fill="#facc15" />

          {/* Legs */}
          <rect x="7" y="21" width="4" height="5" fill="#1e293b" />
          <rect x="13" y="21" width="4" height="5" fill="#1e293b" />

          {/* Steel Boots */}
          <rect x="6" y="25" width="5" height="3" fill="#0f172a" />
          <rect x="13" y="25" width="5" height="3" fill="#0f172a" />

          {/* SWORD (Action ATTACK or IDLE) */}
          {isAttack ? (
            <g className="animate-pulse">
              {/* Glowing Blade raised */}
              <rect x="19" y="1" width="3" height="15" fill="#fef08a" />
              <rect x="20" y="0" width="1" height="17" fill="#ffffff" />
              {/* Crossguard */}
              <rect x="17" y="15" width="7" height="2" fill="#f59e0b" />
              {/* Hilt */}
              <rect x="19" y="17" width="3" height="3" fill="#78350f" />
            </g>
          ) : (
            <g>
              {/* Sheathed Sword at side */}
              <rect x="3" y="12" width="2" height="10" fill="#fef08a" />
              <rect x="2" y="12" width="4" height="1.5" fill="#f59e0b" />
            </g>
          )}

          {/* SHIELD (Action DEFEND) */}
          {isDefend && (
            <g className="animate-pulse">
              <rect x="1" y="9" width="6" height="12" fill="#38bdf8" />
              <rect x="2" y="10" width="4" height="10" fill="#e0f2fe" />
              <rect x="3" y="13" width="2" height="4" fill="#0284c7" />
            </g>
          )}
        </svg>
      </div>
    );
  }

  // --- 2. SUSIE (Purple Dragon / Mane Ax Warrior) ---
  if (type === 'SUSIE') {
    return (
      <div
        className={`relative w-14 h-18 select-none transition-transform duration-200 ${
          isAttack
            ? 'scale-125 -translate-y-2 text-fuchsia-400'
            : isDefend
            ? 'scale-95 opacity-90'
            : 'hover:scale-105'
        } ${className}`}
      >
        <svg
          viewBox="0 0 28 34"
          className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
          style={{ imageRendering: 'pixelated' }}
          shapeRendering="crispEdges"
        >
          {/* Shadow */}
          <ellipse cx="14" cy="32" rx="10" ry="1.5" fill="#000000" opacity="0.5" />

          {/* Susie Wild Magenta Hair (Back & Top) */}
          <rect x="7" y="1" width="14" height="8" fill="#831843" />
          <rect x="5" y="3" width="18" height="8" fill="#9d174d" />
          <rect x="4" y="5" width="20" height="7" fill="#701a75" />

          {/* Face (Lavender Dragon Skin) */}
          <rect x="8" y="7" width="12" height="6" fill="#c084fc" />

          {/* Hair Bangs Covering Eyes */}
          <rect x="6" y="6" width="16" height="4" fill="#701a75" />
          <rect x="7" y="9" width="4" height="3" fill="#831843" />
          <rect x="17" y="9" width="4" height="3" fill="#831843" />

          {/* Fierce Yellow Eye / Smile peek */}
          <rect x="10" y="9" width="2" height="1" fill="#facc15" />
          <rect x="16" y="9" width="2" height="1" fill="#facc15" />
          <rect x="11" y="12" width="6" height="1" fill="#000000" />
          <rect x="12" y="12" width="1" height="1" fill="#ffffff" />
          <rect x="15" y="12" width="1" height="1" fill="#ffffff" />

          {/* Dark Purple Studded Jacket */}
          <rect x="5" y="13" width="18" height="11" fill="#581c87" />
          <rect x="7" y="14" width="14" height="9" fill="#3b0764" />
          {/* Black Shirt underneath */}
          <rect x="10" y="14" width="8" height="8" fill="#1e1b4b" />

          {/* Spiked Shoulder Pads */}
          <rect x="3" y="13" width="4" height="5" fill="#2e1065" />
          <rect x="21" y="13" width="4" height="5" fill="#2e1065" />
          <rect x="4" y="12" width="2" height="1" fill="#cbd5e1" />
          <rect x="22" y="12" width="2" height="1" fill="#cbd5e1" />

          {/* Studded Belt */}
          <rect x="6" y="22" width="16" height="3" fill="#020617" />
          <rect x="8" y="23" width="2" height="1" fill="#facc15" />
          <rect x="13" y="23" width="2" height="1" fill="#facc15" />
          <rect x="18" y="23" width="2" height="1" fill="#facc15" />

          {/* Black Jeans & Boots */}
          <rect x="8" y="25" width="5" height="5" fill="#0f172a" />
          <rect x="15" y="25" width="5" height="5" fill="#0f172a" />
          <rect x="7" y="29" width="6" height="3" fill="#020617" />
          <rect x="15" y="29" width="6" height="3" fill="#020617" />

          {/* MANE AXE (Susie's Giant Weapon) */}
          <g className={isAttack ? 'animate-bounce' : ''}>
            {/* Handle */}
            <rect x="22" y="2" width="3" height="26" fill="#475569" />
            <rect x="23" y="1" width="1" height="28" fill="#94a3b8" />
            {/* Pink Ribbon Wrap on handle */}
            <rect x="22" y="16" width="3" height="4" fill="#ec4899" />
            {/* Giant Axe Head */}
            <path d="M17 3 H26 V11 H17 Z" fill="#ec4899" />
            <rect x="15" y="4" width="11" height="6" fill="#cbd5e1" />
            <rect x="13" y="5" width="14" height="4" fill="#f1f5f9" />
            <rect x="12" y="6" width="15" height="2" fill="#ffffff" />
          </g>
        </svg>
      </div>
    );
  }

  // --- 3. RALSEI (Prince of the Dark) ---
  return (
    <div
      className={`relative w-12 h-16 select-none transition-transform duration-200 ${
        isMagic || isAttack
          ? 'scale-125 -translate-y-2 text-emerald-300'
          : isDefend
          ? 'scale-95 opacity-90'
          : 'hover:scale-105'
      } ${className}`}
    >
      <svg
        viewBox="0 0 24 30"
        className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)]"
        style={{ imageRendering: 'pixelated' }}
        shapeRendering="crispEdges"
      >
        {/* Shadow */}
        <ellipse cx="12" cy="28.5" rx="8" ry="1.5" fill="#000000" opacity="0.5" />

        {/* Pink Horns on top of hat */}
        <rect x="8" y="0" width="2" height="3" fill="#f43f5e" />
        <rect x="14" y="0" width="2" height="3" fill="#f43f5e" />
        <rect x="7" y="1" width="2" height="2" fill="#fb7185" />
        <rect x="15" y="1" width="2" height="2" fill="#fb7185" />

        {/* Wizard Pointy Green Hat */}
        <polygon points="12,2 8,8 16,8" fill="#15803d" />
        <rect x="9" y="4" width="6" height="4" fill="#166534" />
        {/* Wide Brim */}
        <rect x="4" y="7" width="16" height="3" fill="#15803d" />
        <rect x="3" y="8" width="18" height="2" fill="#166534" />

        {/* Head / Fluffy Dark Fur */}
        <rect x="6" y="10" width="12" height="5" fill="#1e293b" />

        {/* Glasses (Round Lenses) */}
        <rect x="7" y="11" width="4" height="3" fill="#ffffff" />
        <rect x="13" y="11" width="4" height="3" fill="#ffffff" />
        <rect x="8" y="12" width="2" height="1" fill="#38bdf8" />
        <rect x="14" y="12" width="2" height="1" fill="#38bdf8" />
        <rect x="11" y="12" width="2" height="1" fill="#ffffff" />

        {/* Cute Nose & Mouth */}
        <rect x="11" y="14" width="2" height="1" fill="#f43f5e" />

        {/* Fluffy Pink Scarf */}
        <rect x="5" y="15" width="14" height="3" fill="#f43f5e" />
        <rect x="4" y="16" width="16" height="2" fill="#ec4899" />
        {/* Scarf tail hanging */}
        <rect x="14" y="18" width="4" height="5" fill="#f43f5e" />

        {/* Vivid Green Robe */}
        <rect x="5" y="18" width="14" height="8" fill="#22c55e" />
        <rect x="4" y="19" width="16" height="6" fill="#16a34a" />

        {/* BLACK HEART EMBLEM ON CHEST */}
        <g>
          <rect x="10" y="20" width="1" height="1" fill="#000000" />
          <rect x="13" y="20" width="1" height="1" fill="#000000" />
          <rect x="9" y="21" width="6" height="1" fill="#000000" />
          <rect x="10" y="22" width="4" height="1" fill="#000000" />
          <rect x="11" y="23" width="2" height="1" fill="#000000" />
        </g>

        {/* Fluffy White Paws / Sleeves */}
        <rect x="3" y="20" width="3" height="4" fill="#16a34a" />
        <rect x="18" y="20" width="3" height="4" fill="#16a34a" />
        <rect x="2" y="23" width="3" height="2" fill="#f8fafc" />
        <rect x="19" y="23" width="3" height="2" fill="#f8fafc" />

        {/* Magic Sparkles when active */}
        {(isMagic || isAttack) && (
          <g className="animate-ping">
            <circle cx="2" cy="22" r="1.5" fill="#fde047" />
            <circle cx="22" cy="22" r="1.5" fill="#4ade80" />
            <circle cx="12" cy="5" r="1.5" fill="#f43f5e" />
          </g>
        )}

        {/* Small Boots */}
        <rect x="7" y="26" width="4" height="3" fill="#020617" />
        <rect x="13" y="26" width="4" height="3" fill="#020617" />
      </svg>
    </div>
  );
};
