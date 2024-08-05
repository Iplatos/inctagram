import { useEffect, useMemo, useRef } from 'react';

import { debounce } from '../helpers/debounce';

export const useDebouncedCallBack = <T extends (...args: any) => any>(cb: T, delay: number) => {
  const debouncedCallBackRef = useRef(debounce(cb, delay));

  const debouncedCallBack = debouncedCallBackRef.current;

  useEffect(() => {
    return () => {
      debouncedCallBack.cancel();
    };
  }, [debouncedCallBack]);

  return debouncedCallBack;
};
