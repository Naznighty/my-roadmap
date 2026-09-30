const KEY = "KUbQoCrN85aHaZJEY8n7fPDDJyj6lGpLRaXfBD2j";
const API = "https://api.nasa.gov";
const LIBRARY = "https://images-api.nasa.gov/search?media_type=image&q=";
const $ = (id) => document.getElementById(id);

async function load(id, url, getItems, card) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(res.status);
    const items = getItems(await res.json());
    $(id).innerHTML = items.length
      ? items.map(card).join("")
      : "Nothing found.";
  } catch {
    $(id).innerHTML =
      '<p class="error">Could not load data. Try again later.</p>';
  }
}

const apodCard = (d) => `
  ${
    d.media_type === "video"
      ? `<iframe src="${d.url}" allowfullscreen></iframe>`
      : `<img src="${d.url}" alt="${d.title}">`
  }
  <div class="text"><h3>${d.title}</h3><p>${d.explanation}</p></div>`;

const neoCard = (a) => {
  const c = a.close_approach_data[0];
  return `<div class="item ${a.is_potentially_hazardous_asteroid ? "danger" : ""}"><div class="info">
    <b>${a.name}</b>
    <span>Diameter: ${Math.round(a.estimated_diameter.meters.estimated_diameter_max)} m</span>
    <span>Speed: ${Math.round(c.relative_velocity.kilometers_per_second)} km/s</span>
    <span>Miss distance: ${Math.round(c.miss_distance.kilometers).toLocaleString()} km</span>
    <span>${a.is_potentially_hazardous_asteroid ? "Potentially hazardous" : "Not hazardous"}</span>
  </div></div>`;
};

const epicCard = (e) => {
  const [y, m, d] = e.date.split(" ")[0].split("-");
  const src = `${API}/EPIC/archive/natural/${y}/${m}/${d}/png/${e.image}.png?api_key=${KEY}`;
  return `<div class="item"><img src="${src}" alt="Earth" loading="lazy">
    <div class="info"><span>${e.date}</span></div></div>`;
};

const imageCard = (
  i,
) => `<div class="item"><img src="${i.links[0].href}" alt="" loading="lazy">
  <div class="info"><b>${i.data[0].title}</b></div></div>`;

const libraryItems = (d) => d.collection.items.slice(0, 12);

const today = new Date().toISOString().slice(0, 10);

load("apod", `${API}/planetary/apod?api_key=${KEY}`, (d) => [d], apodCard);

load(
  "neo",
  `${API}/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${KEY}`,
  (d) => (Object.values(d.near_earth_objects)[0] || []).slice(0, 12),
  neoCard,
);

load(
  "epic",
  `${API}/EPIC/api/natural?api_key=${KEY}`,
  (d) => d.slice(0, 8),
  epicCard,
);

load(
  "marsPhotos",
  LIBRARY + "perseverance mars surface",
  libraryItems,
  imageCard,
);

function search(q) {
  if (!q) return;
  $("results").textContent = "Loading...";
  load("results", LIBRARY + encodeURIComponent(q), libraryItems, imageCard);
}

$("searchForm").addEventListener("submit", (e) => {
  e.preventDefault();
  search($("q").value.trim());
});

search("nebula");

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

function setMenu(open) {
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.innerHTML = `<i class="fa-solid ${open ? "fa-xmark" : "fa-bars"}"></i>`;
}

menuBtn.addEventListener("click", () =>
  setMenu(!nav.classList.contains("open")),
);
nav.addEventListener(
  "click",
  (e) => e.target.tagName === "A" && setMenu(false),
);
