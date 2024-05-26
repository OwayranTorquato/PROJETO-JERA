import React, { useState } from 'react';
import VendaMesa from './VendaMesa'; // Importe o componente VendaMesa
import RetiradaEntrega from './RetiradaEntrega'; // Importe o componente RetiradaEntrega

const ModalFinalizarCompra = ({ carrinho, onClose }) => {
  const [tipoVenda, setTipoVenda] = useState(""); // Estado para armazenar o tipo de venda (Mesa ou Retirada/Entrega)

  const handleTipoVenda = (tipo) => {
    setTipoVenda(tipo);
  };

  // Renderização condicional do componente de acordo com o tipo de venda escolhido
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Finalizar Compra</h2>
        <p className="mb-4">Selecione o tipo de venda:</p>
        <div className="flex">
          <button 
            className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => handleTipoVenda("Mesa")}
          >
            Venda Mesa
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={() => handleTipoVenda("Retirada/Entrega")}
          >
            Retirada/Entrega
          </button>
        </div>
        {tipoVenda === "Mesa" && <VendaMesa carrinho={carrinho} onClose={onClose} />}
        {tipoVenda === "Retirada/Entrega" && <RetiradaEntrega carrinho={carrinho} onClose={onClose} />}
      </div>
    </div>
  );
};

export default ModalFinalizarCompra;
