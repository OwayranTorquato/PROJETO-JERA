import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from './TelaDeCarregamento/loading';

function Logout() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleLogout = async () => {
            await new Promise(resolve => setTimeout(resolve, 3500));
            localStorage.removeItem('token');
            localStorage.removeItem('nomeEstabelecimento');
            setLoading(false);
            navigate('/login'); // Redireciona para a tela de login após o logout
        };

        handleLogout();
    }, [navigate]);

    return (
        <div>
            {/* Correção: Substituir <di> por <div> */}
            {loading && <LoadingAnimation />}
        </div>
    );
}

export default Logout;
