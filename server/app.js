const express = require("express"),
    firebase = require("firebase");
//configuration
const app = express();
const port = process.env.port||3000;

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
const auth = firebase.auth();

//routes
app.get('/',(req,res)=>{
    const email = 'shiv@m.com';
    const pass = "1235646465656";
    //creating new user
    auth.createUserWithEmailAndPassword(email, pass)
    .then((createdUser)=>{
        //
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error);
    });

    //signing in the created user
    auth.signInWithEmailAndPassword(email, pass).
    then((user)=>{
        res.send("signing in user "+user);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        console.log(error);
    });

    //signing out user
    auth.signOut().then(function() {
        console.log("Sign-out successful");
      }).catch(function(error) {
        // An error happened.
    });
})

//listening to server
app.listen(port,()=>{console.log("Server is Running on "+port)});