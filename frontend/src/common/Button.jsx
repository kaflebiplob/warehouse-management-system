import React from 'react';
import { colors } from '../theme';

const Button = ({ children, disabled, ...rest }) => (
  <button
    {...rest}
    disabled={disabled}
    style={{
      width: '100%',
      background: colors.accent,
      color: '#1a1206',
      border: 'none',
      borderRadius: 6,
      padding: '0.75rem',
      fontSize: '0.95rem',
      fontWeight: 600,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      marginTop: '0.5rem',
    }}
  >
    {children}
  </button>
);

export default Button;