import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/Api';
import InputMask from 'react-input-mask';

export const ModalEdicao = ({ isOpen, onClose, produtoInfo }) => {
  const [produto, setProduto] = useState()
  useEffect(()=>{
    if (produtoInfo !== null) { 
      setProduto(produtoInfo)
    }else{
      setProduto({})
    }
    
  },[produtoInfo])
  
   
  function handleChange(e,name){ 
     setProduto({...produto, [name] : e.target.value})
  }

  function handleChangeChecked(e){ 
     setProduto({...produto, ["disponivel"]: e.target.checked})
  }
  // const handleImagemChange = (e) => {
  //   const file = e.target.files[0];
  //   setImagem(file);
  // };

  

  

  const [endImg] = useState('../../../public/uploads/estoque.png');

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Editar produto</h2>
            <form>
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
                      
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    />

                    
                  
                    
                      <img
                        src={produto.imagem}
                        alt="Imagem"
                        width="150"
                        height="150"
                        className="mt-2 mx-auto size-52 block" // Adicione a classe "mx-auto block" para centralizar horizontalmente
                      />
    
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
                        value={produto.nome}
                        onChange={(e)=>handleChange(e,"nome")}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                      />
                    
                    </div>
                    <div className="w-full sm:w-1/2 pl-2">
                      <label htmlFor="preco" className="block text-sm font-medium text-gray-700">
                        Preço:
                      </label>
                      <InputMask
                        type="text"
                        mask={"R$ 99,99"}
                        id="preco"
                        value={produto.preco}
                        onChange={(e)=>handleChange(e,"preco")}
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
                      value={produto.categoria}
                      onChange={(e)=>handleChange(e,"categoria")}
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
                      value={produto.descricao}
                      onChange={(e)=>handleChange(e,"descricao")}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700">
                      Quantidade:
                    </label>
                    <InputMask
                      type="text"
                      mask={"999"}
                      id="quantidade"
                      value={produto.quantidade}
                      onChange={(e)=>handleChange(e,"quantidade")}
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
                      checked={produto.disponivel}
                      onChange={handleChangeChecked}
                      className="mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="frete" className="block text-sm font-medium text-gray-700">
                      Frete:
                    </label>
                    <InputMask
                      type="text"
                      mask={"R$ 99,99"}
                      id="frete"
                      value={produto.frete}
                      onChange={(e)=>handleChange(e,"frete")}
                      className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="desconto" className="block text-sm font-medium text-gray-700">
                      Desconto:
                    </label>
                    <InputMask
                      type="text"
                      mask={"99 %"}
                      id="desconto"
                      value={produto.desconto}
                      onChange={(e)=>handleChange(e,"desconto")}
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


