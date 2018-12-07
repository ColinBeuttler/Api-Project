$(document).ready(function () {

    // Global variables
    var card = $("#trivia");
    var timerNumber = 30;
    timer; //used for Set Interval


    //Array of 5 Marvel Characters with 5 questions and 3 choices

    var SpiderMan = [
        {
            name: "Spider-Man",
            question: "Q1?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Spider-Man",
            question: "Q2?",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },
        {
            name: "Spider-Man",
            question: "Q3?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "Spider-Man",
            question: "Q4?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Spider-Man",
            question: "Q5?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var IronMan = [
        {
            name: "IronMan",
            question: "Q1?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "IronMan",
            question: "Q2?",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },
        {
            name: "IronMan",
            question: "Q3?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "IronMan",
            question: "Q4?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "IronMan",
            question: "Q5?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var Avengers = [
        {
            name: "Avengers",
            question: "Q1?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Avengers",
            question: "Q2?",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },
        {
            name: "Avengers",
            question: "Q3?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "Avengers",
            question: "Q4?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "Avengers",
            question: "Q5?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var Thor = [
        {
            name: "Thor",
            question: "Q1?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },

        {
            name: "Thor",
            question: "Q2?",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },

        {
            name: "Thor",
            question: "Q3?",
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
            question: "Q5?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var CaptainAmerica = [
        {
            name: "CaptainAmerica",
            question: "Q1?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "CaptainAmerica",
            question: "Q2?",
            answers: ["A", "B", "C"],
            correctAnswer: "B"
        },
        {
            name: "CaptainAmerica",
            question: "Q3?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        },
        {
            name: "CaptainAmerica",
            question: "Q4?",
            answers: ["A", "B", "C"],
            correctAnswer: "A"
        },
        {
            name: "CaptainAmerica",
            question: "Q5?",
            answers: ["A", "B", "C"],
            correctAnswer: "C"
        }
    ];

    var game = {
        questions: 0,
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

        getnextQuestion: function () {

            // decrement timer by 1second
            timer = setInterval(game.countdown, 1000);

            //get next question from array to display via HTML element
            card.html("<h2>" + questions[this.questionNum].question + "</h2>");

            //get answers from questions array to display via HTML element
            for (var i = 0; i < questions[this.questionNum].answers.length; i++) {
                card.append("<button class='answer-button' id='button' data-name='" + questions[this.questionNum].answers[i] + "'>" + questions[this.questionNum].answers[i] + "</button>");
            }
        },

        updateQuestion: function () { //increment question and timer counters
            game.timerCnt = timerNumber; //reset back to 30
            $("#counter-number").text(game.timerCnt)
            game.questionNum++; //next question number
            game.getnextQuestion();
        },

        timesUp: function () {
            //reset the timer
            clearInterval(timer);
            $("#counter-number").html(game.timerCnt);

            card.html("<h2>Time is up!</h2>");
            card.append("<h3>The Correct Answer was: " + questions[this.questionNum].correctAnswer);

            //check if max questions (5) reached and if so display game results   
            if (game.questionNum === questions.length - 1) {
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

            card.html("<h3>Game over. Your results:</h3>");

            $("#counter-number").text(game.timerCnt);
            card.append("<h3>Correct Answers: " + game.rightAnswers + "</h3>");
            card.append("<h3>Incorrect Answers: " + game.wrongAnswers + "</h3>");
            // Call ScoreboardDisplay(UserName, game.rightAnswers); 
        },

        clicked: function (e) { //Check for right answer
            clearInterval(timer);

            if ($(e.target).attr("data-name") === questions[this.questionNum].correctAnswer) {
                clearInterval(timer);
                game.rightAnswers++; //increase right answer count
                card.html("<h2>Correct!</h2>");

                if (game.questionNum === questions.length - 1) {
                    setTimeout(game.GameOver, 3 * 1000);
                }
                else {
                    setTimeout(game.updateQuestion, 3 * 1000);
                }
            }

            else {
                clearInterval(timer);
                game.wrongAnswers++;

                card.html("<h2>Incorrect Answer!</h2>");
                card.append("<h3>The Correct Answer was: " + questions[game.questionNum].correctAnswer + "</h3>");

                if (game.questionNum === questions.length - 1) {
                    setTimeout(game.GameOver, 3 * 1000);
                }
                else {
                    setTimeout(game.updateQuestion, 3 * 1000);
                }
            }
        },

        GetUsername() {
            //function to get the User Name and save it for ScoreboardDisplay to display at end of game
            console.log("Call GetUsername" + userName);
        },

        ScoreboardDisplay(userName, score) {
            //Pass UserName strong and score (= rightAnswers) to store in persistent database and display
            console.log("Call ScoreboardDisplay");
        }

    };

    // MAIN CODE-Start on Click of start button, or     check for answer to questions

    $(document).on("click", ".answer-button", function (e) {
        game.clicked(e);
    });

    $(document).on("click", "#thor", function () {
        $("#timer-body").prepend("<h3>Time Remaining: <span id='counter-number'>30</span> Seconds</h3>");
        console.log("Thor Questions");
        game.questions = Thor;
        game.getnextQuestion();
    });   
    
    $(document).on("click", "#spiderman", function () {
        $("#timer-body").prepend("<h3>Time Remaining: <span id='counter-number'>30</span> Seconds</h3>");
        console.log("Spider Man Questions");
        game.questions = SpiderMan;
        game.getnextQuestion();
    });

    $(document).on("click", "#ironman", function () {
        $("#timer-body").prepend("<h3>Time Remaining: <span id='counter-number'>30</span> Seconds</h3>");
        console.log("Iron Man Questions");
        game.questions = IronMan;
        game.getnextQuestion();
    });

    $(document).on("click", "#avengers", function () {
        $("#timer-body").prepend("<h3>Time Remaining: <span id='counter-number'>30</span> Seconds</h3>");
        console.log("Avenger Questions");
        game.questions = Avengers;
        game.getnextQuestion();
    });

    $(document).on("click", "#captainamerica", function () {
        $("#timer-body").prepend("<h3>Time Remaining: <span id='counter-number'>30</span> Seconds</h3>");
        console.log("Captain America Questions");
        game.questions = CaptainAmerica;
        game.getnextQuestion();
    });





}); 