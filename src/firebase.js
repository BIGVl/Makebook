// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDF23niT6wUa8Cx-c0J7GIi4sSSt1jSOy4',
  authDomain: 'makebook-yoyo.firebaseapp.com',
  projectId: 'makebook-yoyo',
  storageBucket: 'makebook-yoyo.appspot.com',
  messagingSenderId: '1098009361058',
  appId: '1:1098009361058:web:809a4b48b80bc5f77835fb',
  measurementId: 'G-0GS3VK2TPH'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
