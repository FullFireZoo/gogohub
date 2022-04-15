import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCeMsBsX58CDDQw4XwiMukP88I4GOZ6EdM",
  authDomain: "gogohub-9b39d.firebaseapp.com",
  projectId: "gogohub-9b39d",
  storageBucket: "gogohub-9b39d.appspot.com",
  messagingSenderId: "811532064910",
  appId: "1:811532064910:web:fd4c9856026694e05c11df"
};


const app = initializeApp(firebaseConfig);



const auth = getAuth();

export function login (email, password) {
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.uid);
    window.location.href = '../../hub/index.html'
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error");
  })};


