import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAy-q004wA_BbKtyDRQbllrKJdwU0s8lNo",
    authDomain: "burguer-queen-proj.firebaseapp.com",
    databaseURL: "https://burguer-queen-proj.firebaseio.com",
    projectId: "burguer-queen-proj",
    storageBucket: "burguer-queen-proj.appspot.com",
    messagingSenderId: "149248900445",
    appId: "1:149248900445:web:301dfc506e1ccccc633cb4",
    measurementId: "G-KWMETLQ8ZL"
  };

  firebase.initializeApp(firebaseConfig);

export default firebase;