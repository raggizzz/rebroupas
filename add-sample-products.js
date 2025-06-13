import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC0HimAyD47ttNnn_uQGuY69P1lS2ZlNOs",
  authDomain: "rebroupas-94244.firebaseapp.com",
  projectId: "rebroupas-94244",
  storageBucket: "rebroupas-94244.firebasestorage.app",
  messagingSenderId: "498922656266",
  appId: "1:498922656266:web:3215b4059e079e076845f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample products
const sampleProducts = [
  {
    name: "Camiseta Básica Branca",
    description: "Camiseta básica de algodão 100%, confortável e versátil para o dia a dia.",
    price: 29.90,
    category: "Camisetas",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    inStock: true,
    featured: true,
    isNew: false,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Calça Jeans Skinny",
    description: "Calça jeans skinny de alta qualidade, perfeita para um look moderno e estiloso.",
    price: 89.90,
    category: "Calças",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    inStock: true,
    featured: true,
    isNew: true,
    sizes: ["36", "38", "40", "42", "44"],
    colors: ["Azul"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Vestido Floral",
    description: "Vestido floral elegante, ideal para ocasiões especiais e eventos casuais.",
    price: 119.90,
    category: "Vestidos",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    inStock: true,
    featured: false,
    isNew: true,
    sizes: ["P", "M", "G"],
    colors: ["Floral"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Jaqueta de Couro",
    description: "Jaqueta de couro sintético, estilosa e durável para um visual moderno.",
    price: 199.90,
    category: "Jaquetas",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    inStock: true,
    featured: true,
    isNew: false,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Tênis Esportivo",
    description: "Tênis esportivo confortável, ideal para atividades físicas e uso casual.",
    price: 149.90,
    category: "Calçados",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    inStock: true,
    featured: false,
    isNew: true,
    sizes: ["37", "38", "39", "40", "41", "42"],
    colors: ["Branco", "Preto"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Blusa de Tricot",
    description: "Blusa de tricot macia e quentinha, perfeita para os dias mais frios.",
    price: 69.90,
    category: "Blusas",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400",
    inStock: true,
    featured: false,
    isNew: false,
    sizes: ["P", "M", "G"],
    colors: ["Bege", "Rosa"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Shorts Jeans",
    description: "Shorts jeans descontraído, ideal para o verão e ocasiões casuais.",
    price: 49.90,
    category: "Shorts",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400",
    inStock: true,
    featured: false,
    isNew: true,
    sizes: ["36", "38", "40", "42"],
    colors: ["Azul"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Camisa Social",
    description: "Camisa social elegante, perfeita para ambientes profissionais e eventos formais.",
    price: 79.90,
    category: "Camisas",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    inStock: true,
    featured: true,
    isNew: false,
    sizes: ["P", "M", "G", "GG"],
    colors: ["Branco", "Azul"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function addSampleProducts() {
  try {
    console.log('Adicionando produtos de exemplo...');
    
    for (const product of sampleProducts) {
      const docRef = await addDoc(collection(db, 'products'), product);
      console.log(`Produto adicionado com ID: ${docRef.id} - ${product.name}`);
    }
    
    console.log('Todos os produtos foram adicionados com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao adicionar produtos:', error);
    process.exit(1);
  }
}

addSampleProducts();