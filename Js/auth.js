import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// ---------- SIGNUP ----------

window.signup = async function () {

let email = document.getElementById("email").value;
let pass = document.getElementById("pass").value;

await createUserWithEmailAndPassword(auth,email,pass);

alert("Signup success");

location.href="index.html";

};



// ---------- LOGIN ----------

window.login = async function () {

let email = document.getElementById("email").value;
let pass = document.getElementById("pass").value;
let role = document.getElementById("role").value;


// ---------- ADMIN LOGIN ----------

if(role==="admin"){

if(
email==="farhanashraf0503@gmail.com" &&
pass==="farhan"
){

localStorage.setItem("role","admin");

alert("Admin login");

location.href="admin.html";

return;

}else{

alert("Wrong admin login");
return;

}

}


// ---------- USER LOGIN ----------

await signInWithEmailAndPassword(auth,email,pass);

localStorage.setItem("role","user");

location.href="index.html";

};



// ---------- CURRENT USER ----------

onAuthStateChanged(auth,(user)=>{

let role = localStorage.getItem("role");

let loginBtn = document.getElementById("loginBtn");
let signupBtn = document.getElementById("signupBtn");
let logoutBtn = document.getElementById("logoutBtn");

let links = document.querySelectorAll("nav a");


// ---------- LOGIN / LOGOUT ----------

if(user || role==="admin"){

if(loginBtn) loginBtn.style.display="none";
if(signupBtn) signupBtn.style.display="none";
if(logoutBtn) logoutBtn.style.display="inline";

}else{

if(loginBtn) loginBtn.style.display="inline";
if(signupBtn) signupBtn.style.display="inline";
if(logoutBtn) logoutBtn.style.display="none";

}


// ---------- LOGOUT RIGHT ----------

if(logoutBtn){

logoutBtn.style.marginLeft="auto";

}


// ---------- ADMIN NAVBAR ----------

if(role==="admin"){

links.forEach(a=>{

let t=a.textContent.trim();

if(
t==="About" ||
t==="Signup" ||
t==="Login" ||
t==="Properties"
){

a.style.display="none";

}

});

}


// ---------- USER NAVBAR ----------

if(role!=="admin"){

links.forEach(a=>{

let t=a.textContent.trim();

if(
t==="Add Property" ||
t==="Admin"
){

a.style.display="none";

}

});

}

});



// ---------- LOGOUT ----------

window.logout = async function(){

localStorage.removeItem("role");

try{
await signOut(auth);
}catch(e){}

alert("Logged out");

location.href="index.html";

};



// ---------- PROTECT PAGE ----------

window.protect = function(){

let role = localStorage.getItem("role");

onAuthStateChanged(auth,(user)=>{

if(!user && role!=="admin"){

alert("Login required");

location.href="login.html";

}

});

};