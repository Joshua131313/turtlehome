
import firebase from 'firebase'

const  firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyBK9yQAjTvF0Gej4rcqNjoJbZX-bZpM42k",
    authDomain: "turtlehome-73b33.firebaseapp.com",
    projectId: "turtlehome-73b33",
    storageBucket: "turtlehome-73b33.appspot.com",
    messagingSenderId: "558160833118",
    appId: "1:558160833118:web:5d4aaaeffc8960b9b7e2cf",
    measurementId: "G-6SP14JCDZX"
});

const db= firebaseApp.firestore()
const Fire = firebaseApp
export  {db, Fire}
