// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey:  "AIzaSyAT4fK4lz_-daLW--nOsHCvMJz6uTNzQ34",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "cashclashgameapp",
  storageBucket: "cashclashgameapp.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:1089593275745:android:8bb2296a37c2701f368120",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export { app, messaging };
