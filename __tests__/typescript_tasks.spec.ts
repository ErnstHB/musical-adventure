import { expect } from "chai";
import forEach from "mocha-each";

import { task_001 } from "../src/index";

describe("Typescript tasks", function () {
  describe("task 001", function () {
    forEach([
      [[6, 6], 12],
      [[6], 6],
      [[-6, 6], 0],
      [[6, 6, 6, 6], 24],
    ]).it("sums numbers in %s then returns %d", (_ins, _outs) => {
      expect(task_001(_ins)).to.equal(_outs);
    });
  });
});
