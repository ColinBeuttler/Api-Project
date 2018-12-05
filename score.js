// Initialize Firebase
var config = {
apiKey: "AIzaSyANJBUhC8JaAuDtsdSREbH9DUZ6y3bM4Fk",
authDomain: "project-1-marvelous.firebaseapp.com",
databaseURL: "https://project-1-marvelous.firebaseio.com",
projectId: "project-1-marvelous",
storageBucket: "project-1-marvelous.appspot.com",
messagingSenderId: "946464641688"
};
firebase.initializeApp(config);
authorize = firebase.auth(); // To authorize user
database = firebase.database(); // To access database

// Global Variables
var scoreKey;

// Sign in a user from the browser to allow read/write permissions
authorize.signInAnonymously().catch(function(error) {
    console.log("Error Code: " + error.code);
});

// Actions to do on sign-in
firebase.auth().onAuthStateChanged(function() {
    scoreKey = database.ref().child('Scores').push({
        score: ["", 0]
    }).key;
})

// This function will pull the scores from the database and sort them on the client
function clientSort() {

}

// Function to store user score and name onto database
/* function storeScore(username, score) {
    database.ref('Scores/').once('')
    if () {
        database.ref('Scores/').push()
    }
} */