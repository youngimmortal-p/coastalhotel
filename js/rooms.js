// js/rooms.js

const roomsContainer = document.getElementById("rooms-container");
const modal = document.getElementById("booking-modal");
const closeBooking = document.getElementById("close-booking");
const roomDetails = document.getElementById("room-details");
const payNow = document.getElementById("pay-now");

let selectedRoom = null;


const rooms = [
    {
      id: 'r1',
      name: 'Sea View Suite',
      desc: 'Panoramic ocean views, king bed, and private balcony.',
      price: 35000,
      img: '../seasideview.jpg'
    },
    {
      id: 'r2',
      name: 'Garden Deluxe',
      desc: 'Peaceful garden setting with queen bed and minimalist design.',
      price: 25000,
      img: '../gardendelux.jpg'
    },
    {
      id: 'r3',
      name: 'Presidential Suite',
      desc: 'Luxury suite with jacuzzi, private bar, and butler service.',
      price: 55000,
      img: '../presidentialsuite.jpg'
    },
    {
      id: 'r4',
      name: 'Executive Room',
      desc: 'Business-class comfort with workspace and city view.',
      price: 28000,
      img: '../executive.jpg'
    },
    {
      id: 'r5',
      name: 'Family Villa',
      desc: 'Spacious 2-bedroom suite for the whole family, kitchenette included.',
      price: 40000,
      img: '../family.jpg'
    }
  ];
  
  const container = document.getElementById('rooms-container');
  
  rooms.forEach(room => {
    const card = document.createElement('div');
    card.className = "bg-gray-900/70 backdrop-blur-md rounded-2xl p-4 shadow-2xl hover:scale-105 transform transition";
    card.innerHTML = `
      <img src="${room.img}" alt="${room.name}" class="rounded-xl mb-4 w-full h-48 object-cover shadow-lg">
      <h3 class="text-xl font-semibold mb-2">${room.name}</h3>
      <p class="text-gray-400 text-sm mb-3">${room.desc}</p>
      <div class="flex items-center justify-between">
        <span class="text-indigo-400 font-semibold">₦${room.price.toLocaleString()}</span>
        <button data-id="${room.id}" class="book-btn px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm">
        Book
      </button>
      </div>
    `;
    container.appendChild(card);
  });
  

  roomsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("book-btn")) {
      const roomId = e.target.dataset.id;
      selectedRoom = rooms.find((r) => r.id == roomId);
  
      roomDetails.textContent = `${selectedRoom.name} — $${selectedRoom.price}/night`;
      modal.classList.remove("hidden");
    }
  });
  
  // Close modal
  closeBooking.addEventListener("click", () => modal.classList.add("hidden"));
  
  // Proceed to payment
  payNow.addEventListener("click", () => {
    if (!auth.currentUser) {
      alert("Please log in before booking.");
      modal.classList.add("hidden");
      return;
    }
  
    // Initiate Paystack payment
    payWithPaystack(selectedRoom);
  });
  

  
  // PAYSTACK Integration
  function payWithPaystack(room) {
    let handler = PaystackPop.setup({
      key: "pk_test_ba8dd9121836663a820388dfd4b5ac41d1f3aff1", // 🔑 Replace with your public key
      email: auth.currentUser.email,
      amount: room.price * 100, // in kobo
      currency: "NGN",
      metadata: {
        roomName: room.name
      },
      callback: function (response) {
        // Payment successful — save booking
        saveBooking(room, response.reference);
      },
      onClose: function () {
        alert("Payment window closed.");
      }
    });
    handler.openIframe();
  }
  
  // Save booking in Firestore
  function saveBooking(room, reference) {
    db.collection("bookings")
      .add({
        user: auth.currentUser.uid,
        roomName: room.name,
        price: room.price,
        paymentRef: reference,
        date: new Date().toISOString(),
        status: "pending"
      })
      .then(() => {
        alert("Booking confirmed! Check your dashboard for details.");
        modal.classList.add("hidden");
      })
      .catch((err) => console.error("Error saving booking:", err));
  }