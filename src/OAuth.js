import firebase from 'firebase/app';
// Required for side-effects
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCmPCtr3db5vWRcn7C5sDVazRF_zuWe9ag",
    authDomain: "twitch-link.firebaseapp.com",
    databaseURL: "https://twitch-link.firebaseio.com",
    projectId: "twitch-link",
    storageBucket: "twitch-link.appspot.com",
    messagingSenderId: "873630191996"
};

firebase.initializeApp(config);
export var db = null;
export var docRef = null;

firebase.auth().signInAnonymously()
  .catch(function(error) {
    // Handle Errors here.
    console.error(`${error.code} => ${error.message}`);
  });
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('------------------');
    console.log(user.uid);
    console.log('------------------');
    db = firebase.firestore();
    docRef = db.collection("users").doc(user.uid)
    docRef.get()
      .then(function(doc) {
        if (doc.exists && doc.data().OAUTH != undefined) {
          setOAuth(doc.data().OAUTH);
        }
    });
  }
});

export var OAUTH = null;
export function setOAuth(oauth) {
  console.log('oauth set ' + oauth);
  OAUTH = oauth
}
