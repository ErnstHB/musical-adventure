import data from "./data.json";

type WrapArgs = typeof data;
type WrapReturn = number;

function wrap(_data: WrapArgs): WrapReturn {
  function isOdd(n: number) {
    return n % 2;
  }

  function taskFn(d: number[]): number {
    return d.filter(isOdd).reduce((acc, cur) => acc + cur, 0);
  }

  const normalisedData = _data;

  return taskFn(normalisedData);
}

// don't touch below this line
type MainArgs = WrapArgs;
type MainReturn = WrapReturn;

export default function main(dataOverride?: MainArgs): MainReturn {
  if (dataOverride) return wrap(dataOverride);
  return wrap(data);
}
