import React from 'react';
import style from './Card.module.css';

const Card = () => {
  return (
    <div className={style.wrap}>
      <div className={style.region}>위치</div>
      <div className={style.temp}>23도</div>
    </div>
  );
};

export default Card;
