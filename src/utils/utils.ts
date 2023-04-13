const getRelativePos = (e) => {
  return {
    x: e.pageX - e.target.offsetLeft,
    y: e.pageY - e.target.offsetTop,
  };
};

const clearSreen = (ctx, canvas) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export { getRelativePos, clearSreen };
