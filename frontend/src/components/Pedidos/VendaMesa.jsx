import React, { useState } from 'react';
import { api } from '../../services/Api';
import CloseButton from '../Botoes/CloseButton';
import { toast } from 'react-toastify';
import MaskedInput from 'react-text-mask';

const VendaMesa = ({ carrinho, onClose }) => {
  const [dadosFormulario, setDadosFormulario] = useState({
    numeroMesa: '',
    numeroComanda: '',
    clienteCPF: '',
    clienteNome: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { numeroMesa, numeroComanda, clienteNome, clienteCPF } = dadosFormulario;
    let payload = {
      numeroMesa,
      numeroComanda,
      clienteCPF,
      clienteNome,
      produtos: carrinho,
    };
  
    if (clienteCPF && clienteCPF.length === 14) {
      try {
        const response = await api.post('/busca/usuario', { cpf: clienteCPF });
        const usuario = response.data;
        if (usuario) {
          toast.info('Cliente encontrado na base de dados!');
          const { nivelAcesso, password, ...cliente } = usuario;
          payload = {
            ...payload,
            cliente,
          };
        } else {
          toast.info('Cliente não encontrado na base de dados.');
          payload = {
            ...payload,
            clienteCPF: '', // Remove o CPF quando o cliente não for encontrado
          };
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.info('Cliente não encontrado na base de dados.');
        } else {
          toast.error('Erro ao buscar usuário.');
        }
      }
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await api.post('/empresa/pedidos', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      toast.success('Venda de mesa registrada com sucesso!');
      setDadosFormulario({
        numeroMesa: '',
        numeroComanda: '',
        clienteNome: '',
        clienteCPF: '',
      });
      onClose();
    } catch (error) {
      toast.error('Erro ao registrar venda de mesa. Tente novamente mais tarde.');
    }
  };

  const handleCPFChange = (e) => {
    const { value } = e.target;
    const formattedCPF = formatCPF(value);
    setDadosFormulario({ ...dadosFormulario, clienteCPF: value });

    const onlyNumbers = value.replace(/\D/g, '');
    const maskedCPF = formatCPF(onlyNumbers);
    setDadosFormulario({ ...dadosFormulario, clienteCPF: maskedCPF });
  };

  const handleCPFBlur = async (e) => {
    const { value } = e.target;
    const formattedCPF = formatCPF(value);
    setDadosFormulario({ ...dadosFormulario, clienteCPF: formattedCPF });

    if (value.length === 14) {
      try {
        const response = await api.post('/busca/usuario', { cpf: value });
        const usuario = response.data;
        if (usuario) {
          toast.info('Cliente encontrado na base de dados!');
          setDadosFormulario({ ...dadosFormulario, clienteNome: usuario.name });
        } else {
          toast.info('Cliente não encontrado na base de dados.');
          setDadosFormulario({ ...dadosFormulario, clienteNome: '' });
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.info('Cliente não encontrado na base de dados.');
          setDadosFormulario({ ...dadosFormulario, clienteNome: '' });
        } else {
          toast.error('Erro ao buscar usuário.');
        }
      }
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const formatCPF = (value) => {
    return value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-4">
      <input
        type="number"
        name="numeroMesa"
        value={dadosFormulario.numeroMesa}
        onChange={(e) => setDadosFormulario({ ...dadosFormulario, numeroMesa: e.target.value })}
        placeholder="Número da Mesa"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        required
      />
      <input
        type="number"
        name="numeroComanda"
        value={dadosFormulario.numeroComanda}
        onChange={(e) => setDadosFormulario({ ...dadosFormulario, numeroComanda: e.target.value })}
        placeholder="Número da Comanda"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        required
      />
      <MaskedInput
        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
        type="text"
        name="clienteCPF"
        value={dadosFormulario.clienteCPF}
        onChange={handleCPFChange}
        onBlur={handleCPFBlur}
        placeholder="CPF do Cliente (opcional)"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        name="clienteNome"
        value={dadosFormulario.clienteNome}
        onChange={(e) => setDadosFormulario({ ...dadosFormulario, clienteNome: e.target.value })}
        placeholder="Nome do Cliente"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
        required
      />

      <CloseButton onCancel={handleCancel} />

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 focus:outline-none focus:bg-blue-600"
      >
        Finalizar Venda Mesa
      </button>
    </form>
  );
};

export default VendaMesa;
