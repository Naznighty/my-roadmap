const navToggle = document.getElementById("navToggle");
const navbar = document.getElementById("navbar");

navToggle.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll("#navbar a:not(.dropdown-toggle)").forEach((a) => {
  a.addEventListener("click", () => navbar.classList.remove("open"));
});

const dropdown = document.querySelector(".dropdown");

dropdown.querySelector(".dropdown-toggle").addEventListener("click", (e) => {
  e.preventDefault();
  dropdown.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) dropdown.classList.remove("open");
});

const filterBtns = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product");

function applyFilter(cat) {
  filterBtns.forEach((b) =>
    b.classList.toggle("active", b.dataset.filter === cat),
  );
  products.forEach((p) => {
    p.hidden = cat !== "all" && p.dataset.category !== cat;
  });
}

filterBtns.forEach((b) =>
  b.addEventListener("click", () => applyFilter(b.dataset.filter)),
);

document.querySelectorAll(".dropdown-menu a, .shop-link").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    applyFilter(a.getAttribute("href").slice(1));
    dropdown.classList.remove("open");
    document
      .getElementById("categories")
      .scrollIntoView({ behavior: "smooth" });
  });
});

const searchForm = document.querySelector(".search");
const searchInput = searchForm.querySelector("input");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  runSearch();
});

searchInput.addEventListener("input", () => {
  runSearch();
});

function runSearch() {
  const term = searchInput.value.trim().toLowerCase();

  if (term === "") {
    applyFilter("all");
    return;
  }

  filterBtns.forEach((b) => b.classList.remove("active"));

  let hasMatch = false;
  products.forEach((p) => {
    const name = p.querySelector("h3").textContent.toLowerCase();
    const matches = name.includes(term);
    p.hidden = !matches;
    if (matches) hasMatch = true;
  });

  document.getElementById("categories").scrollIntoView({ behavior: "smooth" });
}

const galleryGrid = document.querySelector(".gallery-grid");

function layoutMasonry() {
  if (!galleryGrid) return;
  const rowHeight = 8;
  const gap = 16;
  galleryGrid.querySelectorAll("img").forEach((img) => {
    const naturalHeight =
      (img.getBoundingClientRect().width * img.naturalHeight) /
      img.naturalWidth;
    const span = Math.ceil((naturalHeight + gap) / (rowHeight + gap));
    const finalHeight = span * rowHeight + (span - 1) * gap;

    img.style.gridRowEnd = `span ${span}`;
    img.style.height = `${finalHeight}px`;
    img.style.objectFit = "cover";
  });
}

galleryGrid?.querySelectorAll("img").forEach((img) => {
  if (img.complete) {
    layoutMasonry();
  } else {
    img.addEventListener("load", layoutMasonry);
  }
});

window.addEventListener("resize", () => {
  clearTimeout(window._masonryResize);
  window._masonryResize = setTimeout(layoutMasonry, 150);
});

function shuffleProducts() {
  const container = document.querySelector(".products");
  const items = Array.from(container.children);

  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  items.forEach((item) => container.appendChild(item));
}

shuffleProducts();
