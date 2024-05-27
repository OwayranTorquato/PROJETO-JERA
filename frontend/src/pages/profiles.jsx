import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/Api';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContainer from '../components/Toasts/ToastManager';

// Componente de Card de Perfil
const ProfileCard = ({ profile }) => {
    return (
        <div className="border rounded-lg p-4 m-2">
            <h2 className="text-lg font-semibold">{profile.nome}</h2>
            {/* Renderizar outros detalhes do perfil, se necessário */}
        </div>
    );
};

function Profile() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            setLoading(true);
            try {
                const userId = localStorage.getItem('userId'); // Obtém o ID do usuário do localStorage
                const response = await api.get(`/perfil/listar/${userId}`);
                setProfiles(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching profiles:', error);
                // Handle error appropriately
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div>
            <h1>Perfis</h1>
            {loading ? (
                <FaSpinner className="animate-spin text-xl" />
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {profiles.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
