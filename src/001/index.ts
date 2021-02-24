import answer from "./answer";
import data from "./data.json";
import { MainArgs, MainReturn } from "./types";

export default function main(dataOverride?: MainArgs): MainReturn {
  if (dataOverride) return answer(dataOverride);
  return answer(data);
}
