let timerInterval = null;
let elapsedTime = 0;

const ring = document.getElementById("ring");
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  const pad = (num) => String(num).padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
  const deg = ((elapsedTime % 60000) / 60000) * 360;
  ring.style.setProperty("--p", deg + "deg");
}

function startTimer() {
  if (timerInterval) return;
  const startTime = Date.now() - elapsedTime;

  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
  }, 10);

  startBtn.disabled = true;
  pauseBtn.disabled = false;
  resetBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;

  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;

  updateDisplay();

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
