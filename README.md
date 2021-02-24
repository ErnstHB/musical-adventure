# Typescript tasks for learning

## Motivation

I wanted to put together a smooth, 'production ready' environment which people could use to learn and practice Typescript / Javascript without the setup pain.

## Rules

No dependencies can be added, use only what is already available from the `answer.ts` scope.
Only look at files within the puzzle task folders (eg src/001)
Only modify `answer.ts` and MAYBE `types.ts` in the puzzle task folders

## Get started

The only real prerequisite is [node >14](https://nodejs.org/en/download/).

Clone the repo and create a new branch with your AMBOSS handle, make a tiny change, commit and push. For example, for me it would be:

```shell
git clone git@github.com:AlexJeffcott/musical-adventure.git
cd musical-adventure
git checkout -b ajt
npm i
git add .
git commit -m "ajt initial"
git push --set-upstream origin ajt
```

You now have your own branch to answer puzzles and share with others!

As tasks are added, you can merge from `origin main` to keep it updated.

## Doing your first task

Go to /src/001 and [open the readme.md](src/001/README.md)

The has the instructions for the first task.

Attempt to answer it and then run the tests to see if you have a working solution:
```shell
npm test
```

If you want to see what you compiled Javascript would look like, run `npm run build` and take a look in the `build` folder.

## Contributing
If you want to open a pr to improve the base setup, or if you have a suggestion for a new puzzle, pull requests are welcome.

If you find a bug etc in the tests, or want to improve the task descriptions etc please [open an issue](https://github.com/AlexJeffcott/musical-adventure/issues).
