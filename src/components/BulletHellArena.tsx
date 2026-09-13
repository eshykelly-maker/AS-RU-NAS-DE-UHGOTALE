import React, { useRef, useEffect, useState } from 'react';
import { AttackPattern } from '../types';
import { soundEngine } from '../utils/audio';

interface BulletHellArenaProps {
  attackPattern: AttackPattern;
  friendName: string;
  onTakeDamage: (damage: number) => void;
  onAttackFinished: () => void;
  onGraze?: () => void;
  isMuted: boolean;
}

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  type: string;
  label?: string;
  color: string;
  angle?: number;
  grazed?: boolean;
}

export const BulletHellArena: React.FC<BulletHellArenaProps> = ({
  attackPattern,
  friendName,
  onTakeDamage,
  onAttackFinished,
  onGraze,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Player soul position
  const soulRef = useRef({ x: 150, y: 110, size: 8 });
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const invincibleUntilRef = useRef<number>(0);
  const lastGrazeTimeRef = useRef<number>(0);
  const timeLeftRef = useRef<number>(attackPattern.duration);

  const [timeLeft, setTimeLeft] = useState(attackPattern.duration);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reset Soul position to center
    soulRef.current = { x: canvas.width / 2, y: canvas.height / 2, size: 8 };

    let animationFrameId: number;
    let lastTime = performance.now();
    let spawnTimer = 0;

    const projectiles: Projectile[] = [];

    // Helper to spawn projectiles based on attack type
    const spawnProjectiles = (type: string) => {
      if (type === 'CANDLES') {
        // Candles firing flames from top or side
        const x = Math.random() * (canvas.width - 20) + 10;
        projectiles.push({
          x,
          y: -10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: 2 + Math.random() * 2,
          radius: 7,
          type: 'flame',
          color: '#f97316',
        });
      } else if (type === 'PIZZA_DISCORD') {
        // Pizza slices & Discord notification pings
        const x = Math.random() * (canvas.width - 20) + 10;
        const isPizza = Math.random() > 0.5;
        projectiles.push({
          x,
          y: -10,
          vx: (Math.random() - 0.5) * 1.2,
          vy: 2.2 + Math.random() * 1.8,
          radius: 9,
          type: isPizza ? 'pizza' : 'discord',
          label: isPizza ? '🍕' : '🔴@1',
          color: isPizza ? '#eab308' : '#ef4444',
        });
      } else if (type === 'ZAP_BUBBLES') {
        // WhatsApp green message bubbles floating sideways
        const fromLeft = Math.random() > 0.5;
        const y = Math.random() * (canvas.height - 40) + 20;
        const quotes = ['parabéns!!', 'kkkkkk', 'vem discord', 'feliz niver!'];
        const label = quotes[Math.floor(Math.random() * quotes.length)];
        projectiles.push({
          x: fromLeft ? -20 : canvas.width + 20,
          y,
          vx: fromLeft ? 2 + Math.random() : -(2 + Math.random()),
          vy: (Math.random() - 0.5) * 0.8,
          radius: 12,
          type: 'bubble',
          label,
          color: '#22c55e',
        });
      } else if (type === 'CONFETTI') {
        // Confetti swirling from corners
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.8 + Math.random() * 1.5;
        projectiles.push({
          x: canvas.width / 2 + Math.cos(angle) * 140,
          y: canvas.height / 2 + Math.sin(angle) * 100,
          vx: -Math.cos(angle) * speed,
          vy: -Math.sin(angle) * speed,
          radius: 6,
          type: 'confetti',
          color: ['#ec4899', '#3b82f6', '#eab308', '#a855f7'][Math.floor(Math.random() * 4)],
        });
      } else if (type === 'BIG_CAKE') {
        // Huge cake bouncing off walls
        if (projectiles.length === 0) {
          projectiles.push({
            x: 50,
            y: 50,
            vx: 2.5,
            vy: 2.0,
            radius: 16,
            type: 'big_cake',
            label: '🎂',
            color: '#f472b6',
          });
        }
      } else if (type === 'FRIENDSHIP_RAIN') {
        // Gentle hearts & balloons
        const x = Math.random() * canvas.width;
        projectiles.push({
          x,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.8,
          vy: -(1.5 + Math.random() * 1.2),
          radius: 8,
          type: 'friendship',
          label: '🎈',
          color: '#38bdf8',
        });
      }
    };

    const gameLoop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Update timer
      timeLeftRef.current -= dt;
      setTimeLeft(Math.max(0, Math.ceil(timeLeftRef.current)));

      if (timeLeftRef.current <= 0) {
        onAttackFinished();
        return;
      }

      // Handle Soul Movement
      const soul = soulRef.current;
      const speed = 140 * dt; // pixels per sec

      if (keysRef.current['ArrowUp'] || keysRef.current['w'] || keysRef.current['W']) soul.y -= speed;
      if (keysRef.current['ArrowDown'] || keysRef.current['s'] || keysRef.current['S']) soul.y += speed;
      if (keysRef.current['ArrowLeft'] || keysRef.current['a'] || keysRef.current['A']) soul.x -= speed;
      if (keysRef.current['ArrowRight'] || keysRef.current['d'] || keysRef.current['D']) soul.x += speed;

      // Clamp Soul inside box boundary
      soul.x = Math.max(soul.size + 4, Math.min(canvas.width - soul.size - 4, soul.x));
      soul.y = Math.max(soul.size + 4, Math.min(canvas.height - soul.size - 4, soul.y));

      // Spawn projectiles periodically
      spawnTimer += dt;
      if (spawnTimer > 0.35) {
        spawnTimer = 0;
        spawnProjectiles(attackPattern.type);
      }

      // Clear Arena Canvas
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Arena Border
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

      // Update and Draw Projectiles
      for (let i = projectiles.length - 1; i >= 0; i--) {
        const p = projectiles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce BIG_CAKE
        if (p.type === 'big_cake') {
          if (p.x <= p.radius || p.x >= canvas.width - p.radius) p.vx *= -1;
          if (p.y <= p.radius || p.y >= canvas.height - p.radius) p.vy *= -1;
        }

        // Render Projectiles
        if (p.label) {
          ctx.font = `${p.radius * 1.8}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.label, p.x, p.y);
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Collision Check with Soul Heart
        const isInvincible = now < invincibleUntilRef.current;
        const dx = soul.x - p.x;
        const dy = soul.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (!isInvincible && dist < soul.size + p.radius * 0.7) {
          invincibleUntilRef.current = now + 900; // 900ms invincibility
          soundEngine.playHitSound();
          onTakeDamage(4);
        } else if (dist < soul.size + p.radius + 18 && !p.grazed) {
          p.grazed = true;
          lastGrazeTimeRef.current = now;
          soundEngine.playGrazeSound();
          if (onGraze) onGraze();
        }

        // Remove out of bounds projectiles
        if (
          p.x < -40 ||
          p.x > canvas.width + 40 ||
          p.y < -40 ||
          p.y > canvas.height + 40
        ) {
          projectiles.splice(i, 1);
        }
      }

      // Draw Player Red Heart Soul (💛)
      const isInvincible = now < invincibleUntilRef.current;
      const flash = isInvincible && Math.floor(now / 100) % 2 === 0;

      // Draw Graze Ring if recently grazed
      if (now - lastGrazeTimeRef.current < 250) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(soul.x, soul.y, soul.size + 12, 0, Math.PI * 2);
        ctx.stroke();

        ctx.font = '10px monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        ctx.fillText('GRAZE! +TP', soul.x, soul.y - 14);
      }

      if (!flash) {
        ctx.fillStyle = '#ef4444'; // Undertale Red
        ctx.beginPath();
        // Draw Heart Shape
        const hx = soul.x;
        const hy = soul.y;
        const size = soul.size;
        ctx.moveTo(hx, hy + size / 2);
        ctx.bezierCurveTo(hx, hy - size / 2, hx - size * 1.2, hy - size / 2, hx - size * 1.2, hy + size / 4);
        ctx.bezierCurveTo(hx - size * 1.2, hy + size * 1.1, hx, hy + size * 1.5, hx, hy + size * 1.5);
        ctx.bezierCurveTo(hx, hy + size * 1.5, hx + size * 1.2, hy + size * 1.1, hx + size * 1.2, hy + size / 4);
        ctx.bezierCurveTo(hx + size * 1.2, hy - size / 2, hx, hy - size / 2, hx, hy + size / 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(gameLoop);
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [attackPattern]);

  // Touch controls for mobile / mouse dragging
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((touch.clientY - rect.top) / rect.height) * canvas.height;
    soulRef.current.x = Math.max(12, Math.min(canvas.width - 12, x));
    soulRef.current.y = Math.max(12, Math.min(canvas.height - 12, y));
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-2 select-none">
      <div className="flex items-center justify-between w-full text-yellow-300 font-mono text-xs px-2">
        <span className="font-bold flex items-center gap-1">
          <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping inline-block" />
          ATAQUE DE {friendName.toUpperCase()}: {attackPattern.name}
        </span>
        <span className="bg-neutral-900 border border-yellow-400 px-2 py-0.5 rounded text-white">
          ⏳ {timeLeft}s
        </span>
      </div>

      <div className="relative border-4 border-white bg-black rounded shadow-2xl p-1">
        <canvas
          ref={canvasRef}
          width={320}
          height={180}
          onTouchMove={handleTouchMove}
          className="touch-none bg-black cursor-crosshair rounded-sm"
        />
        <div className="text-[10px] font-mono text-neutral-400 text-center mt-1">
          Esquive com as SETAS / WASD ou arrastando o dedo na caixa!
        </div>
      </div>
    </div>
  );
};
