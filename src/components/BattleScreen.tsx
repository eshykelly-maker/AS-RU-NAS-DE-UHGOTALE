import React, { useState, useEffect } from 'react';
import { FriendPreset, PlayerStats, BossState, InsideJoke, Item, AttackPattern } from '../types';
import { RetroText } from './RetroText';
import { BulletHellArena } from './BulletHellArena';
import { DeltarunePartySprites } from './DeltarunePartySprites';
import { PixelBossFriend } from './PixelSprites';
import { soundEngine } from '../utils/audio';
import { Heart, Swords, MessageSquare, Utensils, Sparkles, Shield, Music, VolumeX, Zap } from 'lucide-react';

interface BattleScreenProps {
  preset: FriendPreset;
  playerStats: PlayerStats;
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  onBattleEnd: (endingType: 'PACIFIST' | 'NEUTRAL') => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenJukebox?: () => void;
}

type TurnPhase = 
  | 'PARTY_COMMAND' 
  | 'FIGHT_MINIGAME' 
  | 'ACT_MENU' 
  | 'MAGIC_MENU' 
  | 'ITEM_MENU' 
  | 'MERCY_MENU' 
  | 'ACTION_RESULT' 
  | 'BOSS_ATTACK';

interface PartyMember {
  id: 'KRIS' | 'SUSIE' | 'RALSEI';
  name: string;
  role: string;
  hp: number;
  maxHp: number;
  color: string;
  borderColor: string;
  actionStatus: 'PRONTO' | 'DEFENDENDO' | 'ATACANDO' | 'MAGIA';
}

export const BattleScreen: React.FC<BattleScreenProps> = ({
  preset,
  playerStats,
  setPlayerStats,
  onBattleEnd,
  isMuted,
  onToggleMute,
  onOpenJukebox,
}) => {
  // Deltarune Tension Points (TP %)
  const [tp, setTp] = useState<number>(20); // starts with 20% TP

  // Deltarune Party Members
  const [party, setParty] = useState<PartyMember[]>([
    {
      id: 'KRIS',
      name: preset.creatorName.toUpperCase() || 'VOCÊ',
      role: 'Líder / Determinação',
      hp: playerStats.hp,
      maxHp: playerStats.maxHp,
      color: 'bg-cyan-500',
      borderColor: 'border-cyan-400 text-cyan-300',
      actionStatus: 'PRONTO',
    },
    {
      id: 'SUSIE',
      name: 'SUSIE (GUERREIRA)',
      role: 'Ataque Pesado',
      hp: 110,
      maxHp: 110,
      color: 'bg-fuchsia-500',
      borderColor: 'border-fuchsia-400 text-fuchsia-300',
      actionStatus: 'PRONTO',
    },
    {
      id: 'RALSEI',
      name: 'RALSEI (CURADOR)',
      role: 'Magia de Festa',
      hp: 75,
      maxHp: 75,
      color: 'bg-emerald-500',
      borderColor: 'border-emerald-400 text-emerald-300',
      actionStatus: 'PRONTO',
    },
  ]);

  // Current active party member selecting turn (0 = Kris, 1 = Susie, 2 = Ralsei)
  const [activeMemberIdx, setActiveMemberIdx] = useState<number>(0);

  // Boss state initialization
  const [boss, setBoss] = useState<BossState>({
    name: preset.bossName,
    title: preset.bossTitle,
    maxHp: 120,
    hp: 120,
    sparePercent: 0,
    isSpared: false,
    isDefeated: false,
    currentDialogue: `E aí, mano! Seja bem-vindo à Batalha em Equipe no estilo Deltarune! Preparado pro x1 festivo?!`,
    mood: 'HAPPY',
  });

  const [turnPhase, setTurnPhase] = useState<TurnPhase>('PARTY_COMMAND');
  const [actionNarrative, setActionNarrative] = useState<string>(
    `O Aniversariante ${preset.friendName} se prepara! Escolha a ação do seu grupo!`
  );

  // Attack Slider Mini-game State
  const [sliderPos, setSliderPos] = useState<number>(0);
  const [isSliderActive, setIsSliderActive] = useState<boolean>(false);

  // Visual Effect Triggering (Slash, Rude Buster, Heal Particles)
  const [activeEffect, setActiveEffect] = useState<'NONE' | 'SLASH' | 'RUDE_BUSTER' | 'HEAL_RAIN'>('NONE');

  // Active Attack Pattern for Dodge Phase
  const [currentAttackPattern, setCurrentAttackPattern] = useState<AttackPattern>({
    id: 'atk_candles',
    name: 'Velas do Bolo de Fogo',
    duration: 8,
    description: 'Velas incandescentes atiram chamas!',
    type: 'CANDLES',
  });

  // Keep playerStats synced with Kris HP
  useEffect(() => {
    setParty((prev) => {
      const updated = [...prev];
      updated[0].hp = playerStats.hp;
      return updated;
    });
  }, [playerStats.hp]);

  // Start background battle theme audio
  useEffect(() => {
    soundEngine.startBgm('MEGALOVANIA');
    return () => {
      soundEngine.stopBgm();
    };
  }, []);

  // Fight slider animation loop
  useEffect(() => {
    let animId: number;
    if (turnPhase === 'FIGHT_MINIGAME' && isSliderActive) {
      let dir = 1;
      const animate = () => {
        setSliderPos((prev) => {
          let next = prev + dir * 4.0;
          if (next >= 100) dir = -1;
          if (next <= 0) dir = 1;
          return next;
        });
        animId = requestAnimationFrame(animate);
      };
      animId = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(animId);
  }, [turnPhase, isSliderActive]);

  // Handle Graze in Bullet Hell -> Boost TP
  const handleGraze = () => {
    setTp((prev) => Math.min(100, prev + 5));
  };

  // Handle Player Attack Precision
  const handleAttackClick = () => {
    if (!isSliderActive) return;
    setIsSliderActive(false);
    soundEngine.playAttackSwingSound();

    // Trigger Slash animation
    setActiveEffect('SLASH');
    setTimeout(() => setActiveEffect('NONE'), 600);

    // Accuracy distance from target center 50
    const accuracy = 100 - Math.abs(sliderPos - 50) * 2;
    const currentMember = party[activeMemberIdx];
    const baseDmg = currentMember.id === 'SUSIE' ? 32 : 22;
    const damage = Math.max(10, Math.round((accuracy / 100) * baseDmg));

    // Gain +8% TP on successful hit
    setTp((prev) => Math.min(100, prev + 8));

    setBoss((prev) => {
      const newHp = Math.max(0, prev.hp - damage);
      const isDefeated = newHp <= 0;
      return {
        ...prev,
        hp: newHp,
        isDefeated,
        currentDialogue:
          accuracy > 80
            ? 'Caramba! Que golpe forte! Senti a energia do grupo!'
            : 'Haha! Mandou bem, mas eu continuo de pé!',
      };
    });

    setActionNarrative(`${currentMember.name} ataca com precisão de ${Math.round(accuracy)}%! Causou ${damage} de Dano no Aniversariante! (+8% TP)`);
    setTurnPhase('ACTION_RESULT');
  };

  // Handle ACT Option selection
  const handleActSelect = (joke: InsideJoke) => {
    soundEngine.playHealSound();
    setTp((prev) => Math.min(100, prev + 12));

    setBoss((prev) => {
      const newSpare = Math.min(100, prev.sparePercent + joke.damageReductionOrSpareBonus);
      return {
        ...prev,
        sparePercent: newSpare,
        currentDialogue: joke.bossReaction,
        mood: 'HAPPY',
      };
    });

    setActionNarrative(
      `Você usou [${joke.actOption}]: ${joke.description}\nO Aniversariante amou a piada! (+${joke.damageReductionOrSpareBonus}% Amizade, +12% TP)`
    );
    setTurnPhase('ACTION_RESULT');
  };

  // Handle Special Magic Spells (TP Cost)
  const handleCastSpell = (spellType: 'RUDE_BUSTER' | 'HEAL_PRAYER' | 'PACIFY_HUG') => {
    if (spellType === 'RUDE_BUSTER') {
      if (tp < 50) {
        soundEngine.playMoveSound();
        setActionNarrative('TP Insuficiente! Rude Buster precisa de 50% de TP (Esquive dos golpes para acumular TP!).');
        return;
      }
      setTp((prev) => Math.max(0, prev - 50));
      soundEngine.playHitSound();

      setActiveEffect('RUDE_BUSTER');
      setTimeout(() => setActiveEffect('NONE'), 800);

      const damage = 45;
      setBoss((prev) => {
        const newHp = Math.max(0, prev.hp - damage);
        return {
          ...prev,
          hp: newHp,
          currentDialogue: 'EITA! Que Rude Buster Festivo insano!! Me tirou 45 de HP!',
        };
      });

      setActionNarrative('SUSIE conjurou RUDE BUSTER FESTIVO! Um corte de energia rosa rasgou o ar causando 45 de DANO!');
    } else if (spellType === 'HEAL_PRAYER') {
      if (tp < 32) {
        soundEngine.playMoveSound();
        setActionNarrative('TP Insuficiente! Oração de Cura precisa de 32% de TP.');
        return;
      }
      setTp((prev) => Math.max(0, prev - 32));
      soundEngine.playHealSound();

      setActiveEffect('HEAL_RAIN');
      setTimeout(() => setActiveEffect('NONE'), 1000);

      // Heal all party members +35 HP
      setParty((prev) =>
        prev.map((m) => ({
          ...m,
          hp: Math.min(m.maxHp, m.hp + 35),
        }))
      );
      setPlayerStats((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 35) }));

      setActionNarrative('RALSEI cantou a Oração de Cura do Aniversário! Todo o grupo recuperou +35 HP!');
    } else if (spellType === 'PACIFY_HUG') {
      if (tp < 40) {
        soundEngine.playMoveSound();
        setActionNarrative('TP Insuficiente! O Super Abraço Pacificador precisa de 40% de TP.');
        return;
      }
      setTp((prev) => Math.max(0, prev - 40));
      soundEngine.playVictorySound();

      setBoss((prev) => ({
        ...prev,
        sparePercent: Math.min(100, prev.sparePercent + 40),
        currentDialogue: 'Aaaahh! Esse abraço em grupo deixou meu coração quentinho! Tmj!',
        mood: 'EMOTIONAL',
      }));

      setActionNarrative('O grupo fez um SUPER ABRAÇO PACIFICADOR! (+40% Barra de Amizade / Misericórdia)!');
    }

    setTurnPhase('ACTION_RESULT');
  };

  // Handle DEFEND (Adds TP and cuts next damage in half)
  const handleDefend = () => {
    soundEngine.playMoveSound();
    setTp((prev) => Math.min(100, prev + 16));

    const currentMember = party[activeMemberIdx];
    setParty((prev) => {
      const copy = [...prev];
      copy[activeMemberIdx].actionStatus = 'DEFENDENDO';
      return copy;
    });

    setActionNarrative(`${currentMember.name} assumiu postura defensiva! Dano reduzido em 50% no próximo turno! (+16% TP)`);
    setTurnPhase('ACTION_RESULT');
  };

  // Handle Using an Item
  const handleUseItem = (item: Item, index: number) => {
    soundEngine.playHealSound();

    // Heal all party members
    setParty((prev) =>
      prev.map((m) => ({ ...m, hp: Math.min(m.maxHp, m.hp + item.healAmount) }))
    );
    setPlayerStats((prev) => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + item.healAmount) }));

    setPlayerStats((prev) => {
      const newItems = [...prev.items];
      newItems.splice(index, 1);
      return { ...prev, items: newItems };
    });

    setActionNarrative(`Você usou [${item.name}]! O grupo inteiro recuperou +${item.healAmount} de HP!`);
    setTurnPhase('ACTION_RESULT');
  };

  // Handle Spare / Mercy
  const handleMercySpare = () => {
    if (boss.sparePercent >= 100) {
      soundEngine.playVictorySound();
      setBoss((prev) => ({ ...prev, isSpared: true }));
      onBattleEnd('PACIFIST');
    } else {
      soundEngine.playMoveSound();
      setActionNarrative(
        `O Aniversariante ainda quer curtir a festa! Aumente a barra de Amizade para 100% (use AGIR ou MAGIA) para poupá-lo!`
      );
      setTurnPhase('ACTION_RESULT');
    }
  };

  // Progress to Boss Attack / Dodge Turn
  const proceedToBossTurn = () => {
    if (boss.hp <= 0) {
      onBattleEnd('NEUTRAL');
      return;
    }

    // Reset status
    setParty((prev) =>
      prev.map((m) => ({
        ...m,
        actionStatus: m.actionStatus === 'DEFENDENDO' ? 'DEFENDENDO' : 'PRONTO',
      }))
    );

    // Pick random attack pattern
    const patterns: AttackPattern['type'][] = [
      'CANDLES',
      'PIZZA_DISCORD',
      'ZAP_BUBBLES',
      'CONFETTI',
      'BIG_CAKE',
      'FRIENDSHIP_RAIN',
    ];

    const randomType = patterns[Math.floor(Math.random() * patterns.length)];
    const names: Record<AttackPattern['type'], string> = {
      CANDLES: 'Velas de Aniversário Incandescentes',
      PIZZA_DISCORD: 'Chuva de Pizza & Notificações do Discord',
      ZAP_BUBBLES: 'Tsunami de Mensagens do Zap',
      CONFETTI: 'Tornado de Confete Festivo',
      BIG_CAKE: 'O Bolo Gigante Saltitante',
      FRIENDSHIP_RAIN: 'Chuva Doce de Corações',
    };

    setCurrentAttackPattern({
      id: `atk_${Date.now()}`,
      name: names[randomType],
      duration: 8,
      description: 'Esquive no quadro! Passe perto dos projéteis para ganhar TP!',
      type: randomType,
    });

    setTurnPhase('BOSS_ATTACK');
  };

  // Player takes damage during dodge phase
  const handleTakeDamage = (amount: number) => {
    setParty((prev) => {
      const copy = [...prev];
      // Distribute damage or apply to active member
      copy.forEach((m) => {
        const mult = m.actionStatus === 'DEFENDENDO' ? 0.5 : 1.0;
        m.hp = Math.max(1, Math.round(m.hp - amount * mult));
      });
      return copy;
    });

    setPlayerStats((prev) => ({
      ...prev,
      hp: Math.max(1, prev.hp - amount),
    }));
  };

  const activeMember = party[activeMemberIdx];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-2 sm:p-4 text-white select-none">
      {/* Top Header Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-2 px-2">
        <div className="text-cyan-400 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
          <span>BATALHA EM EQUIPE - DELTARUNE AMIZADE</span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenJukebox && (
            <button
              onClick={onOpenJukebox}
              className="px-2.5 py-1 bg-yellow-950 hover:bg-yellow-900 border border-yellow-400 text-yellow-200 text-xs font-mono font-bold rounded transition flex items-center gap-1.5 shadow"
            >
              <Music className="w-3.5 h-3.5 text-yellow-400 animate-pulse" />
              <span>Trilha Toby Fox</span>
            </button>
          )}
          <button
            onClick={onToggleMute}
            className="p-1.5 bg-neutral-900 border border-white/40 rounded text-xs text-neutral-300 flex items-center gap-1 hover:bg-neutral-800"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Music className="w-3.5 h-3.5 text-green-400" />}
            <span>{isMuted ? 'Mudo' : 'Música ON'}</span>
          </button>
        </div>
      </div>

      {/* Main Deltarune Battle Container */}
      <div className="w-full max-w-4xl bg-black border-4 border-slate-700 p-2 sm:p-4 rounded-lg shadow-2xl flex flex-col gap-3">
        
        {/* Deltarune Battle Stage: Left Side TP Gauge + Party Sprites vs Right Side Boss */}
        <div className="relative min-h-[220px] bg-gradient-to-b from-indigo-950 via-slate-900 to-black border-2 border-indigo-500/50 rounded-md p-3 flex flex-row items-center justify-between overflow-hidden shadow-inner">
          
          {/* Tension Bar (TP Meter) on Left */}
          <div className="flex flex-col items-center justify-center mr-2">
            <div className="text-[10px] font-mono font-black text-amber-400 flex items-center gap-0.5">
              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>TP</span>
            </div>
            <div className="w-5 h-36 bg-neutral-900 border-2 border-amber-400 rounded relative overflow-hidden flex flex-col justify-end">
              <div
                className="w-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-300 transition-all duration-300 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                style={{ height: `${tp}%` }}
              />
              <span className="absolute inset-0 text-[10px] font-mono font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,1)] flex items-center justify-center rotate-90">
                {tp}%
              </span>
            </div>
          </div>

          {/* Left Side: Deltarune Party (Kris, Susie, Ralsei) */}
          <div className="flex items-center gap-3 sm:gap-6 relative">
            {/* Kris Sprite */}
            <div className="flex flex-col items-center">
              <DeltarunePartySprites type="KRIS" action={party[0].actionStatus === 'DEFENDENDO' ? 'DEFEND' : 'IDLE'} />
              <span className="text-[10px] font-mono font-bold text-cyan-300 mt-1">{party[0].name.slice(0, 8)}</span>
            </div>

            {/* Susie Sprite */}
            <div className="flex flex-col items-center">
              <DeltarunePartySprites type="SUSIE" action={party[1].actionStatus === 'DEFENDENDO' ? 'DEFEND' : 'IDLE'} />
              <span className="text-[10px] font-mono font-bold text-fuchsia-300 mt-1">SUSIE</span>
            </div>

            {/* Ralsei Sprite */}
            <div className="flex flex-col items-center">
              <DeltarunePartySprites type="RALSEI" action={party[2].actionStatus === 'DEFENDENDO' ? 'DEFEND' : 'IDLE'} />
              <span className="text-[10px] font-mono font-bold text-emerald-300 mt-1">RALSEI</span>
            </div>
          </div>

          {/* Center Visual FX Overlay (Slash / Rude Buster / Heal) */}
          {activeEffect === 'SLASH' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="text-6xl font-mono font-black text-red-500 animate-ping drop-shadow-[0_0_20px_red]">
                ⚔️ CRITICAL SLICE!
              </div>
            </div>
          )}
          {activeEffect === 'RUDE_BUSTER' && (
            <div className="absolute inset-0 bg-fuchsia-600/30 flex items-center justify-center pointer-events-none z-20 animate-pulse">
              <div className="text-5xl font-mono font-black text-fuchsia-300 animate-bounce drop-shadow-[0_0_25px_fuchsia]">
                💖 RUDE BUSTER!! -45
              </div>
            </div>
          )}
          {activeEffect === 'HEAL_RAIN' && (
            <div className="absolute inset-0 bg-emerald-600/30 flex items-center justify-center pointer-events-none z-20 animate-pulse">
              <div className="text-4xl font-mono font-black text-emerald-300 animate-bounce drop-shadow-[0_0_20px_emerald]">
                ✨ CURA DO ANIVERSÁRIO! +35 HP
              </div>
            </div>
          )}

          {/* Right Side: Boss & Comic Speech Bubble */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Speech Bubble */}
            <div className="bg-white text-black p-3 rounded-xl relative border-2 border-black font-mono text-xs shadow-xl max-w-[200px] sm:max-w-[240px]">
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-l-8 border-l-white border-b-8 border-b-transparent hidden sm:block" />
              <p className="font-bold leading-snug">"{boss.currentDialogue}"</p>
            </div>

            {/* Boss Sprite & Meters */}
            <div className="flex flex-col items-center">
              <PixelBossFriend friendName={preset.friendName} className="drop-shadow-[0_0_20px_rgba(234,179,8,0.7)]" />
              <div className="font-mono font-extrabold text-yellow-300 text-xs mt-1 text-center">
                {boss.name}
              </div>

              {/* Boss HP Bar */}
              <div className="w-32 bg-neutral-900 border border-red-500 rounded-full h-2.5 mt-1 overflow-hidden relative">
                <div className="bg-red-500 h-full transition-all duration-300" style={{ width: `${(boss.hp / boss.maxHp) * 100}%` }} />
              </div>

              {/* Friendship / Mercy Bar */}
              <div className="w-32 bg-neutral-900 border border-green-400 rounded-full h-2.5 mt-1 overflow-hidden relative">
                <div className="bg-green-400 h-full transition-all duration-500" style={{ width: `${boss.sparePercent}%` }} />
              </div>
              <span className="text-[9px] font-mono font-bold text-green-300 mt-0.5">
                AMIZADE: {boss.sparePercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Combat Console / Action Area */}
        <div className="min-h-[160px] bg-neutral-950 border-2 border-neutral-700 p-3 rounded flex flex-col justify-center">
          
          {/* Party Member Selector / Action Narrative */}
          {turnPhase === 'PARTY_COMMAND' && (
            <div className="space-y-3 font-mono">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <div className="text-xs font-bold text-yellow-300 flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${activeMember.color} animate-ping`} />
                  <span>TURNO DE AÇÃO DE: {activeMember.name}</span>
                </div>
                <div className="flex gap-1 text-[11px]">
                  {party.map((m, idx) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveMemberIdx(idx)}
                      className={`px-2 py-0.5 rounded border transition font-bold ${
                        idx === activeMemberIdx
                          ? `${m.borderColor} bg-neutral-800 border-yellow-400`
                          : 'border-neutral-700 text-neutral-400'
                      }`}
                    >
                      {m.id}
                    </button>
                  ))}
                </div>
              </div>
              <RetroText text={actionNarrative} speakerName="Log do Combate" showContinueArrow={false} />
            </div>
          )}

          {/* FIGHT Slider Mini-game */}
          {turnPhase === 'FIGHT_MINIGAME' && (
            <div className="flex flex-col items-center justify-center space-y-3 p-1">
              <div className="text-cyan-300 font-mono text-xs font-bold tracking-widest uppercase">
                🎯 CLIQUE OU PRESSIONE PARA ATAQUE DE PRECISÃO DELTARUNE!
              </div>
              <div className="relative w-full max-w-md h-9 bg-neutral-900 border-4 border-cyan-400 rounded overflow-hidden">
                <div className="absolute top-0 bottom-0 left-[42%] right-[42%] bg-green-500/50 border-x-2 border-green-300 flex items-center justify-center text-[9px] text-white font-bold">
                  PERFEITO
                </div>
                <div
                  className="absolute top-0 bottom-0 w-3 bg-cyan-400 border border-white transition-all shadow-[0_0_10px_cyan]"
                  style={{ left: `${sliderPos}%` }}
                />
              </div>
              <button
                onClick={handleAttackClick}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-xs border-2 border-white rounded shadow-lg active:scale-95 transition"
              >
                ⚔️ GOLPEAR COM {activeMember.name}!
              </button>
            </div>
          )}

          {/* MAGIC / SPELLS Submenu */}
          {turnPhase === 'MAGIC_MENU' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
              <button
                onClick={() => handleCastSpell('RUDE_BUSTER')}
                className="p-2.5 bg-fuchsia-950/80 hover:bg-fuchsia-900 border-2 border-fuchsia-400 text-fuchsia-200 rounded text-left transition active:scale-95 flex flex-col justify-between"
              >
                <div className="font-bold flex items-center justify-between">
                  <span>💖 Rude Buster Festivo</span>
                  <span className="text-amber-400">50% TP</span>
                </div>
                <span className="text-[10px] text-fuchsia-300 mt-1">Corte pesado que inflige 45 de dano!</span>
              </button>

              <button
                onClick={() => handleCastSpell('HEAL_PRAYER')}
                className="p-2.5 bg-emerald-950/80 hover:bg-emerald-900 border-2 border-emerald-400 text-emerald-200 rounded text-left transition active:scale-95 flex flex-col justify-between"
              >
                <div className="font-bold flex items-center justify-between">
                  <span>💚 Oração de Cura</span>
                  <span className="text-amber-400">32% TP</span>
                </div>
                <span className="text-[10px] text-emerald-300 mt-1">Restaura +35 HP para todo o grupo!</span>
              </button>

              <button
                onClick={() => handleCastSpell('PACIFY_HUG')}
                className="p-2.5 bg-pink-950/80 hover:bg-pink-900 border-2 border-pink-400 text-pink-200 rounded text-left transition active:scale-95 flex flex-col justify-between"
              >
                <div className="font-bold flex items-center justify-between">
                  <span>🤗 Super Abraço Grupo</span>
                  <span className="text-amber-400">40% TP</span>
                </div>
                <span className="text-[10px] text-pink-300 mt-1">+40% na Barra de Amizade / Misericórdia!</span>
              </button>
            </div>
          )}

          {/* ACT Submenu Options */}
          {turnPhase === 'ACT_MENU' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
              {preset.insideJokes.map((joke) => (
                <button
                  key={joke.id}
                  onClick={() => handleActSelect(joke)}
                  className="p-2 bg-neutral-900 hover:bg-neutral-800 border-2 border-yellow-400 text-yellow-300 rounded text-left transition active:scale-95"
                >
                  * {joke.actOption} (+12% TP)
                </button>
              ))}
              <button
                onClick={() => handleCastSpell('PACIFY_HUG')}
                className="p-2 bg-pink-950 hover:bg-pink-900 border-2 border-pink-400 text-pink-200 rounded text-left transition active:scale-95"
              >
                * Fazer Cantoria de Parabéns em Grupo (40% TP)
              </button>
            </div>
          )}

          {/* ITEM Submenu Options */}
          {turnPhase === 'ITEM_MENU' && (
            <div className="space-y-2 font-mono text-xs">
              {playerStats.items.length === 0 ? (
                <div className="text-neutral-400 p-3 text-center">
                  * Não há itens de festa no inventário!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {playerStats.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleUseItem(item, idx)}
                      className="p-2 bg-neutral-900 hover:bg-neutral-800 border-2 border-white text-white rounded text-left flex items-center justify-between transition active:scale-95"
                    >
                      <span>* {item.name}</span>
                      <span className="text-green-400 font-bold">+{item.healAmount} HP Grupo</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MERCY Submenu Options */}
          {turnPhase === 'MERCY_MENU' && (
            <div className="space-y-2 font-mono text-xs">
              <button
                onClick={handleMercySpare}
                className={`w-full p-2.5 border-2 rounded text-left flex items-center justify-between transition font-bold ${
                  boss.sparePercent >= 100
                    ? 'bg-yellow-950 border-yellow-400 text-yellow-300 animate-pulse text-sm'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-300'
                }`}
              >
                <span>💛 POUPAR (AMIZADE MISERICÓRDIA)</span>
                <span>{boss.sparePercent >= 100 ? '★ PRONTO! ★' : `${boss.sparePercent}% / 100%`}</span>
              </button>
            </div>
          )}

          {/* Action Result / Narrative Dialog then Boss Turn */}
          {turnPhase === 'ACTION_RESULT' && (
            <div className="space-y-3 font-mono">
              <RetroText
                text={actionNarrative}
                speakerName="Resultado do Turno"
                onComplete={() => {}}
                showContinueArrow={false}
              />
              <div className="flex justify-end">
                <button
                  onClick={proceedToBossTurn}
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-black font-mono font-bold text-xs rounded border-2 border-white transition shadow-lg animate-bounce"
                >
                  ⏩ PASSAR PARA TURNO DE ESQUIVA DO CHEFE
                </button>
              </div>
            </div>
          )}

          {/* Boss Attack Turn: Bullet Hell Dodge Minigame with Graze mechanics */}
          {turnPhase === 'BOSS_ATTACK' && (
            <BulletHellArena
              attackPattern={currentAttackPattern}
              friendName={preset.friendName}
              onTakeDamage={handleTakeDamage}
              onGraze={handleGraze}
              onAttackFinished={() => {
                setTurnPhase('PARTY_COMMAND');
                setActionNarrative(`Vocês sobreviveram ao ataque! Escolha a próxima ação do grupo.`);
              }}
              isMuted={isMuted}
            />
          )}
        </div>

        {/* Deltarune Bottom Party HP Cards (Cyan Kris, Magenta Susie, Mint Ralsei) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs">
          {party.map((m, idx) => (
            <div
              key={m.id}
              className={`p-2 bg-neutral-900 border-2 rounded flex flex-col justify-between transition ${
                idx === activeMemberIdx ? `${m.borderColor} shadow-[0_0_10px_rgba(255,255,255,0.2)] bg-neutral-800` : 'border-neutral-700 text-neutral-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">{m.name}</span>
                <span className="text-[10px] opacity-80">{m.role}</span>
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="text-[10px] text-amber-400 font-bold">HP</span>
                <div className="flex-1 bg-red-950 border border-red-500 h-3 rounded overflow-hidden relative">
                  <div className={`h-full transition-all duration-300 ${m.color}`} style={{ width: `${(m.hp / m.maxHp) * 100}%` }} />
                </div>
                <span className="text-[10px] font-bold">
                  {m.hp}/{m.maxHp}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Command Buttons Bar */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 font-mono">
          <button
            onClick={() => {
              if (turnPhase === 'BOSS_ATTACK') return;
              soundEngine.playMoveSound();
              setTurnPhase('FIGHT_MINIGAME');
              setIsSliderActive(true);
              setSliderPos(0);
            }}
            disabled={turnPhase === 'BOSS_ATTACK'}
            className={`p-2 border-2 rounded text-center font-bold text-xs flex flex-col items-center justify-center gap-1 transition ${
              turnPhase === 'FIGHT_MINIGAME'
                ? 'bg-cyan-950 border-cyan-400 text-cyan-300 scale-105 shadow-[0_0_12px_cyan]'
                : 'bg-black border-cyan-500 text-cyan-400 hover:bg-neutral-900'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>LUTAR</span>
          </button>

          <button
            onClick={() => {
              if (turnPhase === 'BOSS_ATTACK') return;
              soundEngine.playMoveSound();
              setTurnPhase('ACT_MENU');
            }}
            disabled={turnPhase === 'BOSS_ATTACK'}
            className={`p-2 border-2 rounded text-center font-bold text-xs flex flex-col items-center justify-center gap-1 transition ${
              turnPhase === 'ACT_MENU'
                ? 'bg-amber-950 border-yellow-400 text-yellow-300 scale-105 shadow-[0_0_12px_gold]'
                : 'bg-black border-amber-500 text-amber-400 hover:bg-neutral-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>AGIR</span>
          </button>

          <button
            onClick={() => {
              if (turnPhase === 'BOSS_ATTACK') return;
              soundEngine.playMoveSound();
              setTurnPhase('MAGIC_MENU');
            }}
            disabled={turnPhase === 'BOSS_ATTACK'}
            className={`p-2 border-2 rounded text-center font-bold text-xs flex flex-col items-center justify-center gap-1 transition ${
              turnPhase === 'MAGIC_MENU'
                ? 'bg-fuchsia-950 border-fuchsia-400 text-fuchsia-300 scale-105 shadow-[0_0_12px_fuchsia]'
                : 'bg-black border-fuchsia-500 text-fuchsia-400 hover:bg-neutral-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>MAGIA</span>
          </button>

          <button
            onClick={() => {
              if (turnPhase === 'BOSS_ATTACK') return;
              soundEngine.playMoveSound();
              setTurnPhase('ITEM_MENU');
            }}
            disabled={turnPhase === 'BOSS_ATTACK'}
            className={`p-2 border-2 rounded text-center font-bold text-xs flex flex-col items-center justify-center gap-1 transition ${
              turnPhase === 'ITEM_MENU'
                ? 'bg-orange-950 border-orange-400 text-orange-300 scale-105 shadow-[0_0_12px_orange]'
                : 'bg-black border-orange-500 text-orange-400 hover:bg-neutral-900'
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>ITEM</span>
          </button>

          <button
            onClick={() => {
              if (turnPhase === 'BOSS_ATTACK') return;
              handleDefend();
            }}
            disabled={turnPhase === 'BOSS_ATTACK'}
            className="p-2 border-2 rounded text-center font-bold text-xs flex flex-col items-center justify-center gap-1 transition bg-black border-indigo-500 text-indigo-400 hover:bg-neutral-900"
          >
            <Shield className="w-4 h-4" />
            <span>DEFENDER</span>
          </button>

          <button
            onClick={() => {
              if (turnPhase === 'BOSS_ATTACK') return;
              soundEngine.playMoveSound();
              setTurnPhase('MERCY_MENU');
            }}
            disabled={turnPhase === 'BOSS_ATTACK'}
            className={`p-2 border-2 rounded text-center font-bold text-xs flex flex-col items-center justify-center gap-1 transition ${
              turnPhase === 'MERCY_MENU'
                ? 'bg-yellow-950 border-yellow-400 text-yellow-300 scale-105 shadow-[0_0_12px_yellow]'
                : boss.sparePercent >= 100
                ? 'bg-yellow-900/60 border-yellow-400 text-yellow-300 animate-pulse'
                : 'bg-black border-yellow-500 text-yellow-500 hover:bg-neutral-900'
            }`}
          >
            <Heart className="w-4 h-4 fill-current" />
            <span>MERCÊ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
