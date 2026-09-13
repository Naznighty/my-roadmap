const slidesEl = document.getElementById("slides");
const dotsEl = document.getElementById("dots");
const sliderEl = document.getElementById("slider");
const total = slidesEl.children.length;

let current = 0;
let timer = null;
const AUTOPLAY_DELAY = 5000;

for (let i = 0; i < total; i++) {
  const dot = document.createElement("button");
  dot.className = "dot" + (i === 0 ? " active" : "");
  dot.addEventListener("click", () => goTo(i));
  dotsEl.appendChild(dot);
}

function render() {
  slidesEl.style.transform = `translateX(${current * 100}%)`;
  [...dotsEl.children].forEach((d, i) =>
    d.classList.toggle("active", i === current),
  );
}

function goTo(index) {
  current = (index + total) % total;
  render();
  resetTimer();
}

function next() {
  goTo(current + 1);
}
function prev() {
  goTo(current - 1);
}

function startTimer() {
  timer = setInterval(next, AUTOPLAY_DELAY);
}
function resetTimer() {
  clearInterval(timer);
  startTimer();
}

document.getElementById("nextBtn").addEventListener("click", next);
document.getElementById("prevBtn").addEventListener("click", prev);

sliderEl.addEventListener("mouseenter", () => clearInterval(timer));
sliderEl.addEventListener("mouseleave", startTimer);

render();
startTimer();
