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
const firestore = firebase.firestore();
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
    res.render("index.ejs");
})

app.post("/firestore",async (req,res)=>{
    const docRef = firestore.doc("sample/users");
    await docRef.set({
        username: req.body.name,
    }).then(res=>{
        console.log("user saved");
    }).catch(err=>{
        console.log("Error: "+err);
    })

    docRef.get().then(doc=>{
        if(doc && doc.exists){
            const myData = doc.data();
            res.render("show.ejs",{name: myData.username});
        }
    }).catch(err=>{
        res.send(err);
    })
})

//listening to server
app.listen(port,()=>{console.log("Server is Running on "+port)});