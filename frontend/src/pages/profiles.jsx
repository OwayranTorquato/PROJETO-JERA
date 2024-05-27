import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/Api';
import { FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContainer from '../components/Toasts/ToastManager';

const ProfileCard = ({ profile }) => {
    return (
        <a href="/movie" className="flex flex-col items-center group gap-2">
            <img className="rounded border-2 border-transparent group-hover:border-2 group-hover:border-gray-300" src={`https://picsum.photos/seed/${profile.nome}/150/150`} alt={profile.nome} />
            <p className="text-gray-500 group-hover:text-gray-300">{profile.nome}</p>
        </a>
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
                const userId = localStorage.getItem('userId'); 
                const response = await api.get(`/perfil/listar/${userId}`);
                setProfiles(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching profiles:', error);
                toast.error('Erro ao carregar perfis');
            }
        };

        fetchProfiles();
    }, []);

    return (
        <div className="bg-black h-screen flex flex-col items-center justify-center">
            <ToastContainer />
            <h1 className="text-gray-200 text-5xl">Quem vai assistir?</h1>
            {loading ? (
                <FaSpinner className="animate-spin text-xl text-gray-200 mt-8" />
            ) : (
                <div className="flex flex-row flex-wrap gap-5 mt-8">
                    {profiles.map((profile) => (
                        <ProfileCard key={profile._id} profile={profile} />
                    ))}
                </div>
            )}
            <button
                className="border-2 border-gray-600 text-gray-600 px-4 py-1 mt-20 hover:border-gray-400 hover:text-gray-400"
                onClick={() => navigate('/manage-profiles')}
            >
                Criar Perfil
            </button>
        </div>
    );
}

export default Profile;
