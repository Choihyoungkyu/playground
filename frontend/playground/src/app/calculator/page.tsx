'use client';

import NumButton from '@/components/NumButton/NumButton';
import style from '@/styles/calculator.module.css';
import { useState } from 'react';

const calculator = () => {
  const [buffer, setBuffer] = useState<number>(0);
  const [num, setNum] = useState<number>(0);
  const [previousSymbol, setPreviousSymbol] = useState<string>(null);
  const [isPercentage, setIsPercentage] = useState<boolean>(false);

  console.log('num :', num, 'buffer :', buffer, 'symbol :', previousSymbol);

  const handleButton = async (value: string) => {
    if (isNaN(parseInt(value))) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
  };

  const handleSymbol = (symbol: string) => {
    switch (symbol) {
      case 'AC':
        setBuffer(0);
        setNum(0);
        break;
      case '=':
        if (previousSymbol === null) {
          return;
        }
        flushOperation();
        setPreviousSymbol(null);
        setBuffer(num);
        setNum(0);
        setIsPercentage(false);
        break;
      case '←':
        if (buffer.toString().length === 1) {
          setBuffer(0);
        } else {
          setBuffer((prev) => parseInt(prev.toString().substring(0, prev.toString().length)));
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '÷':
        handleMath(symbol);
        break;
    }
  };

  const handleMath = (symbol: string) => {
    if (buffer === 0) {
      return;
    }

    if (num === 0) {
      setNum(buffer);
    } else {
      flushOperation();
    }
    setPreviousSymbol(symbol);
    setBuffer(0);
  };

  const flushOperation = () => {
    if (previousSymbol === '+') {
      setNum((prev) => prev + buffer);
    } else if (previousSymbol === '-') {
      setNum((prev) => prev - buffer);
    } else if (previousSymbol === 'x') {
      setNum((prev) => prev * buffer);
    } else if (previousSymbol === '÷') {
      setNum((prev) => prev / buffer);
    }
  };

  const handleNumber = (value: string) => {
    if (buffer === 0) {
      setBuffer(parseInt(value));
    } else {
      setBuffer((prev) => parseInt(prev.toString() + value));
    }
  };

  const doPlusMinus = () => {
    if (num > 0) {
      setNum((prev) => parseInt('-' + prev.toString()));
    } else if (num < 0) {
      setNum((prev) => parseInt(prev.toString().substring(1, prev.toString().length)));
    }
  };

  const doPercent = () => {
    if (!isPercentage) {
      setNum((prev) => prev * 0.01);
      setIsPercentage(true);
    } else {
      setNum((prev) => prev * 100);
      setIsPercentage(false);
    }
  };

  return (
    <div className={style.wrap}>
      <section>
        <div className={style.num}>{buffer}</div>
      </section>
      <section>
        <div className={style.numRow}>
          <NumButton num={'AC'} handleButton={handleButton} />
          <NumButton num={'+/-'} handleButton={doPlusMinus} />
          <NumButton num={'%'} handleButton={doPercent} />
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
