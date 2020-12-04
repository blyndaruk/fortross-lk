export function addZeroes(num) {
  let value = Number(num);
  let res = num.split(".");
  if (res.length === 1 || res[1].length < 3) {
    value = value.toFixed(1);
  }
  return value;
}
