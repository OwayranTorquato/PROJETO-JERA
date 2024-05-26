import React from 'react';
import './style.css'; // Importando o arquivo de estilo CSS

const LoadingAnimation = () => {
  return (
    <di className="loading-body">
      <div className="loading-container">
        <span className="loading-span">Saindo do sistema, aguarde...</span>
        <span className="loading-drop"></span>
        <svg className="loading-svg">
          <defs>
            <filter id="loading-gooey">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
              <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -20" result="gooey" />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
    </di>


  );
};

export default LoadingAnimation;
