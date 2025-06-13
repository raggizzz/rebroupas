
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/hooks/useFavorites';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Para a API, vamos usar valores padrão já que não temos tamanhos/cores ainda implementados
    addToCart(product, 'M', 'Padrão');
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link to={`/produto/${product.id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 space-y-1">
              {product.is_active && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  DISPONÍVEL
                </span>
              )}
              {(product as any).stock < 10 && (product as any).stock > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">
                  ÚLTIMAS UNIDADES
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleToggleFavorite}
                className={`p-2 rounded-full shadow-md transition-colors ${
                  isFavorite(product.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white text-gray-600 hover:text-red-500'
                }`}
              >
                <Heart size={16} fill={isFavorite(product.id) ? 'currentColor' : 'none'} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                className="p-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition-colors shadow-md"
              >
                <ShoppingBag size={16} />
              </motion.button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900">
                  R$ {parseFloat((product as any).price || product.price).toFixed(2)}
                </span>
                {(product as any).originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    R$ {parseFloat((product as any).originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
              
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {(product as any).category?.name || product.category || 'Categoria'}
              </span>
            </div>

            {/* Stock Info */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {(product as any).stock !== undefined && (
                  <span className={`text-xs px-2 py-1 rounded ${
                    (product as any).stock > 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {(product as any).stock > 0 
                      ? `${(product as any).stock} em estoque` 
                      : 'Fora de estoque'
                    }
                  </span>
                )}
              </div>
              
              {/* Placeholder para tamanhos - será implementado quando a API suportar */}
              {(product as any).sizes && (product as any).sizes.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {(product as any).sizes.slice(0, 3).map((size: string) => (
                    <span
                      key={size}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
