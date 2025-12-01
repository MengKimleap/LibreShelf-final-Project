import { Utils, Books, Categories, Auth } from "./api.js";

// DOM Elements
const els = {
  booksList: document.getElementById("admin-books-list"),
  catList: document.getElementById("admin-categories-list"),
  catForm: document.getElementById("create-category-form"),
  statBooks: document.getElementById("stat-books"),
  statCats: document.getElementById("stat-categories"),
  logoutBtn: document.getElementById("admin-logout"),
  searchBooks: document.getElementById("admin-search-books"),
};

// --- INIT ---
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Verify Admin Status
  const role = localStorage.getItem("user_role");
  if (role !== "admin") {
    alert("Access Denied: Admins only.");
    window.location.href = "../index.html";
    return;
  }

  // 2. Load Data
  await refreshBooks();
  await refreshCategories();

  // 3. Setup Events
  setupAdminEvents();
});

// --- BOOKS LOGIC ---
async function refreshBooks(search = "") {
  try {
    els.booksList.innerHTML =
      '<tr><td colspan="5" class="px-6 py-4 text-center">Loading...</td></tr>';

    // Fetch 100 books for admin view
    const response = await Books.getAll({ limit: 100, search });
    const books = response.books || response.data || [];

    // Update Stat
    if (els.statBooks) els.statBooks.textContent = books.length;

    if (books.length === 0) {
      els.booksList.innerHTML =
        '<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No books found.</td></tr>';
      return;
    }

    els.booksList.innerHTML = books
      .map(
        (book) => `
            <tr class="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                <td class="px-6 py-4 font-mono text-xs text-gray-400">#${
                  book.id
                }</td>
                <td class="px-6 py-4">
                    <img src="${
                      book.thumbnail || "https://placehold.co/50"
                    }" class="w-10 h-14 object-cover rounded shadow-sm">
                </td>
                <td class="px-6 py-4 font-medium text-primary dark:text-white max-w-xs truncate" title="${
                  book.title
                }">
                    ${book.title}
                </td>
                <td class="px-6 py-4 text-xs">User ID: ${book.author_id}</td>
                <td class="px-6 py-4 text-right">
                    <button onclick="adminDeleteBook(${
                      book.id
                    })" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition" title="Delete">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </td>
            </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Admin Books Error:", error);
  }
}

// --- CATEGORIES LOGIC ---
async function refreshCategories() {
  try {
    const cats = await Categories.getAll(); // Uses the new Categories helper

    // Update Stat
    if (els.statCats) els.statCats.textContent = cats.length;

    els.catList.innerHTML = cats
      .map(
        (cat) => `
            <tr class="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition">
                <td class="px-6 py-4 font-mono text-xs text-gray-400">#${
                  cat.id
                }</td>
                <td class="px-6 py-4 font-bold text-primary dark:text-white">${
                  cat.name
                }</td>
                <td class="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">${
                  cat.description || "-"
                }</td>
                <td class="px-6 py-4 text-right">
                    <button onclick="adminDeleteCategory(${
                      cat.id
                    })" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded transition">
                        <i class="ph-bold ph-trash"></i>
                    </button>
                </td>
            </tr>
        `
      )
      .join("");
  } catch (error) {
    console.error("Admin Cat Error:", error);
  }
}

// --- EVENTS ---
function setupAdminEvents() {
  // Logout
  els.logoutBtn.addEventListener("click", () => {
    Auth.logout();
  });

  // Create Category
  els.catForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("cat-name").value;
    const desc = document.getElementById("cat-desc").value;
    const btn = els.catForm.querySelector("button");

    try {
      btn.innerText = "Creating...";
      btn.disabled = true;
      await Categories.create(name, desc);
      alert("Category created!");
      els.catForm.reset();
      refreshCategories(); // Reload list
    } catch (err) {
      alert("Failed to create category: " + err.message);
    } finally {
      btn.innerText = "Create Category";
      btn.disabled = false;
    }
  });

  // Search Books
  let timeout;
  els.searchBooks.addEventListener("input", (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      refreshBooks(e.target.value.trim());
    }, 500);
  });
}

// --- GLOBAL ACTIONS (For OnClick) ---
window.adminDeleteBook = async (id) => {
  if (
    !confirm(
      `Are you sure you want to delete Book #${id}? This cannot be undone.`
    )
  )
    return;
  try {
    await Books.delete(id);
    refreshBooks(); // Reload list
  } catch (err) {
    alert("Delete failed.");
  }
};

window.adminDeleteCategory = async (id) => {
  if (!confirm(`Delete Category #${id}?`)) return;
  try {
    await Categories.delete(id);
    refreshCategories();
  } catch (err) {
    alert(
      "Delete failed. (Note: You usually cannot delete categories that contain books)"
    );
  }
};
