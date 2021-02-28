import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
    authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    // databaseURL: process.env.,
    projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FIREBASE_APPID,
  };

firebase.initializeApp(firebaseConfig);

export default firebase;