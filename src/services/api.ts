import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../types/product';

// Serviços de Produtos - feito pelos alunos da UNDF
export const productService = {
  // Buscar todos os produtos da loja
  getAll: async (): Promise<Product[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },
  
  // Buscar produto específico pelo ID
  getById: async (id: string): Promise<Product | null> => {
    try {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as Product;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  },
  
  // Criar novo produto na base de dados
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    try {
      const docRef = await addDoc(collection(db, 'products'), {
        ...product,
        created_at: new Date(),
        updated_at: new Date()
      });
      
      return { ...product, id: docRef.id } as Product;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },
  
  // Atualizar produto existente
  update: async (id: string, product: Partial<Product>): Promise<void> => {
    try {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, {
        ...product,
        updated_at: new Date()
      });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  },
  
  // Deletar produto da base de dados
    delete: async (id: string): Promise<void> => {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
      }
    },

  // Buscar produtos filtrados por categoria
  getByCategory: async (categoryId: string): Promise<Product[]> => {
    try {
      const q = query(
        collection(db, 'products'),
        where('category_id', '==', categoryId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw error;
    }
  }
};

// Serviços de Categorias - implementado pelos estudantes
export const categoryService = {
  // Buscar todas as categorias disponíveis
  getAll: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw error;
    }
  },
  
  // Buscar categoria específica por ID
    getById: async (id: string) => {
      try {
        const docRef = doc(db, 'categories', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          return {
            id: docSnap.id,
            ...docSnap.data()
          };
        } else {
          return null;
        }
      } catch (error) {
        console.error('Erro ao buscar categoria:', error);
        throw error;
      }
    },

  // Criar nova categoria no sistema
  create: async (category: any) => {
    try {
      const docRef = await addDoc(collection(db, 'categories'), {
        ...category,
        created_at: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw error;
    }
  },
  
  // Atualizar categoria existente
    update: async (id: string, category: any) => {
      try {
        const docRef = doc(db, 'categories', id);
        await updateDoc(docRef, {
          ...category,
          updated_at: new Date()
        });
      } catch (error) {
        console.error('Erro ao atualizar categoria:', error);
        throw error;
      }
    },

  // Deletar categoria do sistema
  delete: async (id: string) => {
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (error) {
      console.error('Erro ao deletar categoria:', error);
      throw error;
    }
  }
};

import { CartItem } from '../types/product';
// Serviços de Carrinho - desenvolvido pelos alunos (usando Firestore para persistir)
export const cartService = {
  // Buscar itens do carrinho do usuário logado
  getItems: async (userId: string): Promise<CartItem[]> => {
    try {
      const q = query(
        collection(db, 'cart'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        userId: doc.data().userId,
        productId: doc.data().productId,
        quantity: doc.data().quantity,
        selectedColor: doc.data().selectedColor,
        selectedSize: doc.data().selectedSize,
        product: doc.data().product, // Assumindo que os detalhes do produto estão armazenados ou incorporados
      created_at: doc.data().created_at?.toDate(), // Converte Timestamp do Firestore para Date
      updated_at: doc.data().updated_at?.toDate(), // Converte Timestamp do Firestore para Date
      })) as CartItem[];
    } catch (error) {
      console.error('Erro ao buscar itens do carrinho:', error);
      throw error;
    }
  },
  
  // Adicionar item ao carrinho do usuário
  addItem: async (userId: string, item: Omit<CartItem, 'id' | 'userId' | 'created_at' | 'updated_at'>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'cart'), {
        ...item,
        userId,
        created_at: new Date(),
        updated_at: new Date()
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      throw error;
    }
  },
  
  // Atualizar item existente do carrinho
  updateItem: async (itemId: string, item: any) => {
    try {
      const docRef = doc(db, 'cart', itemId);
      await updateDoc(docRef, {
        ...item,
        updated_at: new Date()
      });
    } catch (error) {
      console.error('Erro ao atualizar item do carrinho:', error);
      throw error;
    }
  },
  
  // Remover item específico do carrinho
    removeItem: async (itemId: string) => {
      try {
        await deleteDoc(doc(db, 'cart', itemId));
      } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
        throw error;
      }
    },

  // Limpar todo o carrinho do usuário
  clearCart: async (userId: string) => {
    try {
      const q = query(
        collection(db, 'cart'),
        where('userId', '==', userId)
      );
      const querySnapshot = await getDocs(q);
      
      const deletePromises = querySnapshot.docs.map(doc => 
        deleteDoc(doc.ref)
      );
      
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    }
  }
};

export default {
  productService,
  cartService,
  categoryService,
};