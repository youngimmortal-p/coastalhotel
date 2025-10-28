// js/dashboard.js

auth.onAuthStateChanged(async (user) => {
    const userEmail = document.getElementById("user-email");
    const bookingsContainer = document.getElementById("bookings-container");
    const noBookingsMsg = document.getElementById("no-bookings");
    const logoutBtn = document.getElementById("btn-logout");
  
    if (!user) {
      alert("Please log in to access your dashboard.");
      window.location.href = "index.html";
      return;
    }
  
    // Display user email
    userEmail.textContent = user.email;
  
    // Fetch bookings from Firestore
    const snapshot = await db
      .collection("bookings")
      .where("user", "==", user.uid)
      .orderBy("date", "desc")
      .get();
  
    if (snapshot.empty) {
      noBookingsMsg.classList.remove("hidden");
      return;
    }
  
    snapshot.forEach((doc) => {
      const booking = doc.data();
      const card = document.createElement("div");
  
      let statusColor =
      booking.status === "approved"
        ? "text-green-400"
        : booking.status === "cancelled"
        ? "text-red-400"
        : "text-yellow-400";
  
    card.className =
      "bg-gray-900/70 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-800 hover:scale-[1.02] transform transition";
  
    card.innerHTML = `
      <div class="flex flex-col h-full justify-between">
        <div>
          <h3 class="text-xl font-semibold mb-2 text-indigo-400">${booking.roomName}</h3>
          <p class="text-gray-400 mb-2">₦${booking.price.toLocaleString()}</p>
          <p class="text-gray-500 text-sm mb-4">Ref: ${booking.paymentRef}</p>
          <p class="font-semibold ${statusColor}">Status: ${booking.status}</p>
        </div>
        <p class="text-xs text-gray-500">Booked on ${new Date(
          booking.date
        ).toLocaleString()}</p>
      </div>
    `;
  
      bookingsContainer.appendChild(card);
    });
  
    // Logout functionality
    if (logoutBtn) {
      logoutBtn.addEventListener("click", async () => {
        await auth.signOut();
        alert("You’ve logged out successfully.");
        window.location.href = "index.html";
      });
    }
  });
  