import React, { useState, useEffect } from 'react';
import Mesa from '../components/Mesa/mesa';
import { api } from '../services/Api'; 
import { ToastManager } from '../components/Toasts/ToastManager';

const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMesas = async () => {
      try {
        const response = await api.get('/empresa/pedidos');
        const data = response.data;
        
        // Organizando os dados por mesa
        const mesasOrganizadas = data.reduce((acc, item) => {
          const mesaIndex = acc.findIndex(mesa => mesa.numeroMesa === item.numeroMesa);
          if (mesaIndex === -1) {
            acc.push({ numeroMesa: item.numeroMesa, comandas: [item] });
          } else {
            acc[mesaIndex].comandas.push(item);
          }
          return acc;
        }, []);

        setMesas(mesasOrganizadas);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar as mesas:', error);
        toast.error('Erro ao buscar as mesas. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchMesas();
  }, []);

  return (
    <div>
      <ToastManager />
      {loading ? (
        <p>Carregando mesas...</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 p-4">
            {mesas.map((mesa) => (
              <Mesa key={mesa.numeroMesa} numeroMesa={mesa.numeroMesa} comandas={mesa.comandas} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Mesas;
