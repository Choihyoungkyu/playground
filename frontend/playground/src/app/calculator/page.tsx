'use client';

import NumButton from '@/components/NumButton/NumButton';
import style from '@/styles/calculator.module.css';
import { useRef, useState } from 'react';

const calculator = () => {
  const [buffer, setBuffer] = useState<string>('0');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const num = useRef<string>('0');
  const previousSymbol = useRef<string>(null);

  const handleButton = async (value: string) => {
    if (isNaN(parseFloat(value))) {
      handleSymbol(value);
    } else {
      handleNumber(value);
    }
  };

  const handleSymbol = (symbol: string) => {
    switch (symbol) {
      case 'AC':
        num.current = '0';
        previousSymbol.current = null;
        setBuffer('0');
        setIsUpdate((prev) => !prev);
        break;
      case '=':
        if (previousSymbol.current === null) {
          return;
        }
        flushOperation();
        previousSymbol.current = null;
        setBuffer(num.current);
        num.current = '0';
        break;
      case '←':
        if (buffer.length === 1) {
          setBuffer('0');
        } else {
          setBuffer((prev) => prev.substring(0, prev.length - 1));
        }
        break;
      case '+':
      case '-':
      case 'x':
      case '÷':
        handleMath(symbol);
        break;
      case '.':
        setBuffer((prev) => prev + '.');
    }
  };

  const handleMath = (symbol: string) => {
    if (buffer === '0') {
      setIsUpdate((prev) => !prev);
      previousSymbol.current = symbol;
      return;
    }

    if (num.current === '0') {
      num.current = buffer;
    } else {
      flushOperation();
    }
    previousSymbol.current = symbol;
    setBuffer('0');
  };

  const flushOperation = () => {
    if (previousSymbol.current === '+') {
      num.current = customNum((parseFloat(num.current) + parseFloat(buffer)).toString());
    } else if (previousSymbol.current === '-') {
      num.current = customNum((parseFloat(num.current) - parseFloat(buffer)).toString());
    } else if (previousSymbol.current === 'x') {
      num.current = customNum((parseFloat(num.current) * parseFloat(buffer)).toString());
    } else if (previousSymbol.current === '÷') {
      num.current = customNum((parseFloat(num.current) / parseFloat(buffer)).toString());
    }
  };

  const handleNumber = (value: string) => {
    if (buffer === '0') {
      setBuffer(value);
    } else {
      if (buffer.length < 9) {
        setBuffer((prev) => prev + value);
      } else {
        setBuffer((prev) => prev.substring(1, 9) + value);
      }
    }
  };

  const doPlusMinus = () => {
    if (parseFloat(buffer) > 0) {
      setBuffer((prev) => '-' + prev);
    } else if (parseFloat(buffer) < 0) {
      setBuffer((prev) => prev.substring(1, prev.length));
    }
  };

  const customNum = (num: string) => {
    const numList = num.split('.');
    if (numList.length === 1) {
      return num;
    } else {
      const target = numList[1];
      if (target.length < 5) {
        return num;
      } else {
        return numList[0] + '.' + target.substring(0, 5);
      }
    }
  };

  return (
    <div className={style.wrap}>
      <section>
        <div className={style.num}>{buffer === '0' ? num.current : buffer}</div>
      </section>
      <section>
        <div className={style.numRow}>
          <NumButton num={'AC'} className="gray" handleButton={handleButton} />
          <NumButton num={'+/-'} className="gray" handleButton={doPlusMinus} />
          <NumButton num={'←'} className="gray" handleButton={handleButton} />
          <NumButton
            num={'÷'}
            className={`orange ${previousSymbol.current === '÷' && 'focus'}`}
            handleButton={handleButton}
          />
        </div>
        <div className={style.numRow}>
          <NumButton num={'7'} handleButton={handleButton} />
          <NumButton num={'8'} handleButton={handleButton} />
          <NumButton num={'9'} handleButton={handleButton} />
          <NumButton
            num={'x'}
            className={`orange ${previousSymbol.current === 'x' && 'focus'}`}
            handleButton={handleButton}
          />
        </div>
        <div className={style.numRow}>
          <NumButton num={'4'} handleButton={handleButton} />
          <NumButton num={'5'} handleButton={handleButton} />
          <NumButton num={'6'} handleButton={handleButton} />
          <NumButton
            num={'-'}
            className={`orange ${previousSymbol.current === '-' && 'focus'}`}
            handleButton={handleButton}
          />
        </div>
        <div className={style.numRow}>
          <NumButton num={'1'} handleButton={handleButton} />
          <NumButton num={'2'} handleButton={handleButton} />
          <NumButton num={'3'} handleButton={handleButton} />
          <NumButton
            num={'+'}
            className={`orange ${previousSymbol.current === '+' && 'focus'}`}
            handleButton={handleButton}
          />
        </div>
        <div className={style.numRow}>
          <NumButton num={'0'} className="zero" handleButton={handleButton} />
          <NumButton num={'.'} handleButton={handleButton} />
          <NumButton num={'='} className="orange" handleButton={handleButton} />
        </div>
      </section>
    </div>
  );
};

export default calculator;
