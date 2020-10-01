import * as firebase from "firebase/app";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgswgIS8J3F4xNHfe3zqTxionQ17CDAq8",
  authDomain: "militree-e7652.firebaseapp.com",
  databaseURL: "https://militree-e7652.firebaseio.com",
  projectId: "militree-e7652",
  storageBucket: "militree-e7652.appspot.com",
  messagingSenderId: "1051008351431",
  appId: "1:1051008351431:web:5082c67bd740374d3f12e2",
  measurementId: process.env.REACT_APP
};

export default firebase.initializeApp(firebaseConfig);