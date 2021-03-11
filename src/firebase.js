import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTFkKgvQQU8Gz2X4LF0_ri5tfmyGUlGuY",
  authDomain: "bt3103-week-6-521b7.firebaseapp.com",
  projectId: "bt3103-week-6-521b7",
  storageBucket: "bt3103-week-6-521b7.appspot.com",
  messagingSenderId: "54770978170",
  appId: "1:54770978170:web:711f4ca2136ce449599ac3",
  measurementId: "G-GMN4JQNV9H"
};


firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;