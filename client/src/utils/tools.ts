export const getRelativePos = (e: MouseEvent) => {
  const target = e.target as HTMLCanvasElement;
  return {
    x: e.pageX - target.offsetLeft,
    y: e.pageY - target.offsetTop,
  };
};
