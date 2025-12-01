"use strict";

function favoriteBooks() {
  document.getElementById("favoriteBooks").innerHTML = `
    
    <main class="
        bg-white shadow-lg rounded-lg p-4 
        mx-auto
        w-full
        max-w-sm           
        sm:max-w-md        
        md:max-w-lg        
        lg:max-w-xl        
        xl:max-w-2xl       
    ">

        <!-- Header -->
        <header class="flex justify-between items-center mb-3">
            <h1 class="text-lg font-semibold md:text-xl">Your Favorite Books</h1>
            <button class="text-gray-500 hover:text-black text-xl"><i class="fa-solid fa-xmark"></i></button>
        </header>

        <!-- Sort Section -->
        <section class="mb-4">
            <button class="
                flex items-center gap-2 
                bg-blue-50 border border-blue-950 
                px-3 py-1 rounded-md text-sm
                md:text-base
            ">
                <span>⇅</span> Sort
            </button>
        </section>

        <!-- Book List -->
        <section class="space-y-4">

            <!-- Book Item -->
            <article class="flex gap-3 items-start border-b pb-4">
                
                <!-- Image1 -->
                <img 
                    src="../img/book1.jpg"
                    class="
                        w-16 h-20 object-cover rounded
                        sm:w-20 sm:h-24
                        md:w-24 md:h-28
                    "
                />

                <!-- Book Info -->
                <div class="flex-1">
                    <h2 class="font-semibold text-sm md:text-base">STEPHEN KING IT</h2>
                    <p class="text-xs text-gray-600 md:text-sm">x 1</p>
                    <p class="text-xs text-gray-500 md:text-sm">Date : 16 June 2025</p>
                </div>

                <!-- Buttons -->
                <div class="flex flex-col gap-2">
                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>

                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white 
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                        <i class="fa-solid fa-download"></i> Download
                    </button>
                </div>
            </article>
                        <!-- Book Item -->
            <article class="flex gap-3 items-start border-b pb-4">
                
                <!-- Image2 -->
                <img 
                    src="../img/book2.jpg"
                    class="
                        w-16 h-20 object-cover rounded
                        sm:w-20 sm:h-24
                        md:w-24 md:h-28
                    "
                />

                <!-- Book Info -->
                <div class="flex-1">
                    <h2 class="font-semibold text-sm md:text-base">STEPHEN KING IT</h2>
                    <p class="text-xs text-gray-600 md:text-sm">x 1</p>
                    <p class="text-xs text-gray-500 md:text-sm">Date : 16 June 2025</p>
                </div>

                <!-- Buttons -->
                <div class="flex flex-col gap-2">
                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>

                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white 
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                          <i class="fa-solid fa-download"></i> Download
                    </button>
                </div>
            </article>
            
                        <!-- Book Item -->
            <article class="flex gap-3 items-start border-b pb-4">
                
                <!-- Image3 -->
                <img 
                    src="../img/book3.jpg"
                    class="
                        w-16 h-20 object-cover rounded
                        sm:w-20 sm:h-24
                        md:w-24 md:h-28
                    "
                />

                <!-- Book Info -->
                <div class="flex-1">
                    <h2 class="font-semibold text-sm md:text-base">STEPHEN KING IT</h2>
                    <p class="text-xs text-gray-600 md:text-sm">x 1</p>
                    <p class="text-xs text-gray-500 md:text-sm">Date : 16 June 2025</p>
                </div>

                <!-- Buttons -->
                <div class="flex flex-col gap-2">
                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>

                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white 
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                          <i class="fa-solid fa-download"></i> Download
                    </button>
                </div>
            </article>
            
                        <!-- Book Item -->
            <article class="flex gap-3 items-start border-b pb-4">
                
                <!-- Image4 -->
                <img 
                    src="../img/book4.jpg"
                    class="
                        w-16 h-20 object-cover rounded
                        sm:w-20 sm:h-24
                        md:w-24 md:h-28
                    "
                />
                <!-- Book Info -->
                <div class="flex-1">
                    <h2 class="font-semibold text-sm md:text-base">STEPHEN KING IT</h2>
                    <p class="text-xs text-gray-600 md:text-sm">x 1</p>
                    <p class="text-xs text-gray-500 md:text-sm">Date : 16 June 2025</p>
                </div>

                <!-- Buttons -->
                <div class="flex flex-col gap-2">
                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                        <i class="fa-solid fa-trash-can"></i> Delete
                    </button>

                    <button class="
                        flex items-center gap-1 
                        bg-blue-950 text-white 
                        text-xs md:text-sm 
                        px-2 py-1 rounded">
                          <i class="fa-solid fa-download"></i>  Download
                    </button>
                </div>
            </article>       
        </section>

        <!-- Footer -->
        <footer class="mt-6 pt-4 border-t">
            <p class="text-sm md:text-base mb-2 font-medium">Book QTY : x4</p>

            <button class="flex items-center gap-2
                bg-blue-950 text-white  
                px-3 py-2 rounded text-sm md:text-base ms-auto">
                  <i class="fa-solid fa-download"></i>  Download all
            </button>
        </footer>

    </main>

    `;
}
