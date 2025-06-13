
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, Loader2 } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Category } from '../types/product';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('nome');
  const [showFilters, setShowFilters] = useState(false);

  // Buscar dados da API do sistema
  const { data: products = [], isLoading: productsLoading, error: productsError } = useProducts();
  const { data: categoriesData = [], isLoading: categoriesLoading } = useCategories();

  // Criar lista de categorias incluindo opção "Todos"
  const categories = useMemo(() => {
    const categoryNames = categoriesData.map((cat: Category) => cat.name);
    return ['Todos', ...categoryNames];
  }, [categoriesData]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products.length) return [];

    let filtered = selectedCategory === 'Todos' 
      ? products 
      : products.filter((product: any) => {
          // Buscar o nome da categoria pelo category_id
          const category = categoriesData.find((cat: Category) => cat.id === product.category_id);
          return category?.name === selectedCategory;
        });

    // Ordenar produtos conforme critério selecionado
        filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'preco-menor':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'preco-maior':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'nome':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, categoriesData, selectedCategory, sortBy]);

  // Estado de carregamento dos dados
  if (productsLoading || categoriesLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Estado de erro no carregamento
  if (productsError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Filter size={64} className="mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Erro ao carregar produtos
          </h3>
          <p className="text-gray-600 mb-6">
            Não foi possível carregar os produtos. Tente novamente mais tarde.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nossa Coleção
          </h1>
          <p className="text-lg text-gray-600">
            Explore todas as nossas peças e encontre o look perfeito para você.
          </p>
        </motion.div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Categories Filter */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3 lg:mb-0">
                <Filter size={20} className="text-gray-600" />
                <span className="font-medium text-gray-900">Categorias:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category: string) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4">
              <label className="font-medium text-gray-900">Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="nome">Nome</option>
                <option value="preco-menor">Menor Preço</option>
                <option value="preco-maior">Maior Preço</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Mostrando {filteredAndSortedProducts.length} produto{filteredAndSortedProducts.length !== 1 ? 's' : ''}
            {selectedCategory !== 'Todos' && ` em ${selectedCategory}`}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              index={index % 8} 
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredAndSortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 mb-4">
              <Filter size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-600 mb-6">
              Tente ajustar os filtros ou escolher uma categoria diferente.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSortBy('nome');
              }}
              className="px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Limpar Filtros
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
