const express = require("express"),
    firebase = require("firebase");
//configuration
const app = express();
const port = process.env.port||3000;

//use
app.use(express.urlencoded({extended: true}));

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
const db = firebase.firestore();
//routes
app.get('/',async (req,res)=>{
    const email = 'shiv@m.com';
    const pass = "1235646465656";
    //creating new user
    await auth.createUserWithEmailAndPassword(email, pass)
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
        res.json(user);
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

app.get("/firestore",(req,res)=>{
    db.collection("sample").add({
        firstname: "Swati",
        lastname: "Shankar",
        roll: "MIT206T"
    }).then(docRef=>{
        console.log(docRef.id);
    }).catch(err=>{
        console.log(err);
    })
    res.render("index.ejs");
})

app.post("/firestore",async (req,res)=>{
    //const docRef = firestore.doc("sample/users");
    // await docRef.set({
    //     username: req.body.name,
    // }).then(res=>{
    //     console.log("user saved");
    // }).catch(err=>{
    //     console.log("Error: "+err);
    // })

    db.collection("sample").get().then(querySnapsot=>{
        querySnapsot.forEach(data=>{
            console.log(data.data());
        })
    })
})

//listening to server
app.listen(port,()=>{console.log("Server is Running on "+port)});