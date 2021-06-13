import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAylOgf59toZm92xu19bKuaOGpoxVpwz54",
  authDomain: "hobbies-app-aqedutech.firebaseapp.com",
  databaseURL: "https://hobbies-app-aqedutech-default-rtdb.firebaseio.com",
  projectId: "hobbies-app-aqedutech",
  storageBucket: "hobbies-app-aqedutech.appspot.com",
  messagingSenderId: "844234260684",
  appId: "1:844234260684:web:3afc4e5caeede4169e0269",
  measurementId: "G-RNCPJG5EBF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase;
