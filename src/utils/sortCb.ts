const sortCb = <T>(a: T, b: T) => {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
}

export default sortCb;