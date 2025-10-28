auth.onAuthStateChanged(async (user) => {
    const bookingsContainer = document.getElementById("bookings-container");
  
    if (!user) {
      alert("Please log in to access the admin panel.");
      window.location.href = "index.html";
      return;
    }
  
    // Optional: only allow specific admin emails
    const adminEmails = ["youradmin@email.com"];
    if (!adminEmails.includes(user.email)) {
      alert("Access denied — Admins only.");
      window.location.href = "index.html";
      return;
    }
  
    // Fetch all bookings
    const snapshot = await db.collection("bookings").orderBy("date", "desc").get();
  
    snapshot.forEach((doc) => {
      const booking = doc.data();
      const card = document.createElement("div");
      const bookingId = doc.id;
  
      card.className =
        "bg-gray-900/70 rounded-2xl p-6 shadow-2xl border border-gray-800 flex flex-col justify-between";
  
      let statusColor =
        booking.status === "approved"
          ? "text-green-400"
          : booking.status === "cancelled"
          ? "text-red-400"
          : "text-yellow-400";
  
      card.innerHTML = `
        <div>
          <h3 class="text-xl font-semibold mb-2 text-indigo-400">${booking.roomName}</h3>
          <p class="text-gray-400 mb-2">₦${booking.price.toLocaleString()}</p>
          <p class="text-gray-500 text-sm mb-4">User ID: ${booking.user}</p>
          <p class="text-sm font-semibold mb-4 ${statusColor}">Status: ${booking.status}</p>
        </div>
        <div class="flex gap-3">
          <button class="approve-btn bg-green-600 hover:bg-green-500 px-3 py-2 rounded" data-id="${bookingId}">Approve</button>
          <button class="cancel-btn bg-red-600 hover:bg-red-500 px-3 py-2 rounded" data-id="${bookingId}">Cancel</button>
        </div>
      `;
  
      bookingsContainer.appendChild(card);
    });
  
    // Approve / Cancel listeners
    bookingsContainer.addEventListener("click", async (e) => {
      const id = e.target.dataset.id;
      if (e.target.classList.contains("approve-btn")) {
        await db.collection("bookings").doc(id).update({ status: "approved" });
        alert("Booking approved!");
        window.location.reload();
      } else if (e.target.classList.contains("cancel-btn")) {
        await db.collection("bookings").doc(id).update({ status: "cancelled" });
        alert("Booking cancelled!");
        window.location.reload();
      }
    });
  });
  