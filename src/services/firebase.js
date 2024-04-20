import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCWP1sVJbafZLxOymfyzJIyZS9PQ70F4lM",
  authDomain: "kiwi-ad-server.firebaseapp.com",
  projectId: "kiwi-ad-server",
  storageBucket: "kiwi-ad-server.appspot.com",
  messagingSenderId: "743488303991",
  appId: "1:743488303991:web:d07c50d444c3960d986772",
  measurementId: "G-KR4SQ4JSPZ",
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase storage instance
const storage = getStorage(app);

export default storage; // Export the storage instance
