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
var scoreOrderedList = []; // Contains the ordered list of scores and names

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

// This function will pull the scores from the database and sort into an array on the client
database.ref('Scores').orderByChild('score').on('value', function(scoreOrder) {
    var scoreBoardTemp = []; // Use this instead of pushing directly to global
    // Loops through the score object in order of the ascending score values of the children
    scoreOrder.forEach(function(child) {
        console.log(child.val());
        console.log(child.val().name);
        console.log(child.val().score);
        var scoreInstance = [child.val().name, child.val().score]; // Stores an array with both name and score
        scoreBoardTemp.push(scoreInstance); // Pushes above array onto a separate one for a 2D array
        })
        scoreOrderedList = scoreBoardTemp.reverse(); // Preserves current sorted score array without pushing on duplicates
        scoreOrderedList.length = 10; // Cut out extra values after the 12th score (scoreboard is top 10)
    }, function(error) {
        console.log("Error code: " + error.code);
    });

// This function does not need to be used and can be easily replaced, but is for the convenience of printing the score array.
// Replace with preferred function
function listScores() {
    for (i=0; i<scoreOrderedList.length; i++) {
        $("#scoreBoard").append('<h2>' + 'Name: ' + scoreOrderedList[i][0] + '\t' + 'Score: ' + scoreOrderedList[i][1]);
    }
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

// User input event functions (for testing purposes [for now])
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