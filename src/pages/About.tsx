import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">Sobre o Rebroupas</h1>
      <div className="max-w-2xl mx-auto text-lg space-y-4">
        <p>
          Bem-vindo ao <strong>Rebroupas</strong>!
        </p>
        <p>
          Este é um projeto de e-commerce focado na venda de roupas, desenvolvido com dedicação e entusiasmo como parte da disciplina de <strong>Projeto Aplicado 2</strong> da Universidade do Distrito Federal (UNDF).
        </p>
        <p>
          Nossa missão com o Rebroupas é colocar em prática os conhecimentos adquiridos, construindo uma plataforma de compras online que seja não apenas funcional, mas também intuitiva e agradável para todos os nossos usuários.
        </p>
        <p>
          Agradecemos por visitar e explorar o nosso projeto!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;