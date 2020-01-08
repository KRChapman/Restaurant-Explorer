import { useEffect, useRef } from 'react';

export const useDidUpdateEffect = (fn, inputs = []) => {
  const isInitialRender = useRef(true);
  //
  useEffect(() => {
    if (isInitialRender.current){
      isInitialRender.current = false;
    }
    else{
      fn();
    }
  }, [fn, inputs]);
}