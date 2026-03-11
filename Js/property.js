import { auth, db } from "./firebase.js";

import {
addDoc,
collection,
getDocs,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



// ---------------- ADD PROPERTY ----------------

window.add = async function () {

let role = localStorage.getItem("role");

if (!auth.currentUser && role !== "admin") {
alert("Login first");
return;
}

let title = document.getElementById("title").value;
let city = document.getElementById("city").value;
let price = document.getElementById("price").value;
let image = document.getElementById("image").value;

let rooms = document.getElementById("rooms").value;
let beds = document.getElementById("beds").value;
let baths = document.getElementById("baths").value;
let size = document.getElementById("size").value;

await addDoc(collection(db,"properties"),{

title,
city,
price,
image,
rooms,
beds,
baths,
size,

email: auth.currentUser ? auth.currentUser.email : "admin",
userId: auth.currentUser ? auth.currentUser.uid : "admin"

});

alert("Added");

};



// ---------------- LOAD PROPERTIES ----------------

async function loadProperties(){

if(!location.pathname.includes("properties.html")) return;

let list = document.getElementById("list");

if(!list) return;

let q = await getDocs(collection(db,"properties"));

list.innerHTML = "";

let count = 0;

q.forEach(d => {

if(count >= 600) return;

let p = d.data();

count++;

list.innerHTML += `

<div class="card">

<img src="${p.image}">

<div class="cardBody">

<h3>${p.title}</h3>

<p>${p.city}</p>

<p>${p.rooms} Rooms | ${p.beds} Beds | ${p.baths} Baths</p>

<p>${p.size} SqFt</p>

<div class="priceRow">

<span class="price">
₹ ${p.price}
</span>

<button class="detailsBtn"
onclick="book(
'${d.id}',
'${p.title}',
'${p.city}',
'${p.price}',
'${p.image}'
)">
Book Now
</button>

</div>

</div>

</div>

`;

});

}

document.addEventListener("DOMContentLoaded", loadProperties);



// ---------------- BOOK + WHATSAPP (FIXED) ----------------

window.book = function(
id,
title,
city,
price,
image
){

onAuthStateChanged(auth, async (user)=>{

if(!user){

alert("Login first");
return;

}

// save booking

await addDoc(collection(db,"bookings"),{

propertyId:id,
title,
city,
price,
image,
userId:user.uid,
email:user.email

});

alert("Booked");


// whatsapp

let msg =
"I want to book " + title +
" in " + city +
" price ₹" + price;

let url =
"https://wa.me/919234667163?text=" +
encodeURIComponent(msg);

window.open(url,"_blank");

});

};



// ---------------- BOOKINGS PAGE ----------------

async function loadBookings(){

if(!location.pathname.includes("bookings.html")) return;

let list = document.getElementById("list");

if(!list) return;

let role = localStorage.getItem("role");

let q = await getDocs(collection(db,"bookings"));

list.innerHTML = "";

q.forEach(d => {

let b = d.data();


// ✅ ADMIN sees all

if(role === "admin"){

list.innerHTML += `

<div class="card">

<img src="${b.image}">

<div class="cardBody">

<h3>${b.title}</h3>

<p>${b.city}</p>

<p class="price">₹ ${b.price}</p>

<p>${b.email}</p>

<p><b>Admin view</b></p>

</div>

</div>

`;

}


// ✅ USER sees own only

else if(
auth.currentUser &&
b.userId == auth.currentUser.uid
){

list.innerHTML += `

<div class="card">

<img src="${b.image}">

<div class="cardBody">

<h3>${b.title}</h3>

<p>${b.city}</p>

<p class="price">₹ ${b.price}</p>

<p>${b.email}</p>

<button class="detailsBtn">
Booked
</button>

</div>

</div>

`;

}

});

}

loadBookings();



// ---------------- DELETE ----------------

window.del = async function(id){

await deleteDoc(doc(db,"properties",id));

alert("Deleted");

location.reload();

};