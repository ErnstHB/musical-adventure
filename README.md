# Typescript tasks for learning

## Motivation

I wanted to put together a smooth, 'production ready' environment which people could use to learn and practice Typescript / Javascript without the setup pain.

## Rules

No utility libraries like lodash are allowed unless they are provided. 
Do not change anything below where it says `// don't touch below this line`
Only modify files within the task folder

## Get started

The only real prerequisite is [node >14](https://nodejs.org/en/download/).

Clone the repo and create a new branch with you handle, make a tiny change, commit and push. For example, for me it would be:

```shell
git clone git@github.com:AlexJeffcott/musical-adventure.git
cd musical-adventure
git checkout -b ajt
npm i
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

You can also run tests in 'watch mode' with `npm start`.

If you want to see what you compiled Javascript would look like, run `npm run build` and take a look in the `build` folder.

## Contributing
If you want to open a pr to improve the base setup, or if you have a suggestion for a new task, pull requests are welcome.

If you find a bug etc in the tests, or want to improve the task descriptions etc please [open an issue](https://github.com/AlexJeffcott/musical-adventure/issues).
