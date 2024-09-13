import winning from "./winning";

// DOM Elements
const headingEl = document.querySelector(".heading");
const currPlayerEl = document.querySelector(".current-player");
const boxesEl = document.querySelectorAll(".box");
const resetBtnEl = document.querySelector(".reset-btn");

// Game Variables
const players = ["O", "X"];
let currPlayer;
let gameGrid; // Virtual Game Grid

// Functions
function randomPlayer() {
  const newPlayer = Math.floor(Math.random() * 2);
  currPlayer = players[newPlayer];
}

function swapPlayer() {
  const newPlayer = currPlayer === players[0] ? players[1] : players[0];
  currPlayer = newPlayer;
}

function startGame() {
  // gameGrid insert 9 empty strings
  gameGrid = new Array(9).fill("");
  // hide reset button
  resetBtnEl.classList.remove("active");
  // generate random player
  randomPlayer();
  // show random player in current player
  currPlayerEl.textContent = currPlayer;
}

startGame();

function checkWinner() {
  winning.forEach((chance) => {
    const [c1, c2, c3] = chance;

    if (
      gameGrid[c1] &&
      gameGrid[c2] &&
      gameGrid[c3] &&
      gameGrid[c1] === gameGrid[c2] &&
      gameGrid[c2] === gameGrid[c3]
    ) {
      // show the win player in heading & current-player
      headingEl.textContent = `${gameGrid[c1]} Won!`;
      currPlayerEl.textContent = `${gameGrid[c1]} Won!`;

      // prevent clicking
      boxesEl.forEach((box) => (box.style.pointerEvents = "none"));

      // show new game button
      resetBtnEl.classList.add("active");

      // add .green class
      boxesEl[c1].classList.add("green");
      boxesEl[c2].classList.add("green");
      boxesEl[c3].classList.add("green");
    }
  });

  const x = gameGrid.every((el) => el !== "");

  if (x && !headingEl.textContent.includes("W")) {
    headingEl.textContent = "Draw hua hai";
    resetBtnEl.classList.add("active");
  }
}

function handleClick(index) {
  // Only if the current box is empty
  if (gameGrid[index] === "") {
    // Update player in DOM and remove hover hand
    boxesEl[index].textContent = currPlayer;
    boxesEl[index].style.pointerEvents = "none";

    // Update virtual grid
    gameGrid[index] = currPlayer;

    // Swap player & Update on UI
    swapPlayer();
    currPlayerEl.textContent = currPlayer;

    // Check player winning status
    checkWinner();
  }
}

boxesEl.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// Reset Button
resetBtnEl.addEventListener("click", () => {
  startGame();

  headingEl.textContent = "Noughts & Crosses";

  boxesEl.forEach((box) => {
    box.classList.remove("green");
    box.textContent = "";
    box.style.pointerEvents = "auto";
  });
});
