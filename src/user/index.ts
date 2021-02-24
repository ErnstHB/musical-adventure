import prompt from "prompt";
import userObj from "./userObj.json";
import { getProperties } from "./getProperties";
import { onError } from "./onError";
import { Result, User } from "./types";

function init(_userObj: User, _prompt = prompt) {
  _prompt.start();

  // get first unanswered puzzle
  const currentPuzzle = _userObj.puzzles.find((p) => p.answer === null);

  _prompt.get(
    getProperties(_userObj, currentPuzzle),
    function (err: Error, result: Result) {
      if (err) return onError(err);
      // const newUserObj = {
      //
      //     ..._userObj,
      // }
      //   fs.writeFile(`./userObj.json`, JSON.stringify(newUserObj), (err) =>
      //       err ? console.error(`Error writing userObj`, err) : console.log(`userObj successfully saved!`)
      //   )
      console.log("Command-line input received:", result);
    }
  );
}

init(userObj);
