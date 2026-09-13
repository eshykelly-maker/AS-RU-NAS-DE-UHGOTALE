import { FriendPreset, Item } from '../types';

export const defaultFriendPreset: FriendPreset = {
  friendName: 'Lucas',
  creatorName: 'Seu Amigo Lendário',
  age: 25,
  specialDate: 'Hoje!',
  photoUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=80',
  birthdayWishMessage: 
    'Parabéns, meu mano! Que o seu novo ciclo seja recheado de conquistas lendárias, vitórias inesquecíveis, saúde de ferro, pizzas de madrugada e muita determinação! Que você continue sendo essa pessoa sensacional, engraçada e parceira de todas as horas. O Underground inteiro celebra o seu dia! 🎂👑✨',
  bossName: 'Aniversariante Supremo Lucas',
  bossTitle: ' O Guardião da Coxinha de Ouro & Das Piadas de Madrugada',
  insideJokes: [
    {
      id: 'joke_1',
      title: 'O Misterioso Roubo do Bolo de Niver',
      description: 'Aquele dia em que o cachorro roubou a fatia de bolo e fingiu que nada aconteceu.',
      actOption: 'Acusar o Cachorro Místico',
      bossReaction: 'Manoooo! O cachorro nem disfarçou com o farelo no focinho! KKKKKK! 🐶🎂',
      damageReductionOrSpareBonus: 25,
    },
    {
      id: 'joke_2',
      title: 'A Piada Infame do Esqueleto Sans',
      description: 'Por que o esqueleto não brigou na festa? Porque não tinha PEITO pra isso!',
      actOption: 'Contar Piada Ruim de Esqueleto',
      bossReaction: 'BA-DUM-TSS! 🥁 Não acredito que perdi a vida com essa piada! Kkkkkk!',
      damageReductionOrSpareBonus: 25,
    },
    {
      id: 'joke_3',
      title: 'A Entrega da Pizza das 3h da Manhã',
      description: 'Pediram pizza de calabresa e veio de abacaxi com banana. Comemos mesmo assim.',
      actOption: 'Relembrar a Pizza Tropical Mutante',
      bossReaction: 'Estava horrível... mas foi o melhor banquete do ano! Tmj! 🍕🤣',
      damageReductionOrSpareBonus: 25,
    },
    {
      id: 'joke_4',
      title: 'O Fone Mutado no Momento Clutch',
      description: 'Gritou a tática inteira da vitória com o microfone mutado por meia hora.',
      actOption: 'Imitar o Grito Mudo no Call',
      bossReaction: '"ALÔ?! TÃO ME OUVINDO?!" Cara, esse dia foi épico demais! KKKK! 🎙️',
      damageReductionOrSpareBonus: 25,
    },
  ],
  memories: [
    'Aquelas madrugadas no Discord rindo até a barriga doer sem motivo nenhum.',
    'Todas as vezes que nos ajudamos quando o perrengue do dia a dia apertou.',
    'Os planos mirabolantes para dominar o mundo que ainda vamos realizar juntos!',
    'A certeza de ter um amigo verdadeiro pra vida toda!'
  ]
};

export const defaultInventoryItems: Item[] = [
  {
    id: 'item_cake',
    name: 'Fatia de Bolo de Brigadeiro +99 HP',
    description: 'Recupera 20 HP. Doce lendário carregado com pura Determinação!',
    healAmount: 20,
    iconName: 'Cake',
  },
  {
    id: 'item_soda',
    name: 'Guaraná Geladinho das Galáxias',
    description: 'Recupera 15 HP. O combustível sagrado de todas as festas.',
    healAmount: 15,
    iconName: 'Wine',
  },
  {
    id: 'item_snack',
    name: 'Coxinha Mágica da Galera',
    description: 'Recupera 12 HP. Salgado frito abençoado pelos deuses do RPG.',
    healAmount: 12,
    iconName: 'Utensils',
  },
  {
    id: 'item_card',
    name: 'Carta de Aniversário Especial',
    description: 'Recupera 30 HP e concede Poder Infinito de Amizade!',
    healAmount: 30,
    iconName: 'HeartHandshake',
  }
];
