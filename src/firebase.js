// firebase.js


import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
const firebaseConfig = {
  
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
