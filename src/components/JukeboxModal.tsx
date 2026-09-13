import React from 'react';
import { soundEngine, TOBY_FOX_TRACKS, TobyFoxTrack } from '../utils/audio';
import { Music, Volume2, VolumeX, X, Play, Disc, Sparkles, Sliders } from 'lucide-react';

interface JukeboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentTrack: TobyFoxTrack;
  onSelectTrack: (track: TobyFoxTrack) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const JukeboxModal: React.FC<JukeboxModalProps> = ({
  isOpen,
  onClose,
  currentTrack,
  onSelectTrack,
  isMuted,
  onToggleMute,
}) => {
  if (!isOpen) return null;

  const currentMetadata = TOBY_FOX_TRACKS.find((t) => t.id === currentTrack) || TOBY_FOX_TRACKS[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-neutral-950 border-4 border-yellow-400 p-6 rounded-lg shadow-[0_0_50px_rgba(234,179,8,0.3)] text-white space-y-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-neutral-900 border border-neutral-700 hover:border-yellow-400 text-neutral-400 hover:text-white rounded transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-neutral-800 pb-4">
          <div className="p-3 bg-yellow-400/10 border-2 border-yellow-400 rounded-lg animate-pulse">
            <Disc className="w-7 h-7 text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sintetizador Chiptune Undertale</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              JUKEBOX TOBY FOX
            </h2>
          </div>
        </div>

        {/* Currently Playing Card */}
        <div className="bg-neutral-900 border-2 border-yellow-400/60 p-4 rounded-lg space-y-3 relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span className="font-bold text-yellow-400">TOCANDO AGORA:</span>
            <span className="px-2 py-0.5 bg-neutral-800 rounded font-semibold border border-neutral-700">
              {currentMetadata.game} • {currentMetadata.character}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1 items-end h-8">
              <div className="w-1.5 bg-yellow-400 rounded-t animate-bounce" style={{ height: '80%', animationDelay: '0s' }} />
              <div className="w-1.5 bg-yellow-400 rounded-t animate-bounce" style={{ height: '100%', animationDelay: '0.15s' }} />
              <div className="w-1.5 bg-yellow-400 rounded-t animate-bounce" style={{ height: '60%', animationDelay: '0.3s' }} />
              <div className="w-1.5 bg-yellow-400 rounded-t animate-bounce" style={{ height: '90%', animationDelay: '0.45s' }} />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">{currentMetadata.title}</h3>
              <p className="text-xs text-neutral-300 italic">{currentMetadata.description}</p>
            </div>
          </div>

          {/* Volume Control */}
          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-4">
            <button
              onClick={onToggleMute}
              className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded transition"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
              <span>{isMuted ? 'MUTE' : 'LIGADO'}</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 flex-1 justify-end">
              <Sliders className="w-3.5 h-3.5 text-yellow-400" />
              <span>Volume Engine Chiptune</span>
            </div>
          </div>
        </div>

        {/* Track Selection List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
            Escolha uma música da Trilha Sonora de Toby Fox:
          </div>

          {TOBY_FOX_TRACKS.map((track) => {
            const isSelected = track.id === currentTrack;
            return (
              <button
                key={track.id}
                onClick={() => onSelectTrack(track.id)}
                className={`w-full p-3 rounded-lg border-2 text-left transition flex items-center justify-between gap-3 group ${
                  isSelected
                    ? 'bg-yellow-400/20 border-yellow-400 text-yellow-200'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-850'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded border ${
                      isSelected
                        ? 'bg-yellow-400 text-black border-yellow-300'
                        : 'bg-neutral-800 text-neutral-400 border-neutral-700 group-hover:text-yellow-400'
                    }`}
                  >
                    {isSelected ? <Music className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </div>

                  <div>
                    <div className="font-black text-sm flex items-center gap-2">
                      <span>{track.title}</span>
                      <span className="text-[10px] px-1.5 py-0.2 bg-neutral-800 text-neutral-400 font-normal rounded border border-neutral-700">
                        {track.game}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 line-clamp-1">{track.description}</div>
                  </div>
                </div>

                {isSelected && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-1 bg-yellow-400 text-black rounded animate-pulse">
                    TOCANDO
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="pt-2 border-t border-neutral-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs uppercase rounded transition border border-white"
          >
            FECHAR & JOGAR
          </button>
        </div>
      </div>
    </div>
  );
};
