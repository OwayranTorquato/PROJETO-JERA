import React from 'react';
import { api } from '../../services/Api';
import { toast } from 'react-toastify'; // Importe o objeto toast diretamente de 'react-toastify'

const ModalConfirmacaoExclusao = ({ isOpen, onClose, produtoId, onProdutoExcluido }) => {
  const handleExclusao = async () => {
    try {
      const response = await api.delete(`/empresa/produto/${produtoId}`);
      if (response.status === 204) {
        toast.success('Produto excluído com sucesso!');
        onProdutoExcluido(produtoId); // Chamar a função onProdutoExcluido após a exclusão bem-sucedida
      } else {
        toast.error('Erro ao excluir o produto. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
      toast.error('Erro ao excluir o produto. Tente novamente mais tarde.');
    }
    onClose(); // Fechar o modal independentemente do resultado da exclusão
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Confirmação de Exclusão</h2>
            <p>Deseja realmente excluir este produto?</p>
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md mr-4"
                onClick={handleExclusao}
              >
                Confirmar
              </button>
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalConfirmacaoExclusao;
