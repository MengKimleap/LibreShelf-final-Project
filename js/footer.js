/**
 * Renders the Footer into a specific container.
 * Matches the specific 3-column layout with internal alignments.
 * @param {string} containerId - The ID of the div where the footer should be injected.
 */
function renderFooter(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const footerHTML = `
    <footer class="bg-pure-white text-text-black pt-15 pb-3 border-t border-white/10 dark:bg-slate-900">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 ">
            
            <!-- TOP SECTION: Main 3 Columns -->
            <!-- 
               grid-cols-12 allows for asymmetric sizing.
               - Left: 3 cols
               - Middle: 6 cols (Wider to fit 2 lists)
               - Right: 3 cols
            -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
                
                <!-- 1. LEFT SECTION: Logo & Socials (Span 3) -->
                <div class="lg:col-span-3">
                    <!-- Logo Group -->
                    <a href="/">
                        <img src="../img/Libreshelf.png" class="mx-auto w-37 dark:hidden" alt="Light Logo">
                        <img src="../img/Libreshelf-dark-mode.png" class="mx-auto w-37 hidden dark:block" alt="Dark Logo">
                    </a>
                    
                    <p class="text-gray-400 text-sm leading-relaxed max-w-xs text-center">
                        The open source library for everyone. Read, learn, and contribute to the community.
                    </p>

                    <!-- Social Icons -->
                    <div class="flex justify-center gap-2 mt-2">
                        <!-- Telegram -->
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-pure-white transition-all duration-300 border border-white/10 text-primary dark:text-pure-white">
                            <i class="text-xl fa-brands fa-telegram "></i>
                        </a>
                        <!-- Facebook -->
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-pure-white transition-all duration-300 border border-white/10 text-primary dark:text-pure-white">
                            <i class="text-xl fa-brands fa-facebook"></i>
                        </a>
                        <!-- GitHub -->
                        <a href="#" class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-pure-white transition-all duration-300 border border-white/10 text-primary dark:text-pure-white">
                            <i class="text-xl fa-brands fa-github" ></i>
                        </a>
                    </div>
                </div>

                <!-- 2. MIDDLE SECTION: Book Category (Span 6) -->
                <!-- Flex container to center the block visually -->
                <div class="lg:col-span-6 flex lg:justify-center">
                    <div class="w-full max-w-md">
                        <h3 class="text-lg font-bold text-primary mb-8 uppercase tracking-wider border-b border-secondary/30 pb-2 inline-block dark:text-pure-white">
                            Book Category
                        </h3>
                        
                        <!-- Two Vertical Columns of Links -->
                        <div class="grid grid-cols-2 gap-x-12 gap-y-4 text-dark-gray text-sm">
                            <!-- Col 1 -->
                            <div class="space-y-3 flex flex-col">
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> History
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Horror - Thriller
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Love Stories
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Science Fiction
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Business
                                </a>
                            </div>
                            
                            <!-- Col 2 -->
                            <div class="space-y-3 flex flex-col">
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Biography
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Astrology
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Digital Marketing
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Software Development
                                </a>
                                <a href="#" class="hover:text-secondary transition-colors dark:text-gray-400 flex items-center gap-2 group">
                                    <i class="ph-bold ph-caret-right text-secondary opacity-0 group-hover:opacity-100 transition-opacity"></i> Self-Help
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 3. RIGHT SECTION: Sitemap (Span 3) -->
                <div class="lg:col-span-3 dark:text-gray-400 flex flex-col lg:items-end">
                    <div class="w-full lg:w-auto text-left lg:text-right">
                        <h3 class="text-lg font-bold text-primary mb-8 uppercase tracking-wider border-b border-secondary/30 pb-2 inline-block dark:text-pure-white">
                            Sitemap
                        </h3>
                        <ul class="space-y-4 text-dark-gray text-sm">
                            <li><a href="/" class="hover:text-secondary transition-colors">Home</a></li>
                            <li><a href="/categories.html" class="hover:text-secondary transition-colors">Categories</a></li>
                            <li><a href="/about.html" class="hover:text-secondary transition-colors">About Us</a></li>
                            <li><a href="/my-book.html" class="hover:text-secondary transition-colors">My Books</a></li>
                            <li><a href="/contact.html" class="hover:text-secondary transition-colors">Contact Support</a></li>
                        </ul>
                    </div>
                </div>

            </div>

            <!-- BOTTOM ROW: Copyright -->
            <div class="border-t border-white/10 flex flex-col md:flex-row justify-center items-center text-center">
                <p class="text-sm text-gray-500 font-medium">
                    &copy; 2025 LibreShelf Team. Built as a Final Project for ISTAD Web Design Course.
                </p>
            </div>

        </div>
    </footer>
    `;

  container.innerHTML = footerHTML;
}
