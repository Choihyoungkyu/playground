'use client';

import React from 'react';
import style from './NumButton.module.css';

interface PropsType {
  num: String;
  handleButton: (num: String) => void;
}

const NumButton = ({ num, handleButton }: PropsType) => {
  return (
    <button className={style.button} onClick={() => handleButton(num)}>
      {num}
    </button>
  );
};

export default NumButton;
