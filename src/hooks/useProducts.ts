import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productService } from '../services/api';
import { Product } from '../types/product';

// Hook para buscar todos os produtos da loja
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getAll,
    staleTime: 5 * 60 * 1000, // 5 minutos de cache
  });
};

// Hook para buscar produto específico por ID
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id),
    enabled: !!id,
  });
};

// Hook para criar novo produto
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      // Invalida a cache dos produtos para recarregar
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Hook para atualizar produto existente
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: Partial<Product> }) => 
      productService.update(id, product),
    onSuccess: (_, variables) => {
      // Invalida a cache dos produtos e do produto específico
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', variables.id] });
    },
  });
};

// Hook para deletar produto do sistema
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      // Invalida a cache dos produtos após exclusão
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Hook para buscar produtos filtrados por categoria
export const useProductsByCategory = (categoryId?: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => categoryId ? productService.getByCategory(categoryId) : productService.getAll(),
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });
};