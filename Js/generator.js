import { db } from "./firebase.js";

import {
addDoc,
collection
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


let types = ["House","Villa","Flat"];

let cities = ["Delhi","Mumbai","Patna","Pune","Jaipur"];

let images = [
"https://images.unsplash.com/photo-1568605114967-8130f3a36994",
"https://images.unsplash.com/photo-1570129477492-45c003edd2be",
"https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
"https://images.unsplash.com/photo-1598928506311-c55ded91a20c"
];


async function generate(){

for(let i=1;i<=500;i++){

let type = types[i % types.length];
let city = cities[i % cities.length];
let image = images[i % images.length];

await addDoc(collection(db,"properties"),{

title: type + " " + i,
city: city,

price: 1000000 + i*5000,

rooms: 2 + (i%4),
beds: 1 + (i%3),
baths: 1 + (i%2),

size: 1000 + i*10,

image: image,

email:"admin",
userId:"admin"

});

console.log("added",i);

}

alert("500 properties added");

}

generate();