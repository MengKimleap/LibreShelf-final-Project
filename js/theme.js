/**
 * THEME MANAGER
 * Handles Dark/Light mode toggling and persistence.
 */

const theme = {
  // 1. Initialize Theme on Load
  init() {
    // Check LocalStorage or System Preference
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },

  // 2. Toggle Theme
  toggle() {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    // Dispatch event so other components (like Navbar icon) can update
    window.dispatchEvent(new Event("theme-change"));
  },

  // 3. Reset to System Preference
  reset() {
    localStorage.removeItem("theme");
    this.init();
  },
};

// Run immediately to prevent flash
theme.init();

// Export for module usage (if needed), but mostly this runs globally
window.LibreTheme = theme;
