import { useCallback, useRef } from 'react';

export const useInfiniteScroll = (onIntersect: () => void, isFetching: boolean) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetching || !node) {
        return;
      }

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          console.log('Intersection observed');
          onIntersect();
        }
      });

      observerRef.current.observe(node);
    },
    [onIntersect, isFetching]
  );

  return lastElementRef;
};
