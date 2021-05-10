import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCItWvDS7vscDcYHunxV-12D8dmf2zv0EQ",
  authDomain: "playlifts-e83de.firebaseapp.com",
  projectId: "playlifts-e83de",
  storageBucket: "playlifts-e83de.appspot.com",
  messagingSenderId: "1030062352778",
  appId: "1:1030062352778:web:46b62e7b3173aafe58c073",
  measurementId: "G-1MG03QR2EG",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebaseConfig;
