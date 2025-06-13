import { useQuery } from '@tanstack/react-query';
import { categoryService } from '../services/api';

// Hook para buscar todas as categorias disponíveis
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryService.getAll,
    staleTime: 10 * 60 * 1000, // 10 minutos - categorias mudam pouco frequentemente
  });
};

// Hook para buscar categoria específica por ID
export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryService.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
};