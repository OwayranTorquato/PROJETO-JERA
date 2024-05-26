import React from 'react';

const Mesa = ({ numeroMesa, comandas }) => {
  return (
    <div className="mesa-container p-4 m-2 rounded shadow-md flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-2">Mesa {numeroMesa}</h2>
      {comandas.map((comanda, index) => (
        <div key={index} className="comanda-info bg-slate-400 p-2 rounded mb-2 w-full text-center">
          <p><strong>Comanda:</strong> {comanda.numeroComanda}</p>
          <p><strong>Cliente:</strong> {comanda.clienteNome}</p>
        </div>
      ))}
    </div>
  );
};

export default Mesa;
