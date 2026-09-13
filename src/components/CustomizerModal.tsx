import React, { useState } from 'react';
import { FriendPreset, InsideJoke } from '../types';
import { soundEngine } from '../utils/audio';
import { Plus, Trash2, Save, X, Sparkles, Gamepad2, Pizza, GraduationCap, RefreshCw } from 'lucide-react';

interface CustomizerModalProps {
  preset: FriendPreset;
  onSavePreset: (newPreset: FriendPreset) => void;
  onClose: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  preset,
  onSavePreset,
  onClose,
}) => {
  const [formData, setFormData] = useState<FriendPreset>({ ...preset });

  const handleChangeField = (field: keyof FriendPreset, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateJoke = (index: number, field: keyof InsideJoke, value: any) => {
    const updatedJokes = [...formData.insideJokes];
    updatedJokes[index] = { ...updatedJokes[index], [field]: value };
    setFormData((prev) => ({ ...prev, insideJokes: updatedJokes }));
  };

  const handleAddJoke = () => {
    soundEngine.playMoveSound();
    const newJoke: InsideJoke = {
      id: `joke_${Date.now()}`,
      title: 'Nova Piada Interna',
      description: 'Descrição de um momento engraçado ou marcante que vocês viveram.',
      actOption: 'Lembrar do Momento',
      bossReaction: 'Kkkkkkk! Não acredito que você lembrou disso!',
      damageReductionOrSpareBonus: 25,
    };
    setFormData((prev) => ({
      ...prev,
      insideJokes: [...prev.insideJokes, newJoke],
    }));
  };

  const handleRemoveJoke = (index: number) => {
    soundEngine.playMoveSound();
    const updatedJokes = formData.insideJokes.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, insideJokes: updatedJokes }));
  };

  // Preset quick loaders
  const loadGamerPreset = () => {
    soundEngine.playHealSound();
    setFormData((prev) => ({
      ...prev,
      bossTitle: 'O Mestre dos Games & Discord',
      insideJokes: [
        {
          id: 'g_1',
          title: 'O Lag Inexplicável no Boss Final',
          description: 'Aquele dia em que o ping subiu pra 9999 no momento crucial.',
          actOption: 'Citar o Ping de 9999ms',
          bossReaction: 'Foi culpa da operadora de internet! Eu juro! 🤣',
          damageReductionOrSpareBonus: 25,
        },
        {
          id: 'g_2',
          title: 'A Virada Épica na Madrugada',
          description: 'A partida lendária em que viraram o jogo aos 45 do segundo tempo.',
          actOption: 'Relembrar o Comeback Épico',
          bossReaction: 'Aquele dia foi HISTÓRICO! Tmj demais!',
          damageReductionOrSpareBonus: 25,
        },
        {
          id: 'g_3',
          title: 'O Fone Mutado por 1 Hora',
          description: 'Falou sozinho por uma hora até perceber que estava mutado.',
          actOption: 'Imitar a Conversa no Mudo',
          bossReaction: 'Caraca, eu falando feito um louco no mudo! KKKKKK!',
          damageReductionOrSpareBonus: 25,
        },
      ],
    }));
  };

  const loadRolePreset = () => {
    soundEngine.playHealSound();
    setFormData((prev) => ({
      ...prev,
      bossTitle: 'O Rei do Rolê & Das Boas Histórias',
      insideJokes: [
        {
          id: 'r_1',
          title: 'O Uber Errado na Madrugada',
          description: 'Entraram no carro achando que era o Uber e não era.',
          actOption: 'Lembrar do Carro Errado',
          bossReaction: 'Manoooo! A cara do motorista foi impagável! 🤣',
          damageReductionOrSpareBonus: 25,
        },
        {
          id: 'r_2',
          title: 'A Lenda do Salgado Frio',
          description: 'O lanche de rua duvidoso que virou tradição da galera.',
          actOption: 'Oferecer Salgado de Rua',
          bossReaction: 'Esse lanche salva vidas de madrugada!',
          damageReductionOrSpareBonus: 25,
        },
      ],
    }));
  };

  const handleSave = () => {
    soundEngine.playVictorySound();
    onSavePreset(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="w-full max-w-2xl bg-neutral-900 border-4 border-yellow-400 p-4 sm:p-6 rounded-lg text-white font-mono shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-700 pb-3">
          <div className="flex items-center gap-2 text-yellow-300 font-bold text-base sm:text-lg">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>EDITOR DE MEMÓRIAS & PIADAS INTERNAS</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Quick Theme Loader Buttons */}
        <div className="space-y-1.5">
          <span className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
            ⚡ Temas Prontos Rápido:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={loadGamerPreset}
              className="px-3 py-1.5 bg-purple-950 hover:bg-purple-900 border border-purple-400 text-purple-200 text-xs rounded font-bold flex items-center gap-1.5 transition"
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Gamer & Discord</span>
            </button>
            <button
              onClick={loadRolePreset}
              className="px-3 py-1.5 bg-amber-950 hover:bg-amber-900 border border-amber-400 text-amber-200 text-xs rounded font-bold flex items-center gap-1.5 transition"
            >
              <Pizza className="w-3.5 h-3.5" />
              <span>Rolê & Zueira</span>
            </button>
          </div>
        </div>

        {/* Basic Info Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-yellow-300 font-bold mb-1">Nome do Aniversariante (Amigo):</label>
            <input
              type="text"
              value={formData.friendName}
              onChange={(e) => handleChangeField('friendName', e.target.value)}
              className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-yellow-300 font-bold mb-1">Seu Nome / Criador:</label>
            <input
              type="text"
              value={formData.creatorName}
              onChange={(e) => handleChangeField('creatorName', e.target.value)}
              className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-yellow-300 font-bold mb-1">Título do Chefe de Aniversário:</label>
            <input
              type="text"
              value={formData.bossTitle}
              onChange={(e) => handleChangeField('bossTitle', e.target.value)}
              className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono focus:border-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-yellow-300 font-bold mb-1">Nome do Chefe na Arena:</label>
            <input
              type="text"
              value={formData.bossName}
              onChange={(e) => handleChangeField('bossName', e.target.value)}
              className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono focus:border-yellow-400 outline-none"
            />
          </div>
        </div>

        {/* Photo URL & File Upload Input */}
        <div className="text-xs bg-black/50 p-3 border border-neutral-800 rounded space-y-2">
          <label className="block text-yellow-300 font-bold">📷 Foto do Aniversariante (URL ou Arquivo):</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ex: https://... ou data:image/..."
              value={formData.photoUrl || ''}
              onChange={(e) => handleChangeField('photoUrl', e.target.value)}
              className="flex-1 bg-black border border-neutral-700 p-2 rounded text-white font-mono focus:border-yellow-400 outline-none"
            />
            <label className="cursor-pointer px-3 py-2 bg-purple-900 hover:bg-purple-800 text-purple-200 border border-purple-400 rounded font-bold transition whitespace-nowrap">
              <span>Escolher Arquivo</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      if (ev.target?.result) {
                        handleChangeField('photoUrl', ev.target.result as string);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Birthday Wish Message Textarea */}
        <div className="text-xs">
          <label className="block text-yellow-300 font-bold mb-1">
            Mensagem Especial do Cartão Final:
          </label>
          <textarea
            rows={3}
            value={formData.birthdayWishMessage}
            onChange={(e) => handleChangeField('birthdayWishMessage', e.target.value)}
            className="w-full bg-black border border-neutral-700 p-2 rounded text-white font-mono focus:border-yellow-400 outline-none text-xs leading-relaxed"
          />
        </div>

        {/* Inside Jokes Management */}
        <div className="space-y-3 border-t border-neutral-800 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-yellow-300 font-bold text-xs uppercase tracking-wider">
              🤣 Piadas Internas & Opções do Botão [AGIR] ({formData.insideJokes.length}):
            </span>
            <button
              onClick={handleAddJoke}
              className="px-2.5 py-1 bg-green-900 hover:bg-green-800 text-green-200 border border-green-400 text-xs rounded font-bold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Adicionar Piada</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
            {formData.insideJokes.map((joke, idx) => (
              <div
                key={joke.id || idx}
                className="bg-black border border-neutral-700 p-3 rounded space-y-2 relative"
              >
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="text"
                    placeholder="Título da Piada"
                    value={joke.title}
                    onChange={(e) => handleUpdateJoke(idx, 'title', e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 p-1.5 rounded text-xs text-yellow-200 font-bold outline-none"
                  />
                  <button
                    onClick={() => handleRemoveJoke(idx)}
                    className="p-1 bg-red-950 hover:bg-red-900 text-red-300 border border-red-500 rounded"
                    title="Remover"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-neutral-400">Texto no Botão [AGIR]:</span>
                    <input
                      type="text"
                      value={joke.actOption}
                      onChange={(e) => handleUpdateJoke(idx, 'actOption', e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 p-1 rounded text-white outline-none mt-0.5"
                    />
                  </div>

                  <div>
                    <span className="text-neutral-400">Resposta / Fala do Amigo:</span>
                    <input
                      type="text"
                      value={joke.bossReaction}
                      onChange={(e) => handleUpdateJoke(idx, 'bossReaction', e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-700 p-1 rounded text-white outline-none mt-0.5"
                    />
                  </div>
                </div>

                <div className="text-[11px]">
                  <span className="text-neutral-400">Descrição / Relembrando:</span>
                  <input
                    type="text"
                    value={joke.description}
                    onChange={(e) => handleUpdateJoke(idx, 'description', e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 p-1 rounded text-white outline-none mt-0.5"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Save / Cancel Footer */}
        <div className="flex justify-end gap-3 border-t border-neutral-800 pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded border border-neutral-600"
          >
            Cancelar
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-extrabold text-xs rounded border-2 border-white flex items-center gap-1.5 shadow-lg active:scale-95 transition"
          >
            <Save className="w-4 h-4 text-black" />
            <span>SALVAR & USAR NO JOGO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
