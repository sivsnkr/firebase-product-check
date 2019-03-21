const express = require("express"),
    firebase = require("firebase");


//configuration
const app = express();


//use
app.use(express.json());

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDR2nW4QtGnEfcVTTkp8o4ryFiGY8ztLo4",
    authDomain: "fir-product-check.firebaseapp.com",
    databaseURL: "https://fir-product-check.firebaseio.com",
    projectId: "fir-product-check",
    storageBucket: "fir-product-check.appspot.com",
    messagingSenderId: "803024683883"
};
firebase.initializeApp(config);