
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  isNew?: boolean;
  isSale?: boolean;
  // Campos do Firebase
  stock?: number;
  is_active?: boolean;
  category_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  created_at?: Date;
  updated_at?: Date;
}
