import puzzleInput from "./data.json";
import { AnswerArgs, AnswerReturn } from "./types";

function answer(_puzzleInput: AnswerArgs): AnswerReturn {
  /*function taskFn(d: number[]): number {
    return d.reduce((acc, cur) => acc + cur);
  }
  const normalisedData = _puzzleInput;
  return taskFn(normalisedData);*/
  
  let totalRoses = 0;
  _puzzleInput.forEach(function(picture) {
    totalRoses += picture;
  });
  return totalRoses;
}

const result = answer(puzzleInput);
console.log(result);

/*
You can do anything you like inside the 'answer' function above.
Just return the right answer which will show in the console!
I you think that your function works, please run `npm run test`.
If you tests pass, then run `npm start` and give the answer!
 */

export default answer;
