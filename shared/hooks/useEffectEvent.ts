import { useCallback, useRef } from 'react';

/**
 * Use this hook to separate non-reactive logic from reactive Effect.
 * It allows to exclude "event-like" code from the useEffect dependencies list.
 *
 * This can be useful when you just need to "see" the latest values without the effect needing to react on changes.
 *
 * Or you need to not react to callbacks provided by parent props.
 *
 * Use it carefully! This is always the best way not to suppress UseEffects dependencies in any way.
 *
 * This is a custom implementation of the experimental hook useEffectEvent.
 *
 * https://react.dev/learn/separating-events-from-effects#extracting-non-reactive-logic-out-of-effects
 * */
export const useEffectEvent = <P extends any[], R>(fn: (...args: P) => R) => {
  const ref = useRef(fn);

  ref.current = fn;

  return useCallback((...args: P): R => ref.current(...args), []);
};
