import React from 'react';

const Button = ({ children, type = 'button', variant = 'primary', icon: Icon, ...props }) => {
  return (
    <button 
      type={type} 
      className={variant === 'primary' ? 'btn-primary' : 'btn-google'}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
