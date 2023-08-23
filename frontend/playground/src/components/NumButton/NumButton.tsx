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
    <button className={style.button} onClick={() => handleButton(num)}>
      {num}
    </button>
  );
};

export default NumButton;
