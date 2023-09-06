const board = document.getElementById("board");
const resetButton = (document.getElementById("resetButton").onclick =
  resetGame);
const rows = 11;
const columns = 11;
let minesCount = 30;
let mines = [];


function initializeBoard() {
  for (let i = 1; i <= rows; i++) {
    const row = document.createElement("div");
    row.className = "row";
    row.dataset.type = "row";
    for (let j = 1; j <= columns; j++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.id = `${i}-${j}`;
      cell.dataset.type = "cell";
      cell.onclick = handleCellClick;
      cell.oncontextmenu = handleCellflag;
      row.append(cell);
    }
    board.append(row);
  }
}

function setMines() {
  for (let i = 0; i < minesCount; i++) {
    const row = Math.floor(Math.random() * rows) + 1;
    const col = Math.floor(Math.random() * columns) + 1;
    if (!mines.includes(`${row}-${col}`)) {
      mines.push(`${row}-${col}`);
    } else {
      i--;
    }
  }
}

function handleCellClick() {
  this.className.includes("setFlag") ? this.classList.remove("setFlag") : null;
    const cellLocation = this.id;
    if (mines.includes(cellLocation)) {
      revealAllMines();
    } else {
      this.classList.add("cellClicked");
      for (let i = 0; i < 15 ;i++) {
        console.log(mines[i]);
      }
      
      endGame()
      const nearbyMines = countMinesNearby(this, cellLocation);
      // if (nearbyMines === 0) {
      //   openEmptyCells(this, cellLocation);
      // }
    }
}
function countMinesNearby(element, cellLocation) {
  let countMinesNearby = 0;
  const [row, col] = cellLocation.split("-").map(Number);
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const [dx, dy] of directions) {
    const adjacentRow = row + dx;
    const adjacentCol = col + dy;

    if (
      adjacentRow >= 1 &&
      adjacentRow <= rows &&
      adjacentCol >= 1 &&
      adjacentCol <= columns
    ) {
      const adjacentCell = document.getElementById(
        `${adjacentRow}-${adjacentCol}`
      ).id;
      if (mines.includes(adjacentCell)) {
        countMinesNearby++;
      }
    }
  }

  element.innerHTML = countMinesNearby == 0 ? "" : countMinesNearby;
  return countMinesNearby;
}

function openEmptyCells(element, cellLocation) {
  const [row, col] = cellLocation.split("-").map(Number);
  const visited = new Set();


  function explore(row, col) {
    if (row < 1 || row > rows || col < 1 || col > columns) {
      return;
    }

    const currentCell = document.getElementById(`${row}-${col}`);
    const currentCellLocation = `${row}-${col}`;

    if (!visited.has(currentCellLocation)) {
      visited.add(currentCellLocation);

      if (!mines.includes(currentCellLocation)) {
        currentCell.classList.add("cellClicked");
        const nearbyMines = countMinesNearby(currentCell, currentCellLocation);

        if (nearbyMines === 0) {
          const directions = [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ];

          for (const [dx, dy] of directions) {
            explore(row + dx, col + dy);
          }
        }
      }
    }
  }

  explore(row, col);
}

function revealAllMines() {
  for (let i = 0; i < mines.length; i++) {
    const mineCell = document.getElementById(mines[i]);
    mineCell.classList.add("cellMines");
    mineCell.innerText = "💣";
  }
  board.style.pointerEvents = "none";
}

function handleCellflag(e) {
  e.preventDefault();
  if (
    !this.className.includes("cellClicked") &&
    !this.className.includes("cellMines")
  ) {
    this.classList.toggle("setFlag");
  }
}

function resetGame() {
  openedCount = 0;
  board.innerHTML = "";
  board.style.pointerEvents = "auto";
  mines = [];
  setMines();
  initializeBoard();
}

function endGame() {
  let numClick = rows * columns - minesCount;
  let openedCount = 0;
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      const cell = document.getElementById(`${i}-${j}`);
      if (cell.classList.contains("cellClicked")) {
        openedCount++;
      }
    }
  }

  if (openedCount === numClick) {
    popup.style.display = 'flex';
  }
}


setMines();
initializeBoard();