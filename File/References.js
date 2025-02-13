import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCbm9BLUmKwqze6UCXLhqXAmTZKrUqx2h4",
  authDomain: "inpetory.firebaseapp.com",
  databaseURL: "https://inpetory-default-rtdb.firebaseio.com",
  projectId: "inpetory",
  storageBucket: "inpetory.appspot.com",
  messagingSenderId: "687271117889",
  appId: "1:687271117889:web:91910243bff6cee22532c0",
  measurementId: "G-JBBELG34D9"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const dataRef = firebase.database().ref();
const auth = firebase.auth();

export { dataRef, auth };