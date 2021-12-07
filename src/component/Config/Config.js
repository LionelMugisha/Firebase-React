import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCLLP4k42ertFl6fKn7DbYnF5NC56LQ1IY",
    authDomain: "fir-react-44375.firebaseapp.com",
    projectId: "fir-react-44375",
    storageBucket: "fir-react-44375.appspot.com",
    messagingSenderId: "807709257274",
    appId: "1:807709257274:web:480ddff8b61798beab0f03",
    measurementId: "G-JQ8ML0GVPM"
  };

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage }