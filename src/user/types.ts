export type Result = {
  name: string;
  answer: number;
};

type Property = {
  name: string;
  description: string;
  type?: string;
  conform: (val: string) => boolean;
  warning: string;
  default?: string;
};

export type Properties = Property[];

export type Puzzle = {
  pId: string;
  title: string;
  answer: number | null;
  description: string;
  question: string;
  input: number[];
  testCases: (number | number[])[][];
  testString: string;
};

export type Puzzles = Puzzle[];

export type User = {
  userId: string;
  puzzles: Puzzles;
};
