import React, { useState, useEffect } from 'react';
import PedidosProdutos from '../components/Pedidos/PedidosProdutos';
import ModalProduto from '../components/Cardapio/ModalProduto';
import { api } from '../services/Api';
import { ToastManager } from '../components/Toasts/ToastManager';
import Carrinho from "../components/Pedidos/CarrinhoDeCompras";
import { ImCart } from "react-icons/im";
import { AiFillCloseCircle } from "react-icons/ai";

const PDV = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
  const [carrinho, setCarrinho] = useState([]);
  const [carrinhoModalAberto, setCarrinhoModalAberto] = useState(false); // Estado para controlar a exibição do modal do carrinho
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Verifica se é mobile inicialmente

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

    // Função de callback para verificar o tamanho da tela
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define se é mobile ou não
    };

    window.addEventListener('resize', handleResize); // Adiciona um ouvinte para redimensionamento da tela

    return () => {
      window.removeEventListener('resize', handleResize); // Remove o ouvinte ao desmontar o componente
    };
  }, []);

  const adicionarProdutoAoCarrinho = (produto) => {
    // Verificar se o produto já está no carrinho
    const produtoNoCarrinho = carrinho.find(item => item._id === produto._id);

    if (produtoNoCarrinho) {
      // Se o produto já estiver no carrinho, aumentar a quantidade
      const novoCarrinho = carrinho.map(item => {
        if (item._id === produto._id) {
          return { ...item, quantidade: item.quantidade + 1 };
        }
        return item;
      });
      setCarrinho(novoCarrinho);
    } else {
      // Se o produto não estiver no carrinho, adicionar ao carrinho com quantidade 1
      setCarrinho([...carrinho, { ...produto, quantidade: 1 }]);
    }
  };

  const removerProdutoDoCarrinho = (produtoId) => {
    // Filtrar o produto do carrinho com base no ID
    const novoCarrinho = carrinho.filter(item => item._id !== produtoId);
    setCarrinho(novoCarrinho);
  };

  const atualizarQuantidadeDoProduto = (produtoId, quantidade) => {
    // Atualizar a quantidade do produto no carrinho com base no ID
    const novoCarrinho = carrinho.map(item => {
      if (item._id === produtoId) {
        return { ...item, quantidade };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
  };

  return (
    <div className="flex">
      <div className="w-full">
        <ToastManager />
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <div>
            <PedidosProdutos produtos={produtos} setProdutos={setProdutos} adicionarProdutoAoCarrinho={adicionarProdutoAoCarrinho} />
            <ModalProduto isOpen={modalNovoProdutoAberto} onClose={() => setModalNovoProdutoAberto(false)} setProdutos={setProdutos} />
          </div>
        )}

      </div>
      {isMobile ? (
        <div className="fixed bottom-0 right-0 p-4 md:hidden">
          <span className="bg-red-500 text-white rounded-full px-3 py-1 absolute top-4 right-9 transform translate-x-1/2 -translate-y-1/2 z-10">
            {carrinho.length}
          </span>
          <button onClick={() => setCarrinhoModalAberto(true)} className="relative p-5 bg-green-500 text-white rounded-full">
            <ImCart className="text-3xl" />
          </button>
        </div>
      ) : (
        // Renderizar o componente de carrinho diretamente em desktop
        <Carrinho carrinho={carrinho} removerProdutoDoCarrinho={removerProdutoDoCarrinho} atualizarQuantidadeDoProduto={atualizarQuantidadeDoProduto} />
      )}

      {/* Modal do carrinho em dispositivos móveis */}
      {carrinhoModalAberto && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 ">
            <Carrinho carrinho={carrinho} removerProdutoDoCarrinho={removerProdutoDoCarrinho} atualizarQuantidadeDoProduto={atualizarQuantidadeDoProduto} />
            <AiFillCloseCircle className='text-red-600 text-3xl text-end' onClick={() => setCarrinhoModalAberto(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PDV;