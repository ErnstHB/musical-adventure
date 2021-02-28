// MAZE BUILDER START
class MazeBuilder {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.cols = 2 * this.width + 1;
    this.rows = 2 * this.height + 1;

    this.maze = this.initArray([]);

    // place initial walls
    this.maze.forEach((row, r) => {
      row.forEach((cell, c) => {
        switch (r) {
          case 0:
          case this.rows - 1:
            this.maze[r][c] = ["wall"];
            break;

          default:
            if (r % 2 == 1) {
              if (c == 0 || c == this.cols - 1) {
                this.maze[r][c] = ["wall"];
              }
            } else if (c % 2 == 0) {
              this.maze[r][c] = ["wall"];
            }
        }
      });

      if (r == 0) {
        // place exit in top row
        const doorPos = this.posToSpace(this.rand(1, this.width));
        this.maze[r][doorPos] = ["door", "exit"];
      }

      if (r == this.rows - 1) {
        // place entrance in bottom row
        const doorPos = this.posToSpace(this.rand(1, this.width));
        this.maze[r][doorPos] = ["door", "entrance"];
      }
    });

    // start partitioning
    this.partition(1, this.height - 1, 1, this.width - 1);
  }

  initArray(value) {
    return new Array(this.rows)
      .fill()
      .map(() => new Array(this.cols).fill(value));
  }

  rand(min, max) {
    return min + Math.floor(Math.random() * (1 + max - min));
  }

  posToSpace(x) {
    return 2 * (x - 1) + 1;
  }

  posToWall(x) {
    return 2 * x;
  }

  inBounds(r, c) {
    if (
      typeof this.maze[r] == "undefined" ||
      typeof this.maze[r][c] == "undefined"
    ) {
      return false; // out of bounds
    }
    return true;
  }

  shuffle(array) {
    // sauce: https://stackoverflow.com/a/12646864
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  partition(r1, r2, c1, c2) {
    // create partition walls
    // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

    let horiz, vert, x, y, start, end;

    if (r2 < r1 || c2 < c1) {
      return false;
    }

    if (r1 == r2) {
      horiz = r1;
    } else {
      x = r1 + 1;
      y = r2 - 1;
      start = Math.round(x + (y - x) / 4);
      end = Math.round(x + (3 * (y - x)) / 4);
      horiz = this.rand(start, end);
    }

    if (c1 == c2) {
      vert = c1;
    } else {
      x = c1 + 1;
      y = c2 - 1;
      start = Math.round(x + (y - x) / 3);
      end = Math.round(x + (2 * (y - x)) / 3);
      vert = this.rand(start, end);
    }

    for (let i = this.posToWall(r1) - 1; i <= this.posToWall(r2) + 1; i++) {
      for (let j = this.posToWall(c1) - 1; j <= this.posToWall(c2) + 1; j++) {
        if (i == this.posToWall(horiz) || j == this.posToWall(vert)) {
          this.maze[i][j] = ["wall"];
        }
      }
    }

    const gaps = this.shuffle([true, true, true, false]);

    // create gaps in partition walls

    if (gaps[0]) {
      const gapPosition = this.rand(c1, vert);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
    }

    if (gaps[1]) {
      const gapPosition = this.rand(vert + 1, c2 + 1);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
    }

    if (gaps[2]) {
      const gapPosition = this.rand(r1, horiz);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
    }

    if (gaps[3]) {
      const gapPosition = this.rand(horiz + 1, r2 + 1);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
    }

    // recursively partition newly created chambers

    this.partition(r1, horiz - 1, c1, vert - 1);
    this.partition(horiz + 1, r2, c1, vert - 1);
    this.partition(r1, horiz - 1, vert + 1, c2);
    this.partition(horiz + 1, r2, vert + 1, c2);
  }

  isGap(...cells) {
    return cells.every((array) => {
      let row, col;
      [row, col] = array;
      if (this.maze[row][col].length > 0) {
        if (!this.maze[row][col].includes("door")) {
          return false;
        }
      }
      return true;
    });
  }

  countSteps(array, r, c, val, stop) {
    if (!this.inBounds(r, c)) {
      return false; // out of bounds
    }

    if (array[r][c] <= val) {
      return false; // shorter route already mapped
    }

    if (!this.isGap([r, c])) {
      return false; // not traversable
    }

    array[r][c] = val;

    if (this.maze[r][c].includes(stop)) {
      return true; // reached destination
    }

    this.countSteps(array, r - 1, c, val + 1, stop);
    this.countSteps(array, r, c + 1, val + 1, stop);
    this.countSteps(array, r + 1, c, val + 1, stop);
    this.countSteps(array, r, c - 1, val + 1, stop);
  }

  getKeyLocation() {
    const fromEntrance = this.initArray();
    const fromExit = this.initArray();

    this.totalSteps = -1;

    for (let j = 1; j < this.cols - 1; j++) {
      if (this.maze[this.rows - 1][j].includes("entrance")) {
        this.countSteps(fromEntrance, this.rows - 1, j, 0, "exit");
      }
      if (this.maze[0][j].includes("exit")) {
        this.countSteps(fromExit, 0, j, 0, "entrance");
      }
    }

    let fc = -1,
      fr = -1;

    this.maze.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (typeof fromEntrance[r][c] == "undefined") {
          return;
        }
        const stepCount = fromEntrance[r][c] + fromExit[r][c];
        if (stepCount > this.totalSteps) {
          fr = r;
          fc = c;
          this.totalSteps = stepCount;
        }
      });
    });

    return [fr, fc];
  }

  placeKey() {
    let fr, fc;
    [fr, fc] = this.getKeyLocation();

    this.maze[fr][fc] = ["key"];
  }

  display(id) {
    this.parentDiv = document.getElementById(id);

    this.parentDiv.style.position = "relative";
    this.parentDiv.style.display = "inline-block";

    if (!this.parentDiv) {
      alert('Cannot initialise maze - no element found with id "' + id + '"');
      return false;
    }

    while (this.parentDiv.firstChild) {
      this.parentDiv.removeChild(this.parentDiv.firstChild);
    }

    const container = document.createElement("div");
    container.id = "maze";
    container.dataset.steps = this.totalSteps;

    this.maze.forEach((row) => {
      const rowDiv = document.createElement("div");
      row.forEach((cell) => {
        const cellDiv = document.createElement("div");
        if (cell) {
          cellDiv.className = cell.join(" ");
        }
        rowDiv.appendChild(cellDiv);
      });
      container.appendChild(rowDiv);
    });

    this.parentDiv.appendChild(container);

    return true;
  }
}

// MAZE BUILDER END

// EXTENDED MAZE BUILDER START
class FancyMazeBuilder extends MazeBuilder {
  constructor(width, height) {
    super(width, height);

    this.removeNubbins();
    this.joinNubbins();
    this.placeSentinels(100);
    this.placeKey();
  }

  isA(value, ...cells) {
    return cells.every((array) => {
      let row, col;
      [row, col] = array;
      if (
        this.maze[row][col].length == 0 ||
        !this.maze[row][col].includes(value)
      ) {
        return false;
      }
      return true;
    });
  }

  removeNubbins() {
    this.maze.slice(2, -2).forEach((row, idx) => {
      let r = idx + 2;

      row.slice(2, -2).forEach((cell, idx) => {
        let c = idx + 2;

        if (!this.isA("wall", [r, c])) {
          return;
        }

        if (
          this.isA(
            "wall",
            [r - 1, c - 1],
            [r - 1, c],
            [r - 1, c + 1],
            [r + 1, c]
          ) &&
          this.isGap([r + 1, c - 1], [r + 1, c + 1], [r + 2, c])
        ) {
          this.maze[r][c] = [];
          this.maze[r + 1][c] = ["nubbin"];
        }

        if (
          this.isA(
            "wall",
            [r - 1, c + 1],
            [r, c - 1],
            [r, c + 1],
            [r + 1, c + 1]
          ) &&
          this.isGap([r - 1, c - 1], [r, c - 2], [r + 1, c - 1])
        ) {
          this.maze[r][c] = [];
          this.maze[r][c - 1] = ["nubbin"];
        }

        if (
          this.isA(
            "wall",
            [r - 1, c - 1],
            [r, c - 1],
            [r + 1, c - 1],
            [r, c + 1]
          ) &&
          this.isGap([r - 1, c + 1], [r, c + 2], [r + 1, c + 1])
        ) {
          this.maze[r][c] = [];
          this.maze[r][c + 1] = ["nubbin"];
        }

        if (
          this.isA(
            "wall",
            [r - 1, c],
            [r + 1, c - 1],
            [r + 1, c],
            [r + 1, c + 1]
          ) &&
          this.isGap([r - 1, c - 1], [r - 2, c], [r - 1, c + 1])
        ) {
          this.maze[r][c] = [];
          this.maze[r - 1][c] = ["nubbin"];
        }
      });
    });
  }

  joinNubbins() {
    this.maze.slice(2, -2).forEach((row, idx) => {
      let r = idx + 2;

      row.slice(2, -2).forEach((cell, idx) => {
        let c = idx + 2;

        if (!this.isA("nubbin", [r, c])) {
          return;
        }

        if (this.isA("nubbin", [r - 2, c])) {
          this.maze[r - 2][c].push("wall");
          this.maze[r - 1][c] = ["nubbin", "wall"];
          this.maze[r][c].push("wall");
        }

        if (this.isA("nubbin", [r, c - 2])) {
          this.maze[r][c - 2].push("wall");
          this.maze[r][c - 1] = ["nubbin", "wall"];
          this.maze[r][c].push("wall");
        }
      });
    });
  }

  placeSentinels(percent = 100) {
    percent = parseInt(percent, 10);

    if (percent < 1 || percent > 100) {
      percent = 100;
    }

    this.maze.slice(1, -1).forEach((row, idx) => {
      let r = idx + 1;

      row.slice(1, -1).forEach((cell, idx) => {
        let c = idx + 1;

        if (!this.isA("wall", [r, c])) {
          return;
        }

        if (this.rand(1, 100) > percent) {
          return;
        }

        if (
          this.isA(
            "wall",
            [r - 1, c - 1],
            [r - 1, c],
            [r - 1, c + 1],
            [r + 1, c - 1],
            [r + 1, c],
            [r + 1, c + 1]
          )
        ) {
          this.maze[r][c].push("sentinel");
        }

        if (
          this.isA(
            "wall",
            [r - 1, c - 1],
            [r, c - 1],
            [r + 1, c - 1],
            [r - 1, c + 1],
            [r, c + 1],
            [r + 1, c + 1]
          )
        ) {
          this.maze[r][c].push("sentinel");
        }
      });
    });
  }

  placeKey() {
    let fr, fc;
    [fr, fc] = this.getKeyLocation();

    if (
      this.isA("nubbin", [fr - 1, fc - 1]) &&
      !this.isA("wall", [fr - 1, fc - 1])
    ) {
      this.maze[fr - 1][fc - 1] = ["key"];
    } else if (
      this.isA("nubbin", [fr - 1, fc + 1]) &&
      !this.isA("wall", [fr - 1, fc + 1])
    ) {
      this.maze[fr - 1][fc + 1] = ["key"];
    } else if (
      this.isA("nubbin", [fr + 1, fc - 1]) &&
      !this.isA("wall", [fr + 1, fc - 1])
    ) {
      this.maze[fr + 1][fc - 1] = ["key"];
    } else if (
      this.isA("nubbin", [fr + 1, fc + 1]) &&
      !this.isA("wall", [fr + 1, fc + 1])
    ) {
      this.maze[fr + 1][fc + 1] = ["key"];
    } else {
      this.maze[fr][fc] = ["key"];
    }
  }
}

// EXTENDED MAZE BUILDER END

// PLAYER START
function Position(x, y) {
  this.x = x;
  this.y = y;
}

Position.prototype.toString = function () {
  return this.x + ":" + this.y;
};

function Mazing(id) {
  // bind to HTML element
  this.mazeContainer = document.getElementById(id);

  this.mazeScore = document.createElement("div");
  this.mazeScore.id = "maze_score";

  this.mazeMessage = document.createElement("div");
  this.mazeMessage.id = "maze_message";

  this.heroScore = this.mazeContainer.getAttribute("data-steps") - 2;

  this.maze = [];
  this.heroPos = {};
  this.heroHasKey = false;
  this.childMode = false;

  this.utter = null;

  for (i = 0; i < this.mazeContainer.children.length; i++) {
    for (j = 0; j < this.mazeContainer.children[i].children.length; j++) {
      var el = this.mazeContainer.children[i].children[j];
      this.maze[new Position(i, j)] = el;
      if (el.classList.contains("entrance")) {
        // place hero at entrance
        this.heroPos = new Position(i, j);
        this.maze[this.heroPos].classList.add("hero");
      }
    }
  }

  var mazeOutputDiv = document.createElement("div");
  mazeOutputDiv.id = "maze_output";

  mazeOutputDiv.appendChild(this.mazeScore);
  mazeOutputDiv.appendChild(this.mazeMessage);

  mazeOutputDiv.style.width = this.mazeContainer.scrollWidth + "px";
  this.setMessage("first find the key");

  this.mazeContainer.insertAdjacentElement("afterend", mazeOutputDiv);

  // activate control keys
  this.keyPressHandler = this.mazeKeyPressHandler.bind(this);
  document.addEventListener("keydown", this.keyPressHandler, false);
}

Mazing.prototype.enableSpeech = function () {
  this.utter = new SpeechSynthesisUtterance();
  this.setMessage(this.mazeMessage.innerText);
};

Mazing.prototype.setMessage = function (text) {
  this.mazeMessage.innerHTML = text;
  this.mazeScore.innerHTML = this.heroScore;
  if (this.utter) {
    this.utter.text = text;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(this.utter);
  }
};

Mazing.prototype.heroTakeTreasure = function () {
  this.maze[this.heroPos].classList.remove("nubbin");
  this.heroScore += 10;
  this.setMessage("yay, treasure!");
};

Mazing.prototype.heroTakeKey = function () {
  this.maze[this.heroPos].classList.remove("key");
  this.heroHasKey = true;
  this.heroScore += 20;
  this.mazeScore.classList.add("has-key");
  this.setMessage("you now have the key!");
};

Mazing.prototype.gameOver = function (text) {
  // de-activate control keys
  document.removeEventListener("keydown", this.keyPressHandler, false);
  this.setMessage(text);
  this.mazeContainer.classList.add("finished");
};

Mazing.prototype.heroWins = function () {
  this.mazeScore.classList.remove("has-key");
  this.maze[this.heroPos].classList.remove("door");
  this.heroScore += 50;
  this.gameOver("you finished !!!");
};

Mazing.prototype.tryMoveHero = function (pos) {
  if ("object" !== typeof this.maze[pos]) {
    return;
  }

  var nextStep = this.maze[pos].className;

  // before moving
  if (nextStep.match(/sentinel/)) {
    this.heroScore = Math.max(this.heroScore - 5, 0);
    if (!this.childMode && this.heroScore <= 0) {
      this.gameOver("sorry, you didn't make it");
    } else {
      this.setMessage("ow, that hurt!");
    }
    return;
  }
  if (nextStep.match(/wall/)) {
    return;
  }
  if (nextStep.match(/exit/)) {
    if (this.heroHasKey) {
      this.heroWins();
    } else {
      this.setMessage("you need a key to unlock the door");
      return;
    }
  }

  // move hero one step
  this.maze[this.heroPos].classList.remove("hero");
  this.maze[pos].classList.add("hero");
  this.heroPos = pos;

  // after moving
  if (nextStep.match(/nubbin/)) {
    this.heroTakeTreasure();
    return;
  }
  if (nextStep.match(/key/)) {
    this.heroTakeKey();
    return;
  }
  if (nextStep.match(/exit/)) {
    return;
  }
  if (this.heroScore >= 1) {
    if (!this.childMode) {
      this.heroScore--;
    }
    if (!this.childMode && this.heroScore <= 0) {
      this.gameOver("sorry, you didn't make it");
    } else {
      this.setMessage("...");
    }
  }
};

Mazing.prototype.mazeKeyPressHandler = function (e) {
  var tryPos = new Position(this.heroPos.x, this.heroPos.y);
  switch (e.keyCode) {
    case 37: // left
      this.mazeContainer.classList.remove("face-right");
      tryPos.y--;
      break;

    case 38: // up
      tryPos.x--;
      break;

    case 39: // right
      this.mazeContainer.classList.add("face-right");
      tryPos.y++;
      break;

    case 40: // down
      tryPos.x++;
      break;

    default:
      return;
  }
  this.tryMoveHero(tryPos);
  e.preventDefault();
};

Mazing.prototype.setChildMode = function () {
  this.childMode = true;
  this.heroScore = 0;
  this.setMessage("collect all the treasure");
};
// PLAYER END

// INIT
const initMaze = (id, width, height, speech = false) => {
  const maze = new FancyMazeBuilder(width, height);
  maze.display(id);
  const mazeGame = new Mazing("maze");
  if (speech) mazeGame.enableSpeech();

  return { mazeGame, maze };
};
