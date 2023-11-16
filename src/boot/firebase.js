import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDzx0s_KV4lSh122crZ2BbHtshtPiC_qY",
  authDomain: "personal-db-dcb6b.firebaseapp.com",
  projectId: "personal-db-dcb6b",
  storageBucket: "personal-db-dcb6b.appspot.com",
  messagingSenderId: "432112804471",
  appId: "1:432112804471:web:dece7bed91899aaa809c72"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

export { db, firebase };