import React, { useState, useEffect } from 'react';
import { FriendPreset, PlayerStats, Item } from '../types';
import { RetroText } from './RetroText';
import { DeltaruneMapGrid } from './DeltaruneMapTiles';
import { MirrorScene } from './MirrorScene';
import { soundEngine } from '../utils/audio';
import { Gift, Cake, Heart, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Music, VolumeX } from 'lucide-react';

interface OverworldProps {
  preset: FriendPreset;
  playerStats: PlayerStats;
  setPlayerStats: React.Dispatch<React.SetStateAction<PlayerStats>>;
  onTriggerBattle: () => void;
  onOpenCustomizer: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenJukebox?: () => void;
}

export const Overworld: React.FC<OverworldProps> = ({
  preset,
  playerStats,
  setPlayerStats,
  onTriggerBattle,
  onOpenCustomizer,
  isMuted,
  onToggleMute,
  onOpenJukebox,
}) => {
  // Map dimensions (grid 12x8)
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 6 });
  const [playerDir, setPlayerDir] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('DOWN');
  const [isWalking, setIsWalking] = useState(false);

  const [activeDialogue, setActiveDialogue] = useState<{
    text: string;
    speaker?: string;
    portrait?: string;
    choices?: { label: string; action: () => void }[];
  } | null>({
    text: `Bem-vindo à Zona Comemorativa do Underground! Explore a sala e aproxime-se da Porta para encontrar ${preset.friendName}.`,
    speaker: 'Sua Determinação',
    portrait: '💛',
  });

  const [hasTakenCake, setHasTakenCake] = useState(false);
  const [hasOpenedChest, setHasOpenedChest] = useState(false);
  const [npcInteractionCount, setNpcInteractionCount] = useState(0);
  const [showMirrorScene, setShowMirrorScene] = useState(false);
  const [isSwitchFlipped, setIsSwitchFlipped] = useState(false);
  const [pressedStones, setPressedStones] = useState<number[]>([]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeDialogue && activeDialogue.choices) return;

      let dx = 0;
      let dy = 0;
      let dir: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null = null;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') { dy = -1; dir = 'UP'; }
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') { dy = 1; dir = 'DOWN'; }
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') { dx = -1; dir = 'LEFT'; }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') { dx = 1; dir = 'RIGHT'; }

      if (dx !== 0 || dy !== 0) {
        e.preventDefault();
        if (dir) setPlayerDir(dir);
        movePlayer(dx, dy);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, activeDialogue]);

  const movePlayer = (dx: number, dy: number) => {
    const newX = Math.max(0, Math.min(11, playerPos.x + dx));
    const newY = Math.max(0, Math.min(7, playerPos.y + dy));

    if (newX !== playerPos.x || newY !== playerPos.y) {
      setIsWalking(true);
      setTimeout(() => setIsWalking(false), 200);
      setPlayerPos({ x: newX, y: newY });
      soundEngine.playMoveSound();
      checkInteractions(newX, newY);
    }
  };

  const checkInteractions = (x: number, y: number) => {
    // Legendary Mirror interaction at (1, 2)
    if (x === 1 && y === 2) {
      soundEngine.playSaveSound();
      setActiveDialogue({
        text: `* É você!\n* Apesar de tudo, ainda é você, ${preset.friendName}.\n\nOlhar no espelho enche seu coração de DETERMINAÇÃO.`,
        speaker: 'Espelho Místico',
        portrait: '🪞',
        choices: [
          {
            label: '🪞 Olhar no Espelho (Cena Completa)',
            action: () => {
              setShowMirrorScene(true);
            },
          },
          {
            label: 'Continuar explorando a sala',
            action: () => {
              setActiveDialogue({
                text: `Você dá um passo para trás com um sorriso e determinação renovada.`,
                speaker: 'Sistema',
                portrait: '✨',
              });
            },
          },
        ],
      });
    }

    // Cake interaction at (2, 3) or (2, 2)
    if ((x === 2 && y === 3) || (x === 2 && y === 2)) {
      if (!hasTakenCake) {
        setActiveDialogue({
          text: `Você encontrou o BOLO MÍSTICO DE ANIVERSÁRIO de ${preset.friendName}! Cheira deliciosamente bem a brigadeiro e festa.`,
          speaker: 'O Bolo Sagrado',
          portrait: '🎂',
          choices: [
            {
              label: 'Pegar uma fatia (+15 HP)',
              action: () => {
                setHasTakenCake(true);
                const cakeItem: Item = {
                  id: 'cake_slice',
                  name: 'Fatia Especial de Bolo',
                  description: 'Recupera 15 HP no meio da batalha!',
                  healAmount: 15,
                  iconName: 'Cake',
                };
                setPlayerStats((prev) => ({
                  ...prev,
                  items: [...prev.items, cakeItem],
                  moralPoints: prev.moralPoints + 1,
                }));
                soundEngine.playHealSound();
                setActiveDialogue({
                  text: `Você guardou uma fatia saborosa no inventário! (Moral +1)`,
                  speaker: 'Sistema',
                  portrait: '🎂',
                });
              },
            },
            {
              label: 'Deixar intacto para o Aniversariante',
              action: () => {
                setPlayerStats((prev) => ({ ...prev, moralPoints: prev.moralPoints + 3 }));
                setActiveDialogue({
                  text: `Você respeitou a integridade do bolo! Sua consideração enche você de DETERMINAÇÃO! (Moral +3)`,
                  speaker: 'Sistema',
                  portrait: '✨',
                });
              },
            },
          ],
        });
      } else {
        setActiveDialogue({
          text: `Apenas migalhas e memórias doces permanecem aqui.`,
          speaker: 'O Bolo Sagrado',
          portrait: '🎂',
        });
      }
    }

    // Ancient Stone Tablet at (3, 1)
    if (x === 3 && y === 1) {
      handleSignClick();
    }

    // Golden Lever at (8, 1)
    if (x === 8 && y === 1) {
      handleToggleSwitch();
    }

    // Stepping Stones puzzle at (7, 3), (9, 3), (8, 4), (7, 5), (9, 5), (8, 6)
    const stonesCoords = [
      { id: 0, x: 7, y: 3 },
      { id: 1, x: 9, y: 3 },
      { id: 2, x: 8, y: 4 },
      { id: 3, x: 7, y: 5 },
      { id: 4, x: 9, y: 5 },
      { id: 5, x: 8, y: 6 },
    ];
    const steppedStone = stonesCoords.find((s) => s.x === x && s.y === y);
    if (steppedStone) {
      handleStoneClick(steppedStone.id);
    }

    // Memory Frame at (9, 2)
    if (x === 9 && y === 2) {
      const randomMemory = preset.memories[Math.floor(Math.random() * preset.memories.length)];
      setActiveDialogue({
        text: `QUADRO DAS RECORDAÇÕES:\n"${randomMemory}"\n\nVer isso faz você sorrir lembrando de todas as aventuras juntos!`,
        speaker: 'Quadro de Fotos',
        portrait: '🖼️',
      });
    }

    // NPC Party Mascot (Dog) at (3, 4) or (3, 5)
    if ((x === 3 && y === 4) || (x === 3 && y === 5)) {
      if (npcInteractionCount === 0) {
        setActiveDialogue({
          text: `Au au! Hoje é dia de festa! Você está preparado para dar os parabéns para ${preset.friendName}? Tenho uma dica: na batalha, tente a opção AGIR para relembrar as melhores histórias!`,
          speaker: 'Cão da Festa',
          portrait: '🐶',
          choices: [
            {
              label: 'Agradecer carinhosamente (+Guaraná)',
              action: () => {
                setNpcInteractionCount(1);
                soundEngine.playHealSound();
                const sodaItem: Item = {
                  id: 'soda_party',
                  name: 'Guaraná Geladinho',
                  description: 'Recupera 15 HP.',
                  healAmount: 15,
                  iconName: 'Wine',
                };
                setPlayerStats((prev) => ({
                  ...prev,
                  items: [...prev.items, sodaItem],
                  moralPoints: prev.moralPoints + 2,
                }));
                setActiveDialogue({
                  text: `O Cão da Festa te deu um Guaraná Gelado! "Aproveite a comemoração!"`,
                  speaker: 'Cão da Festa',
                  portrait: '🐶',
                });
              },
            },
            {
              label: 'Ignorar e seguir em frente',
              action: () => {
                setNpcInteractionCount(1);
                setActiveDialogue({
                  text: `O cão abana o rabo assim mesmo. "Boa sorte na festa!"`,
                  speaker: 'Cão da Festa',
                  portrait: '🐶',
                });
              },
            },
          ],
        });
      } else {
        setActiveDialogue({
          text: `Au au! Não esqueça das piadas internas durante o combate!`,
          speaker: 'Cão da Festa',
          portrait: '🐶',
        });
      }
    }

    // Sans Piadista at (2, 5) or (9, 5)
    if ((x === 2 && y === 5) || (x === 9 && y === 5)) {
      const jokesList = [
        `* heh. sabia que hoje o aniversariante tá ficando mais velho? mais um ano e ainda não aprendeu a lavar a louça do bolo.`,
        `* por que o esqueleto não brigou na festa de aniversário? porque ele não tinha PEITO pra isso! ba-dum-tss. 🥁`,
        `* atenção: comer bolo demais pode causar um aumento drástico em... felicidade. tome cuidado lá dentro.`,
        `* o mestre da festa tá te esperando do outro lado da porta. leva bastante piada e determinação!`
      ];
      const randomJoke = jokesList[Math.floor(Math.random() * jokesList.length)];
      setActiveDialogue({
        text: randomJoke,
        speaker: 'Sans (O Esqueleto Piadista)',
        portrait: '💀',
      });
    }

    // Gift Chest at (4, 6) or (8, 5)
    if ((x === 4 && y === 6) || (x === 8 && y === 5)) {
      if (!hasOpenedChest) {
        setHasOpenedChest(true);
        soundEngine.playVictorySound();
        const giftItem: Item = {
          id: 'party_snack',
          name: 'Salgadinho de Festa',
          description: 'Recupera 10 HP.',
          healAmount: 10,
          iconName: 'Utensils',
        };
        setPlayerStats((prev) => ({
          ...prev,
          items: [...prev.items, giftItem],
        }));
        setActiveDialogue({
          text: `Você abriu o Baú de Presentes e encontrou [Salgadinho de Festa]!`,
          speaker: 'Baú Surpresa',
          portrait: '🎁',
        });
      } else {
        setActiveDialogue({
          text: `O baú está vazio, mas o sentimento de presente permanece.`,
          speaker: 'Baú Surpresa',
          portrait: '🎁',
        });
      }
    }

    // Boss Gate / Door at (5, 1) or (6, 1)
    if ((x === 5 && y === 1) || (x === 6 && y === 1)) {
      handleDoorClick();
    }
  };

  const handleToggleSwitch = () => {
    soundEngine.playSwitchSound();
    setIsSwitchFlipped((prev) => !prev);
    setActiveDialogue({
      text: `* (CLICK!)\n* Você puxou a alavanca dourada das Ruínas!\n* Um estalo mecânico ressoa e as tochas das Ruínas vibram com festa!`,
      speaker: 'Alavanca Dourada',
      portrait: '🕹️',
    });
  };

  const handleStoneClick = (stoneId: number) => {
    soundEngine.playSwitchSound();
    setPressedStones((prev) => {
      if (prev.includes(stoneId)) return prev;
      const next = [...prev, stoneId];
      if (next.length === 6) {
        soundEngine.playPuzzleSolvedSound();
        setPlayerStats((p) => ({ ...p, moralPoints: p.moralPoints + 5 }));
        setActiveDialogue({
          text: `* (CLIC-CLIC-CLIC!)\n* AS 6 PEDRAS DE PRESSÃO FORAM ATIVADAS!\n* O enigma lendário das Ruínas foi completado! Uma onda de DETERMINAÇÃO festiva percorre o Underground! (Moral +5)`,
          speaker: 'Enigma Resolvido',
          portrait: '⭐',
        });
      } else {
        setActiveDialogue({
          text: `* (Click!) Você ativou a pedra de pressão [${stoneId + 1}]. [${next.length}/6 pedras ativadas]`,
          speaker: 'Pedra de Pressão',
          portrait: '🔘',
        });
      }
      return next;
    });
  };

  const handleSignClick = () => {
    soundEngine.playTextBlip();
    setActiveDialogue({
      text: `* PLACA ANCESTRAL DAS RUÍNAS:\n\n"Apenas os determinados podem avançar.\nHoje os humanos e monstros celebram o aniversário de ${preset.friendName}!\nCaminhe com orgulho e coragem."`,
      speaker: 'Placa das Ruínas',
      portrait: '📜',
    });
  };

  const handleDoorClick = () => {
    setActiveDialogue({
      text: `Diante de você está a GRANDE PORTA DA ARENA DE ANIVERSÁRIO.\nUma energia festiva e saudosista emana do outro lado. Entrar agora?`,
      speaker: 'Porta da Determinação',
      portrait: '🚪',
      choices: [
        {
          label: '⚡ SIM! Iniciar a Batalha do Aniversário!',
          action: () => {
            setActiveDialogue(null);
            soundEngine.playBattleStartSound();
            onTriggerBattle();
          },
        },
        {
          label: 'Ainda não, quero explorar mais',
          action: () => {
            setActiveDialogue({
              text: `Você deu um passo para trás para se preparar melhor.`,
              speaker: 'Sistema',
              portrait: '💛',
            });
          },
        },
      ],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 p-2 sm:p-4 text-white select-none">
      {/* Top Header Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-3 bg-neutral-900 border-2 border-white/80 p-3 rounded">
        <div className="flex items-center gap-3">
          <div className="text-red-500 font-extrabold flex items-center gap-1 text-lg">
            <Heart className="fill-red-500 w-5 h-5 animate-pulse" />
            <span>ALMA</span>
          </div>
          <div className="text-yellow-400 font-mono text-sm sm:text-base font-bold">
            HP {playerStats.hp}/{playerStats.maxHp}
          </div>
          <div className="hidden sm:block text-neutral-400 font-mono text-xs">
            Moral: <span className="text-green-400">+{playerStats.moralPoints}</span>
          </div>
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
            onClick={() => {
              soundEngine.playSaveSound();
              setShowMirrorScene(true);
            }}
            className="px-2.5 py-1 bg-amber-950 hover:bg-amber-900 border border-yellow-400 text-yellow-200 text-xs font-mono font-bold rounded transition flex items-center gap-1 shadow"
            title="Olhar no Espelho"
          >
            <span>🪞 Espelho</span>
          </button>
          <button
            onClick={onOpenCustomizer}
            className="px-2.5 py-1 bg-purple-900 hover:bg-purple-800 border border-purple-400 text-purple-200 text-xs font-mono rounded transition flex items-center gap-1"
          >
            ✏️ Memórias
          </button>
          <button
            onClick={onToggleMute}
            className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-white/50 rounded text-xs transition"
            title="Alternar Áudio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Music className="w-4 h-4 text-green-400" />}
          </button>
        </div>
      </div>

      {/* Retro Overworld Map Canvas Container */}
      <div className="relative w-full max-w-4xl bg-black border-4 border-white rounded p-2 sm:p-4 shadow-2xl">
        <div className="text-center font-mono text-xs text-yellow-300 mb-2 tracking-widest uppercase">
          ★ RUÍNAS DO UNDERGROUND - SALA DE FESTA & ENIGMA DAS PEDRAS ★
        </div>

        {/* Deltarune Pixel Art RPG Map Grid */}
        <DeltaruneMapGrid
          playerPos={playerPos}
          playerDir={playerDir}
          isWalking={isWalking}
          hasTakenCake={hasTakenCake}
          hasOpenedChest={hasOpenedChest}
          isSwitchFlipped={isSwitchFlipped}
          pressedStones={pressedStones}
          onTileClick={(x, y) => {
            const dx = x - playerPos.x;
            const dy = y - playerPos.y;
            if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
              movePlayer(dx, dy);
            } else {
              const stepX = dx === 0 ? 0 : dx > 0 ? 1 : -1;
              const stepY = dy === 0 ? 0 : dy > 0 ? 1 : -1;
              movePlayer(stepX, stepY);
            }
          }}
          onToggleSwitch={handleToggleSwitch}
          onStoneClick={handleStoneClick}
          onSignClick={handleSignClick}
          onDoorClick={handleDoorClick}
        />

        {/* Mobile & Keyboard Controls visual assistance */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 bg-neutral-900 p-2 rounded border border-neutral-800">
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
            <span>Controles:</span>
            <span className="bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700 text-white">SETAS / WASD</span>
            <span className="hidden sm:inline">ou clique nos blocos</span>
          </div>

          {/* D-Pad Buttons for Touch / Mouse Users */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => movePlayer(0, -1)}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-white/40 rounded active:bg-neutral-600"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => movePlayer(0, 1)}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-white/40 rounded active:bg-neutral-600"
            >
              <ArrowDown className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => movePlayer(-1, 0)}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-white/40 rounded active:bg-neutral-600"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={() => movePlayer(1, 0)}
              className="p-2 bg-neutral-800 hover:bg-neutral-700 border border-white/40 rounded active:bg-neutral-600"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Dialogue Box Overlay */}
        {activeDialogue && (
          <div className="mt-4 space-y-2">
            <RetroText
              text={activeDialogue.text}
              speakerName={activeDialogue.speaker}
              portraitEmoji={activeDialogue.portrait}
              showContinueArrow={!activeDialogue.choices}
            />

            {/* Interactive Choices if present */}
            {activeDialogue.choices && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {activeDialogue.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundEngine.playMoveSound();
                      choice.action();
                    }}
                    className="p-3 bg-neutral-900 hover:bg-neutral-800 border-2 border-yellow-400 text-yellow-300 font-mono text-left font-bold text-sm rounded shadow transition active:scale-95 flex items-center gap-2"
                  >
                    <span>💛</span>
                    <span>[ {choice.label} ]</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Full Undertale Mirror Scene Modal */}
        {showMirrorScene && (
          <MirrorScene
            preset={preset}
            onClose={() => setShowMirrorScene(false)}
          />
        )}
      </div>
    </div>
  );
};
