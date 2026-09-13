import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../utils/audio';

interface RetroTextProps {
  text: string;
  speed?: number; // ms per character
  portraitEmoji?: string;
  speakerName?: string;
  onComplete?: () => void;
  className?: string;
  pitchOffset?: number;
  showContinueArrow?: boolean;
}

export const RetroText: React.FC<RetroTextProps> = ({
  text,
  speed = 30,
  portraitEmoji,
  speakerName,
  onComplete,
  className = '',
  pitchOffset = 0,
  showContinueArrow = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const indexRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayedText('');
    setIsFinished(false);
    indexRef.current = 0;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      if (indexRef.current < text.length) {
        const nextChar = text[indexRef.current];
        setDisplayedText((prev) => prev + nextChar);

        // Don't play blip for space or punctuation silent pauses
        if (nextChar !== ' ' && nextChar !== '.' && nextChar !== ',' && nextChar !== '!') {
          soundEngine.playTextBlip(pitchOffset);
        }

        indexRef.current += 1;
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed, pitchOffset]);

  const handleSkip = () => {
    if (!isFinished) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(text);
      setIsFinished(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <div
      onClick={handleSkip}
      className={`relative cursor-pointer select-none bg-black border-4 border-white p-4 font-mono text-white rounded-sm min-h-[110px] flex gap-4 items-start shadow-2xl ${className}`}
    >
      {portraitEmoji && (
        <div className="flex-shrink-0 w-16 h-16 bg-neutral-900 border-2 border-white rounded flex items-center justify-center text-3xl animate-pulse">
          {portraitEmoji}
        </div>
      )}

      <div className="flex-1">
        {speakerName && (
          <div className="text-yellow-400 font-bold text-sm tracking-widest uppercase mb-1 flex items-center gap-2">
            <span>* {speakerName}</span>
          </div>
        )}
        <p className="text-base sm:text-lg leading-relaxed whitespace-pre-wrap font-bold tracking-wide">
          * {displayedText}
          {!isFinished && <span className="inline-block w-2.5 h-4 bg-white ml-1 animate-ping" />}
        </p>
      </div>

      {isFinished && showContinueArrow && (
        <div className="absolute bottom-2 right-3 text-yellow-300 text-xs animate-bounce font-mono">
          ▼ [CLIQUE]
        </div>
      )}
    </div>
  );
};
