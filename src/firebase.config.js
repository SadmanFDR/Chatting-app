// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPoIwnh8Rx2JgFGKCqm8dtAz61SJ5Tvrk",
  authDomain: "exam-ad67f.firebaseapp.com",
  projectId: "exam-ad67f",
  storageBucket: "exam-ad67f.firebasestorage.app",
  messagingSenderId: "477363498540",
  appId: "1:477363498540:web:a5ec14a943f31b4d072b89",
  measurementId: "G-6RM09CKTL4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app