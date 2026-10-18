# Vanilla JS Stopwatch

A minimal stopwatch built with pure HTML, CSS, and JavaScript. It shows time down to hundredths of a second and a circular progress ring that completes one lap every 60 seconds.

## Features

- Start, pause, resume, and reset
- Precise time display in `HH:MM:SS.ms` format
- Circular progress ring built with CSS `conic-gradient`
- Accurate timing based on `Date.now()`, so pausing and resuming never drifts
- Smart button states (Pause and Reset are disabled when they have no effect)
- Dark theme with soft pink accents
- Responsive layout with keyboard focus styles and reduced-motion support
- No dependencies, no build step

## Getting Started

```bash
git clone https://github.com/Naznighty/my-roadmap.git
cd my-roadmap
```

Open `index.html` in your browser. That's it.

## Project Structure

```
├── index.html   # Markup
├── style.css    # Styling and ring animation
└── script.js    # Timer logic
```

## How It Works

- `setInterval` updates the display every 10 ms.
- Elapsed time is calculated as `Date.now() - startTime`, so it stays accurate even if the browser throttles the interval.
- The ring's fill is driven by a CSS variable (`--p`) that JavaScript updates on every tick.

## Built With

HTML5 · CSS3 · JavaScript (ES6)

## Author

**Nazanin Rahgozar** — [@Naznighty](https://github.com/Naznighty)
# vanilla-js-stopwatch
