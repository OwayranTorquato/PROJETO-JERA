import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/Api';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContainer from '../components/Toasts/ToastManager'; // Importe o componente ToastContainer do ToastManager

function Login() {
    const navigate = useNavigate();
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/profiles');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        setLoading(true);
    
        setTimeout(async () => {
            try {
                const response = await api.post(
                    '/login/usuario',
                    { email, password },
                    { headers: { 'Content-Type': 'application/json' } }
                );
    
                const token = response.data.token;
                const userId = response.data.id; // Obter o ID do usuário do response.data
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId); // Armazenar o ID do usuário no localStorage
    
                setLoading(false);
    
                setTimeout(() => {
                    toast.success('Autenticado com sucesso!, Bem vindo...', { autoClose: 2000 });
                    setTimeout(() => {
                        navigate('/profiles');
                        window.location.reload();
                    }, 2000);
                }, 100);
            } catch (error) {
                setLoading(false);
                if (error instanceof Error) {
                    toast.error(error.message);
                } else {
                    setError('Erro ao acessar o servidor');
                }
            }
        }, 2000);
    };
    


    return (
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                {loading && (
                    <div className="flex items-center justify-center">
                        <FaSpinner className="animate-spin text-xl mr-2" />
                        <p>Autenticando, aguarde...</p>
                    </div>
                )}
                {error && <p className="text-red-500">{error}</p>}

                <h2 className="text-2xl font-semibold mb-4">Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">email:</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Digite aqui..."
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                            placeholder="Digite aqui..."
                            required
                        />
                    </div>

                    <button type="submit" className="bg-black text-white p-2 w-full rounded-md hover:bg-gray-900 transition-colors">
                        Entrar
                    </button>
                </form>
            </div>
            <ToastContainer /> 
        </div>
    );
}

export default Login;
