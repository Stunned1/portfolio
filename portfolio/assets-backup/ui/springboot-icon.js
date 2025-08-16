import React from 'react';
import springbootLogo from './images/springboot.png';

const SpringBootIcon = ({ size = 24 }) => {
  return (
    <img 
      src={springbootLogo} 
      alt="Spring Boot" 
      width={size} 
      height={size}
      className="theme-aware-icon"
      style={{ objectFit: 'contain' }}
    />
  );
};

export default SpringBootIcon; 