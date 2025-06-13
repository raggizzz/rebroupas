import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * Componente para facilitar o desenvolvimento
 * Faz login automático com um usuário padrão se não houver nenhum logado
 */
const DevAutoLogin = () => {
  const { user, login, isLoading } = useAuth();

  useEffect(() => {
    // Só executa em desenvolvimento e se não há usuário logado
    if (process.env.NODE_ENV === 'development' && !user && !isLoading) {
      // Faz login com usuário padrão para desenvolvimento
      // Você pode criar este usuário no Firebase Console ou comentar esta linha
      // login('dev@exemplo.com', 'senha123');
      console.log('DevAutoLogin: Para desenvolvimento, faça login manualmente ou configure um usuário padrão');
    }
  }, [user, login, isLoading]);

  return null; // Componente não renderiza nada na tela
};

export default DevAutoLogin;