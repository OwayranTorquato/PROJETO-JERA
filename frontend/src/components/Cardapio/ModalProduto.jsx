import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/Api';

const ModalProduto = ({ isOpen, onClose, setProdutos }) => {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);
  const [quantidade, setQuantidade] = useState('');
  const [disponivel, setDisponivel] = useState(false);
  const [frete, setFrete] = useState('');
  const [desconto, setDesconto] = useState('');

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handlePrecoChange = (e) => {
    setPreco(e.target.value);
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleDescricaoChange = (e) => {
    setDescricao(e.target.value);
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
  };

  const handleQuantidadeChange = (e) => {
    setQuantidade(e.target.value);
  };

  const handleDisponivelChange = (e) => {
    setDisponivel(e.target.checked);
  };

  const handleFreteChange = (e) => {
    setFrete(e.target.value);
  };

  const handleDescontoChange = (e) => {
    setDesconto(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const produtoData = {
        nome,
        preco,
        categoria,
        descricao,
        quantidade,
        disponivel,
        frete,
        desconto
      };

      const formData = new FormData();
      formData.append('imagem', imagem);
      Object.entries(produtoData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await api.post('/empresa/produto', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status !== 201) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      // Atualiza a lista de produtos no componente pai
      setProdutos(prevProdutos => [...prevProdutos, response.data]);

      // Limpa os campos após o envio bem-sucedido
      setNome('');
      setPreco('');
      setCategoria('');
      setDescricao('');
      setImagem(null);
      setQuantidade('');
      setDisponivel(false);
      setFrete('');
      setDesconto('');

      onClose();
      toast.success('Novo produto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar novo produto:', error);
      toast.error('Erro ao adicionar novo produto. Tente novamente mais tarde.');
    }
  };

  const [endImg] = useState('../../../public/uploads/estoque.png');

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Novo Produto</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-wrap">
                <div className="w-full sm:w-auto pr-4">
                  {/* Preview da imagem */}
                  <div className="mb-4">
                    <label htmlFor="imagem" className="block text-sm font-medium text-gray-700">
                      Selecionar Imagem:
                    </label>
                    <input
                      type="file"
                      id="imagem"
                      onChange={handleImagemChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                    {imagem ? (
                      <img
                        src={URL.createObjectURL(imagem)}
                        alt="Imagem"
                        width="150"
                        height="150"
                        className="mt-2 mx-auto block" // Adicione a classe "mx-auto block" para centralizar horizontalmente
                      />
                    ) : (
                      <img
                        src={endImg}
                        alt="Imagem"
                        width="150"
                        height="150"
                        className="mt-2 mx-auto block" // Adicione a classe "mx-auto block" para centralizar horizontalmente
                      />
                    )}
                  </div>
                </div>
                <div className="w-full sm:w-auto flex-grow">
                  {/* Nome e Preço */}
                  <div className="flex mb-4">
                    <div className="w-full sm:w-1/2 pr-2">
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                        Nome:
                      </label>
                      <input
                        type="text"
                        id="nome"
                        value={nome}
                        onChange={handleNomeChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                      />
                    </div>
                    <div className="w-full sm:w-1/2 pl-2">
                      <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
                        Preço:
                      </label>
                      <input
                        type="text"
                        id="preco"
                        value={preco}
                        onChange={handlePrecoChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                      />
                    </div>
                  </div>
                  {/* Outros campos */}
                  <div className="mb-4">
                    <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">
                      Categoria:
                    </label>
                    <input
                      type="text"
                      id="categoria"
                      value={categoria}
                      onChange={handleCategoriaChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                      Descrição:
                    </label>
                    <textarea
                      id="descricao"
                      value={descricao}
                      onChange={handleDescricaoChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
                      Quantidade:
                    </label>
                    <input
                      type="text"
                      id="quantidade"
                      value={quantidade}
                      onChange={handleQuantidadeChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="disponivel" className="block text-sm font-medium text-gray-700">
                      Disponível:
                    </label>
                    <input
                      type="checkbox"
                      id="disponivel"
                      checked={disponivel}
                      onChange={handleDisponivelChange}
                      className="mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="frete" className="block text-sm font-medium text-gray-700">
                      Frete:
                    </label>
                    <input
                      type="text"
                      id="frete"
                      value={frete}
                      onChange={handleFreteChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="desconto" className="block text-sm font-medium text-gray-700">
                      Desconto:
                    </label>
                    <input
                      type="number"
                      id="desconto"
                      value={desconto}
                      onChange={handleDescontoChange}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Adicionar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalProduto;
