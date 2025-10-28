 const firebaseConfig = {
    apiKey: "AIzaSyAwS5rbv2OiisxiMk7GtvJg7hb31VyDxqo",
    authDomain: "coastal-hotel-stay.firebaseapp.com",
    projectId: "coastal-hotel-stay",
    storageBucket: "coastal-hotel-stay.firebasestorage.app",
    messagingSenderId: "967708463373",
    appId: "1:967708463373:web:774274aaf82ef09a806044"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
const db = firebase.firestore();