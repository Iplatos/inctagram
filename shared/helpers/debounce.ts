export const debounce = <T extends (...args: any) => any>(cb: T, delay: number) => {
  let timer: number | undefined;
  const wrapper = (value: Parameters<T>[0]) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      cb(value);
    }, delay);
  };

  wrapper.cancel = () => {
    clearTimeout(timer);
  };

  return wrapper;
};
