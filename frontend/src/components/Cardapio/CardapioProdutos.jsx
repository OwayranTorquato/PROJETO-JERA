import React, { useState } from 'react';
import BotaoLaranja from '../Botoes/BotaoLaranja';
import BotaoVerde from '../Botoes/BotaoVerde';
import Modal from './ModalCategoria';
import ModalProduto from './ModalProduto';
import ModalConfirmacaoExclusao from '../Modal/ModalConfirmacaoExclusao';
import { FaLongArrowAltDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { ConversorReal } from '../../utils/ConversorReal';
import {ModalEdicao} from '../Modal/ModalEdicao';


const CardapioProdutos = ({ produtos, setProdutos, categorias }) => {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [modalNovoProdutoAberto, setModalNovoProdutoAberto] = useState(false);
  const [produtoIdParaExcluir, setProdutoIdParaExcluir] = useState(null);
  const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
  const [modalEditarAberto, setModalEditarAberto] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);

  const handlePesquisaChange = (e) => {
    setTermoPesquisa(e.target.value);
  };

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const abrirModalNovoProduto = () => {
    setModalNovoProdutoAberto(true);
  };

  const fecharModalNovoProduto = () => {
    setModalNovoProdutoAberto(false);
  };

  const abrirModalExclusao = (produtoId) => {
    setProdutoIdParaExcluir(produtoId);
    setModalExclusaoAberto(true);
  };

  const fecharModalExclusao = () => {
    setProdutoIdParaExcluir(null);
    setModalExclusaoAberto(false);
  };

  const handleProdutoExcluido = (produtoId) => {
    setProdutos(produtos.filter((produto) => produto._id !== produtoId));
  };

  const abrirModalEditar = (produto) => { 
    setProdutoParaEditar(produto)
    setModalEditarAberto(true)
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  return (
    <div className="py-1 xl:p-10 font-inter">
      <div className="ring-1 h-[89vh] rounded-md ring-slate-800 overflow-hidden">
        <div className="overflow-y-auto h-full">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={termoPesquisa}
              onChange={handlePesquisaChange}
              placeholder="Pesquisar..."
              className="p-2 w-full border border-gray-300 rounded-md"
            />
            <BotaoLaranja onClick={abrirModal}>Novo Grupo</BotaoLaranja>
            <BotaoVerde onClick={abrirModalNovoProduto}>Novo Produto</BotaoVerde>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3">
            {produtosFiltrados.map((produto) => {
              const precoComDesconto = produto.preco * (1 - produto.desconto / 100);
              return (
                <div key={produto._id} className="bg-gray-500 rounded ring-1 flex flex-col justify-between relative" style={{ display: 'grid', gridTemplateColumns: '100%' }}>
                  <div className="p-1 relative">
                    <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover bg-no-repeat rounded-t-sm" />
                    <div className="text-xs absolute top-1 left-0 bg-gradient-to-r from-red-600 to-red-700 text-white py-1 px-2 rounded-full flex items-center">
                      <FaLongArrowAltDown className="mr-1" />
                      <span>{produto.desconto}%</span>
                    </div>
                    <div className="text-sm absolute top-1 right-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-1 px-2 rounded-full">
                      {produto.categoria}
                    </div>
                  </div>
                  <div className="border-t-2 border-gray-300 mt-4"></div>
                  <div className="p-3">
                    <h4 className="text-xl font-bold text-black">{produto.nome}</h4>
                    <span className="text-md font-bold text-green-500">{ConversorReal(precoComDesconto)}</span>{" "}
                    <span className="text-sm font-bold text-black line-through">{ConversorReal(produto.preco)}</span>
                    <div>
                      <span className="text-sm font-bold text-black">Em estoque: {produto.quantidade}</span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 p-1 gap-2 flex items-center">
                    <div>
                      <MdDelete className="text-red-700 text-2xl cursor-pointer" onClick={() => abrirModalExclusao(produto._id)} />
                    </div>
                    <div>
                      <BiSolidEditAlt onClick={()=>abrirModalEditar(produto)} className="text-blue-700 text-2xl cursor-pointer" />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Modal isOpen={modalAberto} onClose={fecharModal} />
      <ModalProduto isOpen={modalNovoProdutoAberto} onClose={fecharModalNovoProduto} setProdutos={setProdutos} />
      <ModalConfirmacaoExclusao isOpen={modalExclusaoAberto} onClose={fecharModalExclusao} produtoId={produtoIdParaExcluir} onProdutoExcluido={handleProdutoExcluido} />
    </div>
  );
};

export default CardapioProdutos;
