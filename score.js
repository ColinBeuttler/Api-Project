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
var userID; // For storing the user's ID
var scoreData; // Global variable to store score data from Firebase in realtime

// Sign in a user from the browser to allow read/write permissions (and log errors)
authorize.signInAnonymously().catch(function(error) {
    console.log("Error Code: " + error.code);
});

// Actions to do on sign-in
firebase.auth().onAuthStateChanged(function(user) {
    userID = user.uid;
    // Get the state of the user's score at all times (but only after the userID has been obtained)
    database.ref('Scores/' + userID).on('value', function(currentScoreData) {
        console.log(currentScoreData.val());
        scoreData = currentScoreData.val();
    }, function(error) {
        console.log("Error code: " + error.code);
    })
})

// This function will pull the scores from the database and sort them on the client
function clientSort() {

}

// Function for updating the user's score data without using overwrites
function storeNewScore(score) { 
    if (scoreData.score < score) {
        database.ref("Scores/" + userID).update({
            score: score
        })
    }
}

// Function for storing and setting the initial score
function storeInitialScore(username, score) {
    database.ref("Scores/" + userID).set({
        name: username,
        score: score
    })
    userSet = true; // Confirm that the user has a Firebase Score
}

// User input event functions (for testing purposes)
$("#submit").click(function(event) {
    event.preventDefault(); // Keeps submit button from refreshing page
    var name = $("#name").val().trim();
    var score = parseInt($("#score").val().trim());
    if (isNaN(score) || name == null) {
        return;
    }
    else if (scoreData === null) {
        storeInitialScore(name, score);
    }
    else {
        storeNewScore(score);
    }
})