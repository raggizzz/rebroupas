
import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white rounded-lg shadow-sm p-12">
              <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Seu carrinho está vazio
              </h2>
              <p className="text-gray-600 mb-8">
                Que tal dar uma olhada em nossa coleção?
              </p>
              <Link
                to="/produtos"
                className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <ArrowLeft className="mr-2" size={20} />
                Continuar Comprando
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link
              to="/produtos"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Continuar Comprando
            </Link>
          </div>
          
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Carrinho de Compras
            </h1>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Limpar Carrinho
              </button>
            )}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-lg shadow-sm p-6"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.product?.image || ''}
                      alt={item.product?.name || 'Produto'}
                      className="w-24 h-32 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.product?.name || 'Produto'}</h3>
                          <p className="text-sm text-gray-600">{item.product?.category || 'Categoria'}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="flex gap-4 text-sm">
                        <span>Cor: <strong>{item.selectedColor}</strong></span>
                        <span>Tamanho: <strong>{item.selectedSize}</strong></span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-lg text-gray-900">
                            R$ {((item.product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-600">
                            R$ {(item.product?.price || 0).toFixed(2)} cada
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-sm p-6 h-fit"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Resumo do Pedido
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">R$ {getCartTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Frete:</span>
                <span className="font-semibold text-green-600">
                  {getCartTotal() >= 199 ? 'Grátis' : 'R$ 15,00'}
                </span>
              </div>

              {getCartTotal() < 199 && (
                <p className="text-sm text-gray-600 bg-yellow-50 p-3 rounded">
                  Frete grátis para compras acima de R$ 199,00
                </p>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>R$ {(getCartTotal() + (getCartTotal() >= 199 ? 0 : 15)).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-yellow-600 text-white font-semibold py-3 rounded-lg hover:bg-yellow-700 transition-colors">
                Finalizar Compra
              </button>

              <p className="text-xs text-gray-500 text-center">
                Pagamento seguro com criptografia SSL
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
