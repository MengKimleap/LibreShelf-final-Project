/**
 * Renders the "Popular Books" section.
 * Currently uses STATIC_BOOKS.
 * TODO: API - Later replace STATIC_BOOKS with data fetched from your endpoint.
 */
function initPopularBooks(containerId) {
  const container = document.getElementById(containerId);

  // Safety checks
  if (!container) {
    console.warn(`Popular books container #${containerId} not found.`);
    return;
  }
  if (typeof STATIC_BOOKS === "undefined") {
    console.warn("STATIC_BOOKS data is missing. Ensure books.js is loaded.");
    return;
  }

  // 1. Determine Grid Columns [n]
  // For this design, we want a fixed layout:
  // - Mobile: 1 column
  // - Tablet: 2 columns
  // - Desktop: 4 columns (So 2 rows = 8 books total)
  // This ensures a clean, balanced look.
  const DISPLAY_LIMIT = 8;

  // 2. Get Data (Mock or Real)
  // TODO: API - Replace this line with: const popularBooks = apiData.slice(0, DISPLAY_LIMIT);
  // We slice the first 8 books to simulate the "Popular" list.
  const popularBooks = STATIC_BOOKS.slice(0, DISPLAY_LIMIT);

  // 3. Generate HTML
  container.innerHTML = popularBooks
    .map((book) => createPopularBookCard(book))
    .join("");
}

/**
 * Creates the HTML for a single Popular Book Card
 * Matches the design: Cover, Title, Author, Icons (Heart, Download)
 */
function createPopularBookCard(book) {
  return `
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col h-full group overflow-hidden">
            
            <!-- Card Header: Image & Badge -->
            <div class="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden">
                <img src="${book.image_url}" 
                     alt="${book.title}" 
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/300x400/112d4e/FFF?text=No+Cover'">
                
                <!-- Floating Badge (Optional, e.g. Rating) -->
                <div class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-primary shadow-sm flex items-center gap-1">
                    <i class="ph-fill ph-star text-accent"></i> ${book.rating}
                </div>
            </div>

            <!-- Card Body -->
            <div class="p-4 flex flex-col flex-grow dark:bg-slate-900">
                
                <!-- Title & Author -->
                <div class="mb-3">
                    <h3 class="text-lg font-bold text-primary line-clamp-1 dark:text-pure-white" title="${book.title}">
                        ${book.title}
                    </h3>
                    <p class="text-sm text-dark-gray line-clamp-1">${book.author}</p>
                </div>

                <!-- Action Buttons Row -->
                <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
                    
                    <!-- Left: Interactive Icons -->
                    <div class="flex items-center gap-3">
                        <!-- Favorite Button -->
                        <!-- TODO: API - Add onclick handler to save to favorites -->
                        <button class="text-dark-gray hover:text-red-500 transition-colors" title="Add to Favorites">
                            <i class="ph-bold ph-heart text-xl"></i>
                        </button>
                        
                        <!-- Download PDF Button -->
                        <!-- TODO: API - Link this to the actual PDF URL -->
                        <button class="text-dark-gray hover:text-primary transition-colors" title="Download PDF">
                            <i class="ph-bold ph-download-simple text-xl"></i>
                        </button>
                    </div>

                    <!-- Right: Read Button -->
                    <a href="./html/details.html?id=${book.id}" class="text-xs font-bold text-secondary hover:text-primary uppercase tracking-wider transition-colors">
                        Read Now
                    </a>
                </div>
            </div>
        </div>
    `;
}
