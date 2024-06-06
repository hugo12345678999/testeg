import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Componente para rota pública
const PublicRoute = ({ component: Component, ...rest }) => {
  // Verifica se o usuário está autenticado (você pode implementar sua lógica de autenticação aqui)
  const isAuthenticated = true; // Aqui você pode implementar sua lógica de autenticação

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          // Se não autenticado, renderiza o componente
          <Component {...props} />
        ) : (
          // Se autenticado, redireciona para a página principal
          <Redirect to="/" />
        )
      }
    />
  );
};

export default PublicRoute;
