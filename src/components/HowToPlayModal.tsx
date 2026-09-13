import React from 'react';
import { X, Heart, Swords, MessageSquare, Utensils, HelpCircle, Gamepad2, Sparkles } from 'lucide-react';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono text-white">
      <div className="w-full max-w-xl bg-neutral-950 border-4 border-white p-5 rounded-lg shadow-2xl space-y-4 my-auto">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-base sm:text-lg">
            <HelpCircle className="w-5 h-5 text-yellow-400" />
            <span>COMO JOGAR - RPG DE ANIVERSÁRIO</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-neutral-300">
          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded space-y-1">
            <div className="text-yellow-400 font-bold flex items-center gap-1.5">
              <Gamepad2 className="w-4 h-4 text-yellow-400" />
              <span>1. EXPLORAÇÃO DA SALA (OVERWORLD):</span>
            </div>
            <p>
              Use as <span className="text-white font-bold">SETAS / WASD</span> ou clique na tela para mover sua ALMA (💛).
              Examine o Bolo de Aniversário, o Quadro de Fotos e fale com os NPCs antes de atravessar a Porta do Aniversariante.
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>2. O BOTAO [AGIR] & PIADAS INTERNAS:</span>
            </div>
            <p>
              Durante a batalha, clique em <span className="text-amber-300 font-bold">[AGIR]</span> para relembrar piadas internas, cantar parabéns ou dar um abraço. Isso aumenta a barra de <span className="text-yellow-300 font-bold">AMIZADE (MISERICÓRDIA)</span>!
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded space-y-1">
            <div className="text-red-400 font-bold flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-400 fill-red-400" />
              <span>3. ESQUIVA DE ALMA NA CAIXA (BULLET HELL):</span>
            </div>
            <p>
              Nos turnos do chefe, mova seu Coração Vermelho (💛) dentro do quadrado para desviarde velas de aniversário, fatias de pizza e notificações do Discord!
            </p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 p-3 rounded space-y-1">
            <div className="text-purple-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>4. PERSONALIZAÇÃO COMPLETA:</span>
            </div>
            <p>
              Você pode clicar em <span className="text-purple-300 font-bold">"EDITAR MEMÓRIAS"</span> no menu ou no jogo para trocar o nome do seu amigo, personalizar as piadas internas e escrever uma mensagem de aniversário inesquecível!
            </p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs sm:text-sm rounded border-2 border-white shadow-lg active:scale-95 transition"
          >
            ENTENDI! VAMOS JOGAR! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
