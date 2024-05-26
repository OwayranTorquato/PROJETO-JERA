import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
} from "react-router-dom";
import './index.css';
import { Index } from './pages';
import Mesas from './pages/mesas';
import PDV from './pages/pdv';
import Cardapio from './pages/cardapio';
import Login from './pages/Login';
import Logout from './components/Logout';


// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
}

// Cria um navegador de rotas com base nas configurações fornecidas
const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: isAuthenticated() ? <Index /> : <Login />,
    children: [
      { 
        path: "pdv", 
        element: isAuthenticated() ? <PDV /> : <Login /> 
      },
      { 
        path: "mesas", 
        element: isAuthenticated() ? <Mesas /> : <Login /> 
      },
      { 
        path: "cardapio", 
        element: isAuthenticated() ? <Cardapio /> : <Login /> 
      },
    
    ]
  },
  // Defina a rota de logout separadamente
  { 
    path: "/logout", 
    element: isAuthenticated() ? <Logout /> : <Login /> 
  },
  // Adicione uma rota para a página de login
  { 
    path: "/login", 
    element: <Login /> 
  },
  // Redirecione a raiz para o dashboard se o usuário estiver autenticado
  { 
    path: "/", 
    element: isAuthenticated() ? <Index /> : <Login /> 
  },
]);

// Componente de rota protegida
const ProtectedRoute = ({ element, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  return <Route {...rest} element={element} />;
};

// Renderiza as rotas dentro do RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
