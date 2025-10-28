// js/auth.js

// Ensure Firebase is loaded
if (typeof firebase === "undefined") {
    console.error("Firebase not loaded — check your script order!");
  }
  
  // Elements
  const modal = document.getElementById("auth-modal");
  const btnLogin = document.getElementById("btn-login");
  const btnLogout = document.getElementById("btn-logout");
  const closeAuth = document.getElementById("close-auth");
  const toggleAuth = document.getElementById("toggle-auth");
  const authTitle = document.getElementById("auth-title");
  const authSubmit = document.getElementById("auth-submit");
  const authForm = document.getElementById("auth-form");
  
  let isSignup = false;
  
  // 🪄 Toggle modal
  btnLogin?.addEventListener("click", () => modal.classList.remove("hidden"));
  closeAuth?.addEventListener("click", () => modal.classList.add("hidden"));
  
  // 🧭 Toggle between login/signup
  toggleAuth?.addEventListener("click", () => {
    isSignup = !isSignup;
    authTitle.textContent = isSignup ? "Sign Up" : "Login";
    authSubmit.textContent = isSignup ? "Create Account" : "Login";
    toggleAuth.textContent = isSignup ? "Already have an account? Login" : "Create an account";
  });
  
  // 🚀 Handle form submit
  authForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    try {
      if (isSignup) {
        await auth.createUserWithEmailAndPassword(email, password);
        alert("Account created successfully!");
      } else {
        await auth.signInWithEmailAndPassword(email, password);
        alert("Logged in successfully!");
      }
      modal.classList.add("hidden");
      window.location.href = "dashboard.html"
    } catch (err) {
      alert(err.message);
    }
  });
  
  // 🧭 Monitor user state
  auth.onAuthStateChanged(user => {
    if (user) {
      btnLogin?.classList.add("hidden");
      btnLogout?.classList.remove("hidden");
      console.log("User logged in:", user.email);
    } else {
      btnLogin?.classList.remove("hidden");
      btnLogout?.classList.add("hidden");
    }
  });
  
  // 🚪 Logout
  btnLogout?.addEventListener("click", async () => {
    await auth.signOut();
    alert("Logged out successfully!");
  });
  