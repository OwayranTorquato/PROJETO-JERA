import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Importe o toast para exibir mensagens
import { api } from '../../services/Api'

const Modal = ({ isOpen, onClose }) => {
  const [nomeGrupo, setNomeGrupo] = useState('');
  const [image, setImagem] = useState(null);

  const handleNomeGrupoChange = (e) => {
    setNomeGrupo(e.target.value);
  };

  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    setImagem(file);
  };

  const [endImg] = useState('../../../public/uploads/estoque.png');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('nome', nomeGrupo);
      formData.append('image', image);

      const response = await api.post('/empresa/categoria', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status !== 201) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      onClose();
      toast.success('Novo grupo adicionada com sucesso!');
    } catch (error) {
      toast.error('Erro ao adicionar novo grupo. Tente novamente mais tarde.');
      console.error('Erro ao adicionar novo grupo:', error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Adicionar Novo Grupo</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="nomeGrupo" className="block text-sm font-medium text-gray-700">
                  Nome do Grupo:
                </label>
                <input
                  type="text"
                  id="nomeGrupo"
                  value={nomeGrupo}
                  onChange={handleNomeGrupoChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
              </div>
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
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
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

export default Modal;
