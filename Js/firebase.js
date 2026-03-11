import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

  apiKey: "AIzaSyBPffRxVjIeZHpJDaE27gfIO6jXpsY4UvA",

  authDomain: "homefinder-951fb.firebaseapp.com",

  projectId: "homefinder-951fb",

  storageBucket: "homefinder-951fb.firebasestorage.app",

  appId: "1:1075101907420:web:0fc4877d3aded05942f719"

};



const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);