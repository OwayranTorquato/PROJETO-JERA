import React, { useState } from 'react';
import { FaLongArrowAltDown } from "react-icons/fa";
import { ConversorReal } from '../../utils/ConversorReal';

const PedidoProdutos = ({ produtos, setProdutos, adicionarProdutoAoCarrinho }) => {
    const [termoPesquisa, setTermoPesquisa] = useState('');

    const handlePesquisaChange = (e) => {
        setTermoPesquisa(e.target.value);
    };

    const handleProdutoClick = (produto) => {
        adicionarProdutoAoCarrinho(produto);
    };

    const produtosFiltrados = produtos.filter((produto) =>
        produto.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
    );

    return (

        <div className="py-1 xl:p-10 font-inter cursor-pointer">
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

                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
                        {produtosFiltrados.map((produto) => {
                            const precoComDesconto = produto.preco * (1 - produto.desconto / 100);
                            return (
                                <div key={produto._id} className="bg-gray-500 rounded ring-1 flex flex-col justify-between relative" style={{ display: 'grid', gridTemplateColumns: '100%' }} onClick={() => handleProdutoClick(produto)}>
                                    <div className="p-1 relative">
                                        <img src={produto.imagem} alt={produto.nome} className="w-full h-40 object-cover bg-no-repeat rounded-t-sm" />
                                    </div>
                                    <div className="text-xs absolute top-1 left-0 bg-gradient-to-r from-red-600 to-red-700 text-white py-1 px-2 rounded-full flex items-center">
                      <FaLongArrowAltDown className="mr-1" />
                      <span>{produto.desconto}%</span>
                    </div>
                    <div className="text-sm absolute top-1 right-1 bg-gradient-to-r from-orange-600 to-orange-700 text-white py-1 px-2 rounded-full">
                      {produto.categoria}
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PedidoProdutos;
