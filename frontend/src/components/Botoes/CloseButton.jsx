import React, { useState } from 'react';

const CloseButton = ({ onCancel }) => {
  const [confirmacao, setConfirmacao] = useState(false);

  const handleCancel = () => {
    if (confirmacao) {
      onCancel(); 
    } else {
      setConfirmacao(true);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {confirmacao ? (
        <div className="absolute top-0 right-0 mt-4 mr-4 p-0">
          <button 
            className="bg-red-500 hover:bg-red-600 text-white rounded-md px-2 py-2 focus:outline-none"
            onClick={onCancel} 
          >
            Confirmar
          </button>
          <button 
            className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md px-2 py-1 focus:outline-none"
            onClick={() => setConfirmacao(false)} 
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button 
          className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none md:block"
          onClick={handleCancel} 
        >
          Cancelar
        </button>
      )}
    </div>
  );
};

export default CloseButton;
