
import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vestido Midi Floral Elegante',
    price: 299.90,
    originalPrice: 399.90,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop'
    ],
    category: 'Vestidos',
    description: 'Vestido midi com estampa floral delicada, perfeito para ocasiões especiais. Tecido fluido e confortável.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Floral Rosa', 'Floral Azul'],
    inStock: true,
    isNew: true,
    isSale: true
  },
  {
    id: '2',
    name: 'Blusa Crepe Básica',
    price: 129.90,
    image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=600&fit=crop',
    category: 'Blusas',
    description: 'Blusa básica em crepe, versátil e elegante. Ideal para looks casuais e profissionais.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Branco', 'Preto', 'Nude'],
    inStock: true
  },
  {
    id: '3',
    name: 'Calça Wide Leg Premium',
    price: 259.90,
    image: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400&h=600&fit=crop',
    category: 'Calças',
    description: 'Calça wide leg em tecido premium, corte moderno e confortável. Peça-chave do guarda-roupa.',
    sizes: ['36', '38', '40', '42', '44'],
    colors: ['Preto', 'Caramelo', 'Off White'],
    inStock: true,
    isNew: true
  },
  {
    id: '4',
    name: 'Blazer Alfaiataria Feminino',
    price: 459.90,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400&h=600&fit=crop',
    category: 'Blazers',
    description: 'Blazer de alfaiataria com corte impecável. Sofisticação e elegância para o look profissional.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Navy', 'Bege'],
    inStock: true
  },
  {
    id: '5',
    name: 'Vestido Longo Festa',
    price: 599.90,
    originalPrice: 799.90,
    image: 'https://images.unsplash.com/photo-1566479179817-d024a8cf4d81?w=400&h=600&fit=crop',
    category: 'Vestidos',
    description: 'Vestido longo para festas, com caimento perfeito e detalhes exclusivos.',
    sizes: ['PP', 'P', 'M', 'G'],
    colors: ['Preto', 'Bordeaux', 'Navy'],
    inStock: true,
    isSale: true
  },
  {
    id: '6',
    name: 'Saia Midi Plissada',
    price: 189.90,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d14?w=400&h=600&fit=crop',
    category: 'Saias',
    description: 'Saia midi plissada, feminina e versátil. Combina com diversas ocasiões.',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Camel', 'Vinho'],
    inStock: true
  }
];

export const categories = [
  'Todos',
  'Vestidos',
  'Blusas',
  'Calças',
  'Blazers',
  'Saias',
  'Acessórios'
];
