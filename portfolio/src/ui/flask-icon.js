import React from 'react';
import flaskLogo from './images/flask.png';

const FlaskIcon = ({ size = 24 }) => {
  return (
    <img 
      src={flaskLogo} 
      alt="Flask" 
      width={size} 
      height={size}
      className="theme-aware-icon"
      style={{ objectFit: 'contain' }}
    />
  );
};

export default FlaskIcon; 