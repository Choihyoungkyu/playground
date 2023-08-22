'use client';

import NumButton from '@/components/NumButton/NumButton';
import style from '@/styles/calculator.module.css';
import { useState } from 'react';

const calculator = () => {
  const [currentNum, setCurrentNum] = useState<number>(0);
  const handleButton = async (num: String) => {
    console.log(num);
    return;
  };

  return (
    <div className={style.wrap}>
      <section>
        <div className={style.num}>{currentNum}</div>
      </section>
      <section>
        <div className={style.numRow}>
          <NumButton num={'AC'} handleButton={handleButton} />
          <NumButton num={'+/-'} handleButton={handleButton} />
          <NumButton num={'%'} handleButton={handleButton} />
          <NumButton num={'÷'} handleButton={handleButton} />
        </div>
        <div className={style.numRow}>
          <NumButton num={'7'} handleButton={handleButton} />
          <NumButton num={'8'} handleButton={handleButton} />
          <NumButton num={'9'} handleButton={handleButton} />
          <NumButton num={'x'} handleButton={handleButton} />
        </div>
        <div className={style.numRow}>
          <NumButton num={'4'} handleButton={handleButton} />
          <NumButton num={'5'} handleButton={handleButton} />
          <NumButton num={'6'} handleButton={handleButton} />
          <NumButton num={'-'} handleButton={handleButton} />
        </div>
        <div className={style.numRow}>
          <NumButton num={'1'} handleButton={handleButton} />
          <NumButton num={'2'} handleButton={handleButton} />
          <NumButton num={'3'} handleButton={handleButton} />
          <NumButton num={'+'} handleButton={handleButton} />
        </div>
        <div className={style.numRow}>
          <NumButton num={'0'} handleButton={handleButton} />
          <NumButton num={'.'} handleButton={handleButton} />
          <NumButton num={'='} handleButton={handleButton} />
        </div>
      </section>
    </div>
  );
};

export default calculator;
