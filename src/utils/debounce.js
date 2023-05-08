export const debounceHandler = (cb, delay , ref) => {
  clearTimeout(ref.current);
  ref.current = setTimeout(() => {
    cb();
  }, delay);
};