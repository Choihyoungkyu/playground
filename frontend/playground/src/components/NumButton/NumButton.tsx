'use client';

import React from 'react';
import style from './NumButton.module.css';

interface PropsType {
  num: string;
  handleButton: (num: string) => void;
  className?: string | null;
}

const NumButton = ({ num, handleButton, className }: PropsType) => {
  return (
    <button
      className={`
        ${style.button} 
        ${className && className.split(' ').includes('zero') && style.zero}
        ${className && className.split(' ').includes('orange') && style.orange}
        ${className && className.split(' ').includes('gray') && style.gray}
        ${className && className.split(' ').includes('focus') && style.focus}
      `}
      onClick={() => handleButton(num)}
    >
      {num}
    </button>
  );
};

export default NumButton;
