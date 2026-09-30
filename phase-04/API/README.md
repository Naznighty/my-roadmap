<h1 align="center">🌌 NASA API Explorer</h1>

<p align="center">
  A black-and-gold space dashboard that brings real NASA data into one clean page:<br>
  today's sky, nearby asteroids, photos of Mars and live views of Earth.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/NASA-Open%20APIs-0B3D91" alt="NASA Open APIs">
</p>

<p align="center">
  <img src="assets/screenshot.png" alt="NASA API Explorer screenshot" width="800">
</p>

<p align="center">
  <a href="https://naznighty.github.io/nasa-api-explorer/"><b>Live Demo</b></a>
</p>

## About

NASA API Explorer is a single-page web app built with **vanilla HTML, CSS and JavaScript**, with no frameworks and no build step. It combines several of NASA's free public APIs into one dark, gold-accented interface, so you can browse space data without visiting five different sites.

The project focuses on the fundamentals of working with real-world APIs: asynchronous `fetch` calls, handling loading, empty and error states, rendering data dynamically, and building a layout that works on both phones and desktops.

## Features

- **Astronomy Picture of the Day:** today's image or video with its full explanation
- **Near-Earth asteroids:** diameter, speed and miss distance, with potentially hazardous objects highlighted in red
- **Mars photos:** real images of the Martian surface from the Perseverance rover
- **Earth from space:** the latest natural-color images of Earth from NASA's EPIC camera
- **Image search:** look up anything in NASA's public image archive by keyword
- **Reliable data loading:** every section shows loading, empty and error states, and requests time out after 10 seconds
- **Responsive design:** fixed header with smooth-scroll navigation and a hamburger menu on small screens

## APIs

| Section | API | Key required |
| --- | --- | --- |
| Home | [APOD](https://api.nasa.gov) | Yes |
| Asteroids | [NeoWs](https://api.nasa.gov) | Yes |
| Earth | [EPIC](https://api.nasa.gov) | Yes |
| Mars, Gallery | [NASA Image and Video Library](https://images.nasa.gov) | No |

> NASA has archived the Mars Rover Photos API, so the Mars section uses the Image and Video Library instead.

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/Naznighty/nasa-api-explorer.git
cd nasa-api-explorer
```

**2. Add your API key**

Get a free key at [api.nasa.gov](https://api.nasa.gov) and set it at the top of `script.js`:

```js
const KEY = "YOUR_API_KEY";
```

The default `DEMO_KEY` works for testing but has a low request limit.

**3. Run it**

Open `index.html` in your browser, or use the Live Server extension in VS Code.

## Project Structure

```
nasa-api-explorer/
├── index.html    # page structure
├── style.css     # black and gold theme, responsive layout
├── script.js     # API calls, rendering, mobile menu
└── assets/       # screenshots
```

## How It Works

A single `load()` helper in `script.js` fetches a URL, converts the response into cards and handles the empty and error states. Each section of the page is just one call to this helper, which keeps the code short and easy to extend with a new API.

## Author

**Nazanin Rahgozar**
[GitHub](https://github.com/Naznighty) · [LinkedIn](https://www.linkedin.com/in/nazanin-rahgozar-7b816b42b/)

## Acknowledgements

All data is provided by [NASA Open APIs](https://api.nasa.gov).
