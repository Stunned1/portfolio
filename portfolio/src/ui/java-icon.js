import React from 'react';
import javaLogo from './images/java.png';

const JavaIcon = ({ size = 24 }) => {
  return (
    <img 
      src={javaLogo} 
      alt="Java" 
      width={size} 
      height={size}
      className="theme-aware-icon"
      style={{ objectFit: 'contain' }}
    />
  );
};

export default JavaIcon; 