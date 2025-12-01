"use strict";

function bookDetail() {
  document.getElementById("bookDetail").innerHTML = `

    <main class=" bg-white rounded-2xl shadow-xl p-6 mx-auto w-full max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl flex flex-col md:flex-row gap-6 mt-40">

        <!-- Left Image -->
        <section class="flex-shrink-0">
            <img 
                src="../img/book1.jpg"
                alt="Book Cover"
                class="w-52 h-72 object-cover rounded-lg md:w-64 md:h-80"
            />
        </section>

        <!-- Right Content -->
        <section class="flex-1">

            <!-- Close Button -->
            <header class="flex justify-end">
                <button class="bg-gray-200">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </header>

            <!-- Rating -->
            <div class="flex items-center gap-2 mt-1">
                <span class="text-yellow-500 text-xl">⭐</span>
                <span class="text-gray-700 font-medium text-sm">9.9</span>
            </div>

            <!-- Title -->
            <h1 class="text-2xl sm:text-3xl font-bold leading-tight mt-1">
                Harry Potter
                <br />
                <span>And the cursed</span>
            </h1>

            <!-- Author -->
            <p class="mt-2 text-gray-700 font-semibold">
                Jack Thorne
            </p>

            <!-- Description -->
            <p class="mt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                In a world filled with endless opportunities and choices, 
                it's easy to feel overwhelmed and stressed out. 
                We often find ourselves trying to do it all,
            </p>

            <!-- Release Date -->
            <p class="mt-3 text-gray-500 text-xs sm:text-sm">
                Re least date : 12 Dec 2025
            </p>

            <!-- Buttons -->
            <div class="mt-4 flex flex-wrap gap-4">
                <button class="
                    bg-primary text-white
                    px-5 py-2 rounded-lg 
                    text-sm sm:text-base 
                    flex items-center gap-2
                ">
                    Add to favorite <i class="fa-regular fa-heart"></i>
                </button>

                <button class="
                    border border-gray-400 
                    px-5 py-2 rounded-lg 
                    text-sm sm:text-base
                    hover:bg-gray-100
                ">
                    Read now
                </button>
            </div>

        </section>

    </main>
    `;
}
