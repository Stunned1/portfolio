import React from 'react';
import ollamaLogo from './images/ollama.png';

const OllamaIcon = ({ size = 24 }) => {
  return (
    <img 
      src={ollamaLogo} 
      alt="Ollama" 
      width={size} 
      height={size}
      className="theme-aware-icon"
      style={{ objectFit: 'contain' }}
    />
  );
};

export default OllamaIcon; 