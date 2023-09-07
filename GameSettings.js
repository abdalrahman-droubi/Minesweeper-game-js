const modal = document.getElementById("settingsModal");
const settingsIcon = document.getElementById("settingsIcon");
const closeModal = document.getElementById("closeModal");
const startGameButton = document.getElementById("settingsModal");

settingsIcon.addEventListener("click", function () {
  modal.style.display = "block";
});

closeModal.addEventListener("click", function () {
  modal.style.display = "none";
});

startGameButton.addEventListener("submit", function (e) {
  e.preventDefault();
  rows = +e.target.rows.value;
  columns = +e.target.columns.value;
  if (e.target.mines.value <= rows * columns) {
    minesCount = +e.target.mines.value;
  } else {
    minesCount = rows * columns;
  }

  resetGame();
  modal.style.display = "none";
});
