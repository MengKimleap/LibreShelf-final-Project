import { Auth, Utils } from "./api.js";

// Logic For Sign-in Page
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const errorText = document.getElementById("form-error");
    const submitBtn = loginForm.querySelector('button[type="submit"]');

    if (!emailInput || !passwordInput) return;

    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Signing in...";
    submitBtn.disabled = true;
    if (errorText) errorText.classList.add("hidden");

    try {
      const result = await Auth.login(emailInput.value, passwordInput.value);

      if (result.success) {
        // If we are in /pages/auth/signin.html, we need to go up two levels to root
        const pathToRoot = "../../index.html";

        alert(`Welcome back!`);
        window.location.href = pathToRoot;
      } else {
        if (errorText) {
          errorText.textContent = result.error;
          errorText.classList.remove("hidden");
        } else {
          alert("Login Failed: " + result.error);
        }
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please check your connection.");
    } finally {
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// Logic For Sign-up Page
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirm-password").value;

    if (password !== confirmPass) {
      alert("Passwords do not match!");
      return;
    }

    // User Data Template
    const userData = {
      username: username,
      full_name: fullName,
      password: password,
      email: email,
      role: "teacher",
      bio: "LibreShelf Reader",
      gender: "other",
      address: "Phnom Penh",
      profile_url: "https://placehold.co/100",
      phone_number: "",
      date_of_birth: new Date().toISOString(),
    };

    const submitBtn = signupForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Creating Account...";
    submitBtn.disabled = true;

    try {
      const result = await Auth.register(userData);

      if (result.access_token || result.id || result.username) {
        alert("Account created successfully! Please Login.");
        window.location.href = "signin.html";
      } else if (result.detail) {
        const msg = Array.isArray(result.detail)
          ? result.detail.map((err) => err.msg).join(", ")
          : result.detail;
        alert("Registration Failed: " + msg);
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error.");
    } finally {
      submitBtn.innerText = originalText;
      submitBtn.disabled = false;
    }
  });
}
