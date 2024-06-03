import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button';
  loading?: boolean;
}

const Button = ({ children, type = 'button', onClick, loading }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={styles.container}
      disabled={loading}
    >
      {loading ? 'Processing....' : children}
    </button>
  );
};

export default Button;