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
    });
    
    // This function will pull the scores from the database and sort into an array on the client
    database.ref('Scores').orderByChild('score').on('value', function(scoreOrder) {
        var scoreBoardTemp = []; // Use this instead of pushing directly to global
        // Loops through the score object in order of the ascending score values of the children
        scoreOrder.forEach(function(child) {
            // console.log(child.val());
            // console.log(child.val().name);
            // console.log(child.val().score);
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
    };
    
    // Function for updating the user's score data without using overwrites
    function storeNewScore(score) { 
        if (scoreData.score < score) {
            database.ref("Scores/" + userID).update({
                score: score
            })
        }
    };
    
    // Function for storing and setting the initial score
    function storeInitialScore(username, score) {
        database.ref("Scores/" + userID).set({
            name: username,
            score: score
        })
        userSet = true; // Confirm that the user has a Firebase Score
    };
    
    
    
$(document).ready(function () {
   
    // Global variables
    var card = $("#trivia");
    var timerNumber = 30;
    var timer; //used for Set Interval
    var character = "";
    var questions = 5;

    //Array of 5 Marvel Character Objects with 5 questions and 3 choices

    var SpiderMan = [
        {
            name: "Spider-Man",
            question: "Q1? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Spider-Man",
            question: "Q2? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },
        {
            name: "Spider-Man",
            question: "Q3? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "Spider-Man",
            question: "Q4? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Spider-Man",
            question: "Q5? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var IronMan = [
        {
            name: "IronMan",
            question: "Q1? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "IronMan",
            question: "Q2? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },
        {
            name: "IronMan",
            question: "Q3? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "IronMan",
            question: "Q4? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "IronMan",
            question: "Q5? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var Avengers = [
        {
            name: "Avengers",
            question: "What is the title of the new Avengers 4 movie coming May 3, 2019? <br>",
            answers: ["Avengers Infinity War Part II", "Avengers: Hawkeye Returns", "Avengers: Endgame"],
            correctAnswer: "Avengers: Endgame"
        },
        {
            name: "Avengers",
            question: "Q2? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },
        {
            name: "Avengers",
            question: "Q3? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "Avengers",
            question: "Q4? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Avengers",
            question: "Q5? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var Thor = [
        {
            name: "Thor",
            question: "Q1? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },

        {
            name: "Thor",
            question: "Q2? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },

        {
            name: "Thor",
            question: "Q3? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "Thor",
            question: "Q4?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Thor",
            question: "Q5? <br>",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var CaptainAmerica = [
        {
            name: "CaptainAmerica",
            question: "What is Captain America's Shield made of? <br>",
            answers: ["Titanium", "Vibranium", "Aluminum"],
            correctAnswer: "Vibranium"
        },
        {
            name: "CaptainAmerica",
            question: "What is the Captain's real name? <br>",
            answers: ["Mike Smith", "Chris Pratt", "Steve Rogers"],
            correctAnswer: "Steve Rogers"
        },
        {
            name: "CaptainAmerica",
            question: "What does Captain America do to hit something (or someone) far away? <br>",
            answers: ["Throws his shield", "Uses his boomarang", "Flies there"],
            correctAnswer: "Throws his shield"
        },
        {
            name: "CaptainAmerica",
            question: "Who is Captain America feuding with in Captain America: Civil War? <br>",
            answers: ["The Hulk", "Thor", "Tony Stark (Iron Man)"],
            correctAnswer: "Tony Stark (Iron Man)"
        },
        {
            name: "CaptainAmerica",
            question: "What gives Captain America his super-human strength and athleticism? <br>",
            answers: ["Blood transfusion", "Super soldier serum", "Genes from his father <br>"],
            correctAnswer: "Super soldier serum"
        }
    ];

    var game = {
        character: Thor,
        questionNum: 0,
        timerCnt: timerNumber, //set to 30 
        rightAnswers: 0,
        wrongAnswers: 0,
        userName: "TEST",
        score: 0,

        countdown: function () {
            game.timerCnt--;
            $("#counter-number").text(game.timerCnt); //get current timer count on page
            if (game.timerCnt === 0) {
                game.timesUp();
            }
        },

        getnextQuestion: function (c) {
            // passing in the character object pointer: c
            // Update game.character object
            game.character = c;
            console.log("character value in getextQuestion:" + game.character);

            // decrement timer by 1second
            timer = setInterval(game.countdown, 1000);

            //get next question from array to display via HTML element
            card.html(c[game.questionNum].question);

            //get answers from questions array to display via HTML element
            for (var i = 0; i < c[game.questionNum].answers.length; i++) {
                card.append("<button class='answer-button' id='button' data-name='" + c[game.questionNum].answers[i] + "'>" + c[game.questionNum].answers[i] + "</button>");
            }
        },

        updateQuestion: function () { //increment question and timer counters
            game.timerCnt = timerNumber; //reset back to 30 seconds toanswer
            $("#counter-number").text(game.timerCnt)

            game.questionNum++; //next question number
            game.getnextQuestion(character);
        },

        timesUp: function () {
            //reset the timer
            clearInterval(timer);
            $("#counter-number").html(game.timerCnt);

            card.html("Time is up!");
            card.append("The Correct Answer was: " + character[game.questionNum].correctAnswer);

            //check if max questions (5) reached and if so display game results   
            if (game.questionNum === questions - 1) {
                //wait 3 seconds and print game results
                setTimeout(game.GameOver, 3 * 1000);
            }
            else {
                //get next question
                setTimeout(game.updateQuestion, 3 * 1000);
            }
        },

        GameOver: function () {

            clearInterval(timer);
            game.questionNum = 0; //reset question # counter back to 0

            //clear timer area of screen
            $("#timer-body").empty();
            
            // Create a form for entering username
            var userNameSubmitDiv = $("<div>");
            userNameSubmitDiv.attr("id", "userName");
            var userNameSubmitForm = $("<form>");
            userNameSubmitForm.attr("id", "userForm");
            $("body").append(userNameSubmitDiv);
            $("#userName").append(userNameSubmitForm);
            $("<input type='text' id='typeName'>").appendTo("#userForm");
            $("<input type='submit' value='Enter Username' id='submitUser'>").appendTo("#userForm");

            // Only finish the rest of the game over state when the username is submitted
            $("#submitUser").click(function(event) {
                event.preventDefault();
                game.userName = $("#typeName").val().trim();
                // Store score to Firebase Database (and get username if needed)
                if (scoreData === null) {
                    storeInitialScore(game.userName, game.rightAnswers);
                }
                else {
                    storeNewScore(game.rightAnswers);
                }
                // Delete the form elements so that the event cannot be reused until next gameover
                $("#userName").empty();

                card.html("Game over. Your results: <br>");

                //$("#counter-number").text(game.timerCnt);

                card.append("Correct Answers: " + game.rightAnswers + "<br>");
                card.append("Incorrect Answers: " + game.wrongAnswers + "<br>" );
                // Call ScoreboardDisplay(UserName, game.rightAnswers);
                
                listScores();

                // reset game
            })
        },

        clicked: function (e) { //Check for right answer
            clearInterval(timer);

            if ($(e.target).attr("data-name") === character[game.questionNum].correctAnswer) {
                clearInterval(timer);

                game.rightAnswers++; //increase right answer count
                card.html("Correct! <br>");

                if (game.questionNum === questions - 1) {
                    setTimeout(game.GameOver, 3 * 1000);
                }
                else {
                    setTimeout(game.updateQuestion, 3 * 1000);
                }
            }

            else {
                clearInterval(timer);
                game.wrongAnswers++;

                card.html("Incorrect Answer! <br>");
                card.append("The Correct Answer was: " + character[game.questionNum].correctAnswer + "<br>");

                if (game.questionNum === questions - 1) {
                    setTimeout(game.GameOver, 3 * 1000);
                }
                else {
                    setTimeout(game.updateQuestion, 3 * 1000);
                }
            }
        },

        GetUsername() {
            //function to get the User Name and save it for ScoreboardDisplay to display at end of game
            console.log("Call GetUsername" + game.userName);
        },

        ScoreboardDisplay() {
            //Pass UserName  and score (= rightAnswers) to store in persistent database and display
            console.log("Call ScoreboardDisplay" + game.rightAnswers);
        }

    };

    // MAIN CODE-Start on Click of character button, or check for answer to questions

    console.log("start");

    $(document).on("click", ".answer-button", function (e) {
        game.clicked(e);
    });

    $(document).on("click", "#thor", function () {
        console.log("Thor Questions");

        $("#timer-body").prepend("Time Remaining: <span id='counter-number'>30</span> Seconds");

        character = Thor;
        game.getnextQuestion(character);
    });

    $(document).on("click", "#spiderman", function () {
        console.log("Spider Man Questions");

        $("#timer-body").prepend("Time Remaining: <span id='counter-number'>30</span> Seconds");

        character = SpiderMan;
        console.log("Character=" + character);
        game.getnextQuestion(character);
    });

    $(document).on("click", "#ironman", function () {
        $("#timer-body").prepend("Time Remaining: <span id='counter-number'>30</span> Seconds");
        console.log("Iron Man Questions");

        character = IronMan;
        game.getnextQuestion(character);
    });

    $(document).on("click", "#avengers", function () {
        $("#timer-body").prepend("Time Remaining: <span id='counter-number'>30</span> Seconds");
        console.log("Avenger Questions");

        character = Avengers;
        game.getnextQuestion(character);
    });

    $(document).on("click", "#captainamerica", function () {
        $("#timer-body").prepend("Time Remaining: <span id='counter-number'>30</span> Seconds");
        console.log("Captain America Questions");

        character = CaptainAmerica;
        game.getnextQuestion(character);
    });

});
