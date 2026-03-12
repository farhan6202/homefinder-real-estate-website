let data = [];

let cities = [
"Patna","Delhi","Mumbai","Kolkata",
"Chennai","Bangalore","Hyderabad",
"Pune","Lucknow","Jaipur"
];

let types = [
"House",
"Villa",
"Flat"
];

let images = [
"https://images.unsplash.com/photo-1568605114967-8130f3a36994",
"https://images.unsplash.com/photo-1570129477492-45c003edd2be",
"https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
"https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
];


// ---------- CREATE 500 DATA ----------

for (let i = 1; i <= 500; i++) {

let city = cities[i % cities.length];
let type = types[i % types.length];
let image = images[i % images.length];

data.push({

title: type + " in " + city + " " + i,
city: city,
type: type,
price: 3000000 + (i * 50),
image: image

});

}


// ---------- LIST ----------

let list = document.getElementById("list");


// ---------- SHOW ALL ----------

function show() {

list.innerHTML = "";

data.forEach(p => {

list.innerHTML += `

<div class="card">

<img src="${p.image}">

<div class="cardBody">

<div class="rating">★★★★★ 4.0</div>

<h3>${p.title}</h3>

<p>${p.city}</p>

<p>${p.type}</p>

<div class="priceRow">

<span class="price">₹ ${p.price}</span>

<a href="https://wa.me/919234667163?text=I want to book ${p.title} in ${p.city} price ₹${p.price}" target="_blank">
<button class="detailsBtn"
onclick="bookHome(
'${p.title}',
'${p.city}',
'${p.price}',
'${p.image}'
)">
Book Now
</button>
</a>

</div>

</div>

</div>

`;

});

}

show();


// ---------- SEARCH ----------

function search() {

let city = document.getElementById("city").value.toLowerCase();
let type = document.getElementById("type").value.toLowerCase();
let price = document.getElementById("price").value;

list.innerHTML = "";

data.forEach(p => {

let okCity = !city || p.city.toLowerCase().includes(city);
let okType = !type || p.type.toLowerCase().includes(type);
let okPrice = !price || p.price <= price;

if (okCity && okType && okPrice) {

list.innerHTML += `

<div class="card">

<img src="${p.image}">

<h3>${p.title}</h3>

<p>${p.city}</p>

<p>${p.type}</p>

<p>₹ ${p.price}</p>

</div>

`;

}

});

}


// ---------- FILTER BY TYPE ----------

window.filterType = function(t) {

list.innerHTML = "";

data.forEach(p => {

if (p.type.toLowerCase() === t.toLowerCase()) {

list.innerHTML += `

<div class="card">

<img src="${p.image}">

<div class="cardBody">

<div class="rating">★★★★★</div>

<h3>${p.title}</h3>

<p>${p.city}</p>

<p>${p.type}</p>

<div class="priceRow">

<span class="price">₹ ${p.price}</span>

<button class="detailsBtn">
Details
</button>

</div>

</div>

</div>

`;

}

});

};
import { db, auth } from "./firebase.js";

import {
addDoc,
collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


window.bookHome = async function(
title,
city,
price,
image
){

if(!auth.currentUser){
alert("Login first");
return;
}

// save booking

await addDoc(collection(db,"bookings"),{

title,
city,
price,
image,
userId:auth.currentUser.uid,
email:auth.currentUser.email

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

};