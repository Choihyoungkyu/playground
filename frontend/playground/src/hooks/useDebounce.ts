import { useEffect, useRef, useState } from 'react';

const useDebounce = <T>(value: T, delay = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const timeRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    if (value !== debouncedValue) {
      timeRef.current = window.setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
    }
    return () => {
      if (timeRef.current) {
        clearTimeout(timeRef.current);
      }
    };
  }, [value, delay, debouncedValue]);

  return debouncedValue;
};

export default useDebounce;
