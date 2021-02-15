import data from "./data.json";

type WrapArgs = typeof data;
type WrapReturn = number;

function wrap(_data: WrapArgs): WrapReturn {
  function taskFn(d: number[]): number {
    return 0;
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
