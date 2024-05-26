import React from 'react';

const BotaoVerde = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-sm bg-gradient-to-r from-green-600 to-green-900 text-white py-2 px-4 rounded-md transition-colors duration-300 hover:from-green-900 hover:to-green-600 hover:text-white flex-grow whitespace-nowrap"
    >
      {children}
    </button>
  );
};

export default BotaoVerde;
