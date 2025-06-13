
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types/product';
import { cartService } from '@/services/api';
import { useAuth } from './AuthContext';

interface CartContextType {
  cartItems: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Carregar carrinho quando usuário fizer login no sistema
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  const loadCart = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const items = await cartService.getItems(user.id);
      setCartItems(items);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, size?: string, color?: string, quantity: number = 1) => {
    if (!user) {
      throw new Error('Usuário deve estar logado para adicionar ao carrinho');
    }

    try {
      setIsLoading(true);
      
      const cartItem = {
        productId: product.id,
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      };
      
      const itemId = await cartService.addItem(user.id, cartItem);
      
      // Atualizar estado local do carrinho
      setCartItems(prevItems => [
        ...prevItems,
        {
          id: itemId,
          userId: user.id,
          ...cartItem
        }
      ]);
    } catch (error) {
      console.error('Erro ao adicionar ao carrinho:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setIsLoading(true);
      await cartService.removeItem(itemId);
      
      // Atualizar estado local após remoção
      setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Erro ao remover do carrinho:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      setIsLoading(true);
      await cartService.updateItem(itemId, { quantity });
      
      // Atualizar estado local
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar quantidade:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      await cartService.clearCart(user.id);
      setCartItems([]);
    } catch (error) {
      console.error('Erro ao limpar carrinho:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      isLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      loadCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
