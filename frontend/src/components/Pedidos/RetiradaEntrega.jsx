import React, { useState } from 'react';
import { api } from '../../services/Api';
import CloseButton from '../Botoes/CloseButton';
import { toast } from 'react-toastify';

const RetiradaEntrega = ({ carrinho, onClose }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    nomeCliente: '',
    enderecoEntrega: '',
    // Outros campos necessários para a retirada/entrega
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/retirada-entrega', { produtos: carrinho, dadosFormulario });
      console.log('Retirada/Entrega registrada:', response.data);

      // Exibir toast de sucesso
      toast.success('Retirada/Entrega registrada com sucesso!');

      // Limpar os campos do formulário
      setDadosFormulario({
        nomeCliente: '',
        enderecoEntrega: '',
      });

      onClose(); // Feche o modal após o registro
    } catch (error) {
      console.error('Erro ao registrar retirada/entrega:', error);
      // Exibir toast de erro
      toast.error('Erro ao registrar retirada/entrega. Tente novamente mais tarde.');
    }
  };

  const handleChange = (e) => {
    setDadosFormulario({
      ...dadosFormulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input 
        type="text" 
        name="nomeCliente" 
        value={dadosFormulario.nomeCliente} 
        onChange={handleChange} 
        placeholder="Nome do Cliente" 
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      <input 
        type="text" 
        name="enderecoEntrega" 
        value={dadosFormulario.enderecoEntrega} 
        onChange={handleChange} 
        placeholder="Endereço de Entrega" 
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      <CloseButton onCancel={handleCancel} />
      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 focus:outline-none focus:bg-blue-600"
      >
       Finalizar Venda
      </button>
    </form>
  );
};

export default RetiradaEntrega;
