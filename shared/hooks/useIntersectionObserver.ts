import { useCallback, useEffect, useRef } from 'react';

type Props = {
  callback: () => void;
  options?: IntersectionObserverInit;
};

export const useIntersectionObserver = ({ callback, options }: Props) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    },
    [callback]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [handleObserver, options]);

  return targetRef;
};
