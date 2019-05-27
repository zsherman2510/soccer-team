import firebase from "firebase/app";
import "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxToZTJypLxZPjFJXJimbS9sjy52rbUqw",
  authDomain: "m-city-4a39d.firebaseapp.com",
  databaseURL: "https://m-city-4a39d.firebaseio.com",
  projectId: "m-city-4a39d",
  storageBucket: "m-city-4a39d.appspot.com",
  messagingSenderId: "503093915331",
  appId: "1:503093915331:web:3ab9f7fdd6a6effe"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const firebaseMatches = firebaseDB.ref("matches");
const promotions = firebaseDB.ref("promotions");
const firebaseTeams = firebaseDB.ref("teams");
const firebasePlayers = firebaseDB.ref("players");
// firebaseDB
//   .ref("matches")
//   .once("value")
//   .then(snapshot => {
//     console.log(snapshot.val());
//   });

export {
  firebase,
  firebaseMatches,
  promotions,
  firebaseTeams,
  firebaseDB,
  firebasePlayers
};
