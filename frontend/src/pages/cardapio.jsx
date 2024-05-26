import React, { useState, useEffect } from 'react';
import CardapioProdutos from '../components/Cardapio/CardapioProdutos'; 
import ModalProduto from '../components/Cardapio/ModalProduto';
import { api } from '../services/Api'; 
import { ToastManager } from '../components/Toasts/ToastManager';

const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await api.get('/empresa/produto');
        setProdutos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
        toast.error('Erro ao buscar os produtos. Por favor, tente novamente mais tarde.');
      }
    };

    fetchProdutos();
  }, []);

  const abrirModalNovoProduto = () => {
    setModalNovoProdutoAberto(true);
  };

  const fecharModalNovoProduto = () => {
    setModalNovoProdutoAberto(false);
  };

  // Função para atualizar a lista de produtos após a exclusão
  const handleProdutoExcluido = (produtoId) => {
    // Filtrar a lista de produtos para remover o produto excluído
    const updatedProdutos = produtos.filter((produto) => produto._id !== produtoId);
    // Atualizar a lista de produtos
    setProdutos(updatedProdutos);
  };

  return (
    <div>
      <ToastManager />
      {loading ? (
        <p>Carregando produtos...</p>
      ) : (
        <div>
          {/* Passar a função handleProdutoExcluido como propriedade */}
          <CardapioProdutos produtos={produtos} setProdutos={setProdutos} onProdutoExcluido={handleProdutoExcluido} />
          <ModalProduto isOpen={modalNovoProdutoAberto} onClose={fecharModalNovoProduto} setProdutos={setProdutos} />
        </div>
      )}
    </div>
  );
};

export default Cardapio;
