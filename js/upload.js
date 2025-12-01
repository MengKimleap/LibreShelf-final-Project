import { Utils, Books } from "./api.js";

// Elements
const form = document.getElementById("upload-form");
const categorySelect = document.getElementById("category");
const coverInput = document.getElementById("cover-file");
const coverPreview = document.getElementById("cover-preview");
const coverPlaceholder = document.getElementById("cover-placeholder");
const pdfInput = document.getElementById("book-file");
const fileNameDisplay = document.getElementById("file-name-display");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-message");

// --- INIT ---
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Check Permission (Must be Teacher/Admin)
  const role = localStorage.getItem("user_role");
  // Remember: We mapped 'teacher' to standard users
  if (role !== "teacher" && role !== "admin") {
    alert("You must be logged in to upload books.");
    window.location.href = "../pages/signin.html";
    return;
  }

  // 2. Load Categories
  try {
    const categories = await Utils.getCategories();
    if (categories && categories.length > 0) {
      categorySelect.innerHTML += categories
        .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
        .join("");
    }
  } catch (err) {
    console.error("Failed to load categories", err);
  }
});

// --- UI: IMAGE PREVIEW ---
coverInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      coverPreview.src = e.target.result;
      coverPreview.classList.remove("hidden");
      coverPlaceholder.classList.add("hidden"); // Hide placeholder text
    };
    reader.readAsDataURL(file);
  }
});

// --- UI: PDF NAME DISPLAY ---
pdfInput.addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
    fileNameDisplay.classList.add("text-primary", "font-bold");
  }
});

// --- SUBMIT HANDLER ---
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMsg.classList.add("hidden");

  // 1. Validate Files
  const coverFile = coverInput.files[0];
  const pdfFile = pdfInput.files[0];

  if (!coverFile || !pdfFile) {
    showError("Please select both a cover image and a PDF file.");
    return;
  }

  // 2. Set Loading State
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i> Uploading Files...`;
  submitBtn.disabled = true;

  try {
    // 3. Upload Cover Image
    // Create FormData specifically for the file endpoint
    const coverFormData = new FormData();
    coverFormData.append("file", coverFile);

    console.log("Uploading Cover...");
    const coverResponse = await Utils.uploadFile(coverFormData);
    // API returns the URL string directly or inside an object?
    // Based on swagger logs: Body: "string".
    // Let's handle both cases safely.
    const coverUrl =
      typeof coverResponse === "string"
        ? coverResponse
        : coverResponse.url || coverResponse.file_url;

    // 4. Upload PDF
    submitBtn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i> Uploading PDF...`;
    const pdfFormData = new FormData();
    pdfFormData.append("file", pdfFile);

    console.log("Uploading PDF...");
    const pdfResponse = await Utils.uploadFile(pdfFormData);
    const pdfUrl =
      typeof pdfResponse === "string"
        ? pdfResponse
        : pdfResponse.url || pdfResponse.file_url;

    if (!coverUrl || !pdfUrl) {
      throw new Error("Failed to retrieve file URLs from server.");
    }

    // 5. Create Book Entry
    submitBtn.innerHTML = `<i class="ph-bold ph-spinner animate-spin"></i> Publishing...`;

    const bookData = {
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      category_ids: [parseInt(categorySelect.value)], // API expects array of INT
      thumbnail: coverUrl,
      file_url: pdfUrl,
    };

    console.log("Creating Book:", bookData);
    await Books.create(bookData);

    // 6. Success
    alert("Book published successfully!");
    window.location.href = "dashboard.html"; // Redirect to dashboard
  } catch (error) {
    console.error("Upload Error:", error);
    showError(error.message || "An error occurred during upload.");
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

function showError(msg) {
  errorMsg.innerHTML = `<i class="ph-bold ph-warning-circle"></i> <span>${msg}</span>`;
  errorMsg.classList.remove("hidden");
}
