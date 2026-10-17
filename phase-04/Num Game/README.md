# Number Guessing Game

A browser-based number guessing game built with vanilla HTML, CSS, and JavaScript. Guess the secret number between 1 and 100 in 5 attempts, with a "higher" or "lower" hint after every guess.

## How to play

1. Click **START**.
2. Enter a number from 1 to 100 and press **Go** (or hit Enter).
3. After each guess, you get a hint: higher or lower.
4. Find the number within 5 attempts to win. Guess right earlier and the game ends immediately.
5. Click **Play again** to start a new round.

## Features

- Random secret number generated every round
- Up to 5 attempts with a live attempt counter
- Progressive hints after each guess
- Instant win when the guess is correct, loss after the 5th wrong guess
- Input validation (whole numbers from 1 to 100 only)
- Animated gradient title and a framed card layout
- Responsive, keyboard-friendly, respects reduced-motion settings

## Tech stack

- HTML5
- CSS3 (animations, gradients)
- JavaScript (ES6, DOM manipulation, state management)

## Project structure

```
.
├── index.html   # markup
├── style.css    # styling and animations
└── script.js    # game logic and state
```

## Run locally

```bash
git clone https://github.com/Naznighty/number-guessing-game.git
cd number-guessing-game
```

Then open `index.html` in your browser. No build step or dependencies needed.

## Author

Nazanin Rahgozar - [GitHub](https://github.com/Naznighty)
