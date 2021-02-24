import { expect } from "chai";
import forEach from "mocha-each";
import userObj from "../src/user/userObj.json";

describe("Puzzle tests", function () {
  userObj.puzzles.forEach((puzzle) => {
    describe(puzzle.pId, function () {
      forEach(puzzle.testCases).it(puzzle.testString, (_ins, _outs) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fn = require(`../src/${puzzle.pId}/index.ts`);
        expect(fn.default(_ins)).to.equal(_outs);
      });
    });
  });
});
