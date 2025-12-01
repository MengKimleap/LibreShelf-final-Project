import { Books } from "./api.js";

// DOM Elements
const els = {
  cover: document.getElementById("book-cover"),
  title: document.getElementById("book-title"),
  author: document.getElementById("book-author"),
  desc: document.getElementById("book-description"),
  genres: document.getElementById("book-categories"),
  downloadBtn: document.getElementById("download-btn"),
  pdfViewer: document.getElementById("pdf-viewer"),
  pdfFallback: document.getElementById("pdf-fallback"),
  loading: document.getElementById("loading-state"),
  fallbackDownload: document.getElementById("fallback-download"),
};

// --- INITIALIZE ---
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Get ID from URL Query Params
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("id");

  if (!bookId) {
    alert("No book specified!");
    window.location.href = "../index.html";
    return;
  }

  try {
    // 2. Fetch Book Data
    const book = await Books.getById(bookId);

    // 3. Render Data
    renderBookDetails(book);
  } catch (error) {
    console.error("Detail Error:", error);
    els.title.innerText = "Book not found";
    els.desc.innerText =
      "The book you are looking for does not exist or has been removed.";
    els.loading.classList.add("hidden");
  }
});

// --- RENDER FUNCTION ---
function renderBookDetails(book) {
  // 1. Mock Page Count (Random number between 100-500 for demo)
  // If API had a 'pages' field, we would use: book.pages || 'N/A'
  const mockPages = Math.floor(Math.random() * (500 - 100 + 1) + 100);
  const pageCountEl = document.getElementById("page-count");
  if (pageCountEl) pageCountEl.innerText = `${mockPages} Pages`;

  // Basic Info
  els.title.innerText = book.title || "Untitled";
  els.author.innerText = book.author || "Unknown Author";
  els.desc.innerText =
    book.description || "No description available for this title.";

  // Images
  const coverUrl =
    book.thumbnail || "https://placehold.co/300x450/112d4e/FFF?text=No+Cover";
  els.cover.src = coverUrl;

  // Categories/Genres (Check if array or string)
  els.genres.innerHTML = "";
  const cats = Array.isArray(book.categories) ? book.categories : [];

  if (cats.length > 0) {
    cats.forEach((cat) => {
      // Check if cat is object {id, name} or string
      const name = typeof cat === "object" ? cat.name : cat;
      const badge = document.createElement("span");
      badge.className =
        "px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white backdrop-blur-sm uppercase tracking-wide";
      badge.innerText = name;
      els.genres.appendChild(badge);
    });
  } else {
    els.genres.innerHTML =
      '<span class="text-sm text-gray-400 italic">General</span>';
  }

  // PDF / Download Logic
  if (book.file_url) {
    // Set Download Link
    els.downloadBtn.href = book.file_url;
    els.fallbackDownload.href = book.file_url;

    // Set PDF Viewer
    // Note: Some browsers block cross-origin PDF viewing in iframes.
    // If it fails, we show fallback.
    els.pdfViewer.src = book.file_url;

    // Simple check: If file_url is not a PDF, hide viewer
    if (!book.file_url.toLowerCase().endsWith(".pdf")) {
      els.pdfViewer.classList.add("hidden");
      els.pdfFallback.classList.remove("hidden");
    }
  } else {
    els.downloadBtn.classList.add("opacity-50", "cursor-not-allowed");
    els.downloadBtn.innerText = "Unavailable";
    els.pdfViewer.classList.add("hidden");
    els.pdfFallback.classList.remove("hidden");
  }

  // Hide Loading Overlay
  els.loading.classList.add("hidden");
}

// --- FAVORITE LOGIC ---
const favBtn = document.getElementById("favorite-btn");
const bookId = new URLSearchParams(window.location.search).get("id");

// 1. Check if already favorite
function checkFavoriteStatus() {
  // Get array from local storage: ['1', '5', '12']
  const favorites = JSON.parse(localStorage.getItem("user_favorites") || "[]");
  const isFav = favorites.includes(bookId);
  updateFavoriteUI(isFav);
}

// 2. Update Button Style
function updateFavoriteUI(isFav) {
  if (isFav) {
    favBtn.classList.add("bg-red-500", "border-red-500", "text-white");
    favBtn.classList.remove("border-white/30", "text-white"); // Remove transparent styles if needed
    favBtn.innerHTML = `<i class="ph-fill ph-heart text-xl"></i> <span>Saved</span>`;
  } else {
    favBtn.classList.remove("bg-red-500", "border-red-500");
    favBtn.classList.add("border-white/30", "text-white");
    favBtn.innerHTML = `<i class="ph-bold ph-heart text-xl"></i> <span>Favorite</span>`;
  }
}

// 3. Toggle Handler
favBtn.addEventListener("click", () => {
  let favorites = JSON.parse(localStorage.getItem("user_favorites") || "[]");

  if (favorites.includes(bookId)) {
    // Remove
    favorites = favorites.filter((id) => id !== bookId);
    updateFavoriteUI(false);
  } else {
    // Add
    favorites.push(bookId);
    updateFavoriteUI(true);
  }

  localStorage.setItem("user_favorites", JSON.stringify(favorites));
});

// Call this on load
checkFavoriteStatus();

// --- FULLSCREEN LOGIC ---
const fullscreenBtn = document.getElementById("fullscreen-btn");
const pdfContainer = document.getElementById("pdf-container");

if (fullscreenBtn && pdfContainer) {
  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      // Enter Fullscreen
      pdfContainer.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable fullscreen: ${err.message}`);
      });
      fullscreenBtn.innerHTML = '<i class="ph-bold ph-corners-in text-xl"></i>'; // Change icon to "Exit"
    } else {
      // Exit Fullscreen
      document.exitFullscreen();
      fullscreenBtn.innerHTML =
        '<i class="ph-bold ph-corners-out text-xl"></i>'; // Change icon to "Enter"
    }
  });

  // Listen for Escape key or manual exit to reset icon
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      fullscreenBtn.innerHTML =
        '<i class="ph-bold ph-corners-out text-xl"></i>';
    }
  });
}
