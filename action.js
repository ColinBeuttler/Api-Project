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

            card.html("Game over. Your results: <br>");

            //$("#counter-number").text(game.timerCnt);

            card.append("Correct Answers: " + game.rightAnswers + "<br>");
            card.append("Incorrect Answers: " + game.wrongAnswers + "<br>" );
            // Call ScoreboardDisplay(UserName, game.rightAnswers); 
            // reset game
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