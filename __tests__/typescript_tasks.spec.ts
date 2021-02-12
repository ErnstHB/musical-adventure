/* eslint-disable no-sparse-arrays */
import { expect } from "chai";
import forEach from "mocha-each";

import { task_001, task_002, task_003 } from "../src/index";

describe("Typescript tasks", function () {
  describe("task 001", function () {
    forEach([
      [, 309281],
      [[6, 6], 12],
      [[6], 6],
      [[-6, 6], 0],
      [[6, 6, 6, 6], 24],
    ]).it("sums numbers in %s then returns %d", (_ins, _outs) => {
      expect(task_001(_ins)).to.equal(_outs);
    });
  });

  describe("task 002", function () {
    forEach([
      [, 107],
      [[1], 1],
      [[2], 0],
      [[1, 2], 1],
      [[1, 1, 1, 3], 4],
    ]).it("counts odds numbers in %s (%d)", (_ins, _outs) => {
      expect(task_002(_ins)).to.equal(_outs);
    });
  });

  describe("task 003", function () {
    forEach([
      [, 167313],
      [[1], 1],
      [[2], 0],
      [[1, 2], 1],
      [[1, 1, 1, 3], 6],
    ]).it("sums odds numbers in %s (%d)", (_ins, _outs) => {
      expect(task_003(_ins)).to.equal(_outs);
    });
  });
});
