import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicRoute from './components/PublicRoute';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Rota pública para página principal */}
        <Route exact path="/" component={HomePage} />

        {/* Rota protegida para a área de administração */}
        <PublicRoute path="/adm" component={AdminPage} />

        {/* Outras rotas públicas ou privadas podem ser adicionadas aqui */}
      </Switch>
    </Router>
  );
};

export default App;
