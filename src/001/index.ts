import data from "./data.json";

type WrapArgs = typeof data;
type WrapReturn = number;

function wrap(_data: WrapArgs): WrapReturn {
  // don't touch about this line

  function taskFn(d: number[]): number {
    return 0;
  }

  const normalisedData = _data;

  // don't touch below this line
  return taskFn(normalisedData);
}

type MainArgs = WrapArgs;
type MainReturn = WrapReturn;
export default function main(dataOverride?: MainArgs): MainReturn {
  if (dataOverride) return wrap(dataOverride);
  return wrap(data);
}
