const tasks = (arr) => arr.join(" && ");

module.exports = {
  hooks: {
    "pre-commit": tasks([
        "npm test",
        "npm build",
        "npm run lint"
    ]),
  },
};
