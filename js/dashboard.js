// js/dashboard.js

// Protect page — only allow logged-in users
auth.onAuthStateChanged(user => {
    const userEmail = document.getElementById("user-email");
    const logoutBtn = document.getElementById("btn-logout");
  
    if (!user) {
      // User not logged in — redirect to homepage
      alert("Please log in to access your dashboard.");
      window.location.href = "index.html";
    } else {
      // User is logged in
      userEmail.textContent = `Logged in as ${user.email}`;
      console.log("Dashboard loaded for:", user.email);
  
      // Handle logout
      logoutBtn.addEventListener("click", async () => {
        await auth.signOut();
        alert("Logged out successfully!");
        window.location.href = "index.html";
      });
    }
  });
  