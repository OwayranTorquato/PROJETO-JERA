import React from 'react';

const BotaoLaranja = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm bg-gradient-to-r from-orange-500 to-orange-700 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:from-orange-600 hover:to-orange-500 hover:text-white"
      style={{ whiteSpace: 'nowrap' }}
    >
      {children}
    </button>
  );
};

export default BotaoLaranja;
