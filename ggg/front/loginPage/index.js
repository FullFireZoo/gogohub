import { login } from "./firebase/firebase.js";

const email = document.querySelector("#email");
const mdp = document.querySelector("#password");
const btn = document.querySelector("#connexion");

btn.addEventListener("click", () => {
  
login (email.value, mdp.value)
});
