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
var userID; // Just in case

// Sign in a user from the browser to allow read/write permissions (and log errors)
authorize.signInAnonymously().catch(function(error) {
    console.log("Error Code: " + error.code);
});

// Actions to do on sign-in
firebase.auth().onAuthStateChanged(function(user) {
    userID = user.uid;
})

// This function will pull the scores from the database and sort them on the client
function clientSort() {

}



// Function to store user score and name onto database
// Must be able to tell if the 
function storeScore(username, score) {
    database.ref('Scores/' + userID).once('value')
    .then(function(scoreData) {
        console.log(scoreData.val());
        console.log(scoreData.val().score);
        if (isNaN(scoreData.val().score) || score > scoreData.val().score) {
            database.ref('Scores/' + userID).set({
            name: username,
            score: score
            })
        }
    })
}