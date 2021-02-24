import { Properties, User, Puzzle } from "./types";

export function getProperties(
  _userObj: User,
  puzzle: Puzzle | undefined
): Properties {
  const promptForUser = {
    name: "name",
    description: "Please enter your first name (no numbers or spaces)",
    type: "string",
    conform: function (value: string) {
      return /^[a-zA-Z]+$/.test(value);
    },
    warning: "You name must be only letters.",
  };

  const promptForAnswer = {
    name: `answer`,
    description: `Please enter your answer to question ${puzzle && puzzle.pId}`,
    type: "number",
    conform: function (value: string) {
      return /^[0-9]+$/.test(value);
    },
    warning: "Answer can only contain digits.",
  };

  if (_userObj.userId === "") {
    return [promptForUser, promptForAnswer];
  } else {
    return [promptForAnswer];
  }
}
