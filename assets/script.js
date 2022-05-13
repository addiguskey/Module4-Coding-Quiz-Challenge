var startButton = $("#start-button");
var rightText = $(".user-is-right");
var wrongText = $(".user-is-wrong");
var questionDisplay = $("#questions");
var choicesDisplay = $("#where-choices-go");
var questionIndex = 0;
var questionsArray = [
  {
    question: "Commonly used data styles do NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    answer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    answer: "quotes",
  },
  {
    question:
      "A very useful tool for used during development and debugging for printing content to the debugger is:",
    choices: ["Javascript", "terminal / bash", "for loops", "console.log"],
    answer: "console.log",
  },
];
// var displayQuestion = ;

// vars for timer
var timerEl = $("#timer");
var timer = 76;
var penalty = 5;
var score = 0;

// var for scores
var scoreBoard = $("#high-scores");
var finalAlert = $("#final-alert");
var initialsBar = $("#initials-bar");
var initialsBtn = $("initials-btn");

timerEl.hide();
scoreBoard.hide();
choicesDisplay.hide();
initialsBar.hide();
rightText.hide();
wrongText.hide();
finalAlert.hide();

//when click/event listener for starting quiz
startButton.on("click", startQuiz);
choicesDisplay.on("click", "button", compareAnswers);
initialsBtn.on("click", renderScores);

function startQuiz(event) {
  event.preventDefault();
  startButton.hide();
  timerEl.show();
  choicesDisplay.show();
  displayQuestions();
  timer = 75;
  score = 0;
  var quizTimer = setInterval(() => {
    timer--;
    timerEl.text("Time Remaining: " + timer + "s");

    if (timer == 0 || questionIndex === questionsArray.length) {
      clearInterval(quizTimer);
      endQuiz();
      timerEl.text("End of Quiz!");
    }
  }, 1000);
}

function displayQuestions() {
  questionDisplay.empty();
  choicesDisplay.empty();

  for (var i = 0; i < questionsArray.length; i++) {
    var userQuestions = questionsArray[questionIndex].question;
    questionDisplay.text(userQuestions);
  }
  var userChoices = questionsArray[questionIndex].choices;
  for (var i = 0; i < userChoices.length; i++) {
    var multipleChoiceOp = userChoices[i];
    var newLi = $("<button>", {
      class: "btn btn-primary",
    }).text(multipleChoiceOp);
    choicesDisplay.append(newLi);
  }
}

//  //function for compareAsnwers

// INSERT IF WRONG ANSWER, DEDUCT 5SECS

function compareAnswers(event) {
  event.preventDefault();
  //   console.log($(this).text());
  var userClick = $(this).text();
  var rightAnswer = questionsArray[questionIndex].answer;
  if (userClick === rightAnswer) {
    rightText.show(function () {
      setTimeout(() => {
        rightText.hide();
      }, 1000);
    });
  } else {
    timer -= penalty;
    wrongText.show(function () {
      setTimeout(() => {
        wrongText.hide();
      }, 1000);
    });
  }
  questionIndex++;
  displayQuestions();
}

function endQuiz() {
  questionDisplay.hide();
  scoreBoard.show();
  //   startButton.show();
  initialsBar.show();
  clearInterval(timer);
  var presentFinalScore = scoreBoard.text("Your Final Score is: " + timer);
  var currentScores = JSON.parse(localStorage.getITem("finalscore")) || [];
  var userInfo = {
    initials,
    score,
  };
  currentScores.push(userInfo);
  localStorage.setItem("finalscore", JSON.stringify(currentScores));
  renderScores();
}

// **NEED SET ITEM FOR SCORES !!!
function renderScores(event) {
  event.preventDefault();
  var currentScores = JSON.parse(localStorage.getItem("finalscore")) || [];
  scoreBoard.empty();
  if (scoreBoard.legth === 0) {
    return scoreBoard.text("No Scores Yet!");
  }
  for (var i = 0; i < currentScores.length; i++) {
    var scoreObj = currentScores[i];
    var scoreLi = $("<li>", {
      class: "list-group-item",
    });
    scoreLi.text(scoreObj.initials + ":" + scoreObj.score);
    scoreBoard.append(scoreLi);
  }
}
