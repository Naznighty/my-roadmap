const MAX_ATTEMPTS = 5;

let secret = 0;
let attempts = 0;
let finished = false;

const startSection = document.querySelector(".start");
const homeSection = document.querySelector(".home");
const input = document.getElementById("number");
const goBtn = document.getElementById("goBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");

function newGame() {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  finished = false;
  input.value = "";
  input.disabled = false;
  goBtn.disabled = false;
  restartBtn.classList.add("hidden");
  setMessage("");
  updateAttempts();
  input.focus();
}

function updateAttempts() {
  attemptsEl.textContent = `Attempt ${Math.min(attempts + 1, MAX_ATTEMPTS)} of ${MAX_ATTEMPTS}`;
}

function setMessage(text, type = "") {
  message.textContent = text;
  message.className = type;
}

function endGame(won) {
  finished = true;
  input.disabled = true;
  goBtn.disabled = true;
  restartBtn.classList.remove("hidden");
  setMessage(
    won
      ? `You win! It was ${secret} 🎉`
      : `You lose! The number was ${secret}.`,
    won ? "win" : "lose",
  );
}

function guess() {
  if (finished) return;
  const value = Number(input.value);

  if (!Number.isInteger(value) || value < 1 || value > 100) {
    setMessage("Enter a whole number from 1 to 100.");
    return;
  }

  attempts++;

  if (value === secret) return endGame(true);
  if (attempts === MAX_ATTEMPTS) return endGame(false);

  setMessage(value < secret ? `Higher than ${value}` : `Lower than ${value}`);
  updateAttempts();
  input.value = "";
  input.focus();
}

document.getElementById("startBtn").addEventListener("click", () => {
  startSection.classList.add("hidden");
  homeSection.classList.remove("hidden");
  newGame();
});
goBtn.addEventListener("click", guess);
input.addEventListener("keydown", (e) => e.key === "Enter" && guess());
restartBtn.addEventListener("click", newGame);
