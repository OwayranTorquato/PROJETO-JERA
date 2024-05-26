import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { ConversorReal } from '../../utils/ConversorReal';
import ModalFinalizarCompra from './ModalFinalizarCompra'; // Importe o componente ModalFinalizarCompra

const Carrinho = ({ carrinho, removerProdutoDoCarrinho, atualizarQuantidadeDoProduto }) => {
  const [modalAberto, setModalAberto] = useState(false); // Estado para controlar a abertura do modal

  // Função para calcular o preço com desconto de um produto
  const calcularPrecoComDesconto = (produto) => {
    return produto.preco * (1 - produto.desconto / 100);
  };

  // Função para calcular o total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => {
      return total + (calcularPrecoComDesconto(produto) * produto.quantidade);
    }, 0);
  };

  // Função para atualizar a quantidade de um produto no carrinho, garantindo que não seja menor que 1
  const atualizarQuantidade = (produtoId, quantidade) => {
    if (quantidade < 1) {
      removerProdutoDoCarrinho(produtoId);
    } else {
      atualizarQuantidadeDoProduto(produtoId, quantidade);
    }
  };

  // Função para abrir o modal de finalizar compra
  const handleFinalizarCompra = () => {
    setModalAberto(true);
  };

  // Log dos dados do carrinho
  console.log('Dados do carrinho:', carrinho);


  return (
    <div className="md:w-1/3 p-4 bg-white shadow-md">
      <h2 className="font-bold text-lg mb-4">Carrinho</h2>
      {carrinho.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <div className="divide-y divide-gray-200">
          {carrinho.map((produto) => (
            <div key={produto._id} className="flex justify-between items-center py-2">
              <div className="flex items-center">
                {/* Adicionar a imagem do produto */}
                <img src={produto.imagem} alt={produto.nome} className="w-8 h-8 mr-2 rounded" />
                <span className="font-semibold">{produto.nome}</span>
              </div>
              <div className="flex items-center">
                <button className="px-2 bg-gray-200 roundedcursor-pointer " onClick={() => atualizarQuantidade(produto._id, produto.quantidade - 1)}>-</button>
                <span className="px-2">{produto.quantidade}</span>
                <button className="px-2 bg-gray-200 rounded cursor-pointer" onClick={() => atualizarQuantidadeDoProduto(produto._id, produto.quantidade + 1)}>+</button>
                <MdDelete className="text-red-700 text-2xl cursor-pointer"  onClick={() => removerProdutoDoCarrinho(produto._id)}/>
              </div>
              {/* Mostrar o valor com desconto */}
              <div className="text-right">
                {ConversorReal(calcularPrecoComDesconto(produto) * produto.quantidade)}
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4">
        {/* Mostrar o total do carrinho */}
        <div className="flex justify-between">
          <span className="font-semibold">Total:</span>
          <span>{ConversorReal(calcularTotal())}</span>
        </div>
        {/* Botão para finalizar compra */}
        <button className="w-full bg-green-700 text-white py-2 rounded mt-2 hover:bg-green-500" onClick={handleFinalizarCompra}>Finalizar Compra</button>
      </div>
      {/* Modal de finalizar compra */}
      {modalAberto && <ModalFinalizarCompra carrinho={carrinho} onClose={() => setModalAberto(false)} />}
    </div>
  );
};

export default Carrinho;
