import { AnswerArgs, AnswerReturn } from "./types";

// do not change the next line
export default function answer(puzzleInput: AnswerArgs): AnswerReturn {
  function taskFn(d: number[]): number {
    return 0;
  }

  const normalisedData = puzzleInput;
  return taskFn(normalisedData);
}
