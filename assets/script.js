var startButton = $("#start-button");
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
// vars for right/wrong answers
var rightText = $(".user-is-right");
var wrongText = $(".user-is-wrong");

// vars for timer
var timerEl = $("#timer");
var timer = 76;
var penalty = 5;
var score = 0;

// var for the scoreboard
var scoreBoard = $("#high-scores");
var userRecord = $("#user-record");
var userInitials = $("#user-initials");

// Default View
timerEl.hide();
scoreBoard.hide();
choicesDisplay.hide();
userRecord.hide();
rightText.hide();
wrongText.hide();

//EventListeners for StartQuiz, compareAsnwers, renderScores
startButton.on("click", startQuiz);
choicesDisplay.on("click", "button", compareAnswers);

// startQuiz:
// show timer, show multiChoice, set timer, if we run out of questions || timer === 0; run function endQuiz
function startQuiz(event) {
  event.preventDefault();
  startButton.hide();
  timerEl.show();
  choicesDisplay.show();
  displayQuestions();
  timer = 75;
  score = 0;
  questionIndex = 0;
  var quizTimer = setInterval(() => {
    timer--;
    timerEl.text("Time Remaining: " + timer + "s");

    if (timer === 0 || questionIndex === questionsArray.length) {
      clearInterval(quizTimer);
      var newH3 = $("<h3>", {
        class: "text-center w-auto py-4 text-dark",
      }).text("End of Quiz!");
      //   choicesDisplay.text("End of Quiz!");
      endQuiz();
    }
  }, 1000);
}

// displaying Quiz Contents!
function displayQuestions() {
  questionDisplay.empty();
  choicesDisplay.empty();

  //   for (var i = 0; i < questionsArray.length; i++) {
  var userQuestions = questionsArray[questionIndex].question;
  questionDisplay.text(userQuestions);
  //   }
  var userChoices = questionsArray[questionIndex].choices;
  for (var i = 0; i < userChoices.length; i++) {
    var multipleChoiceOp = userChoices[i];
    var newLi = $("<button>", {
      class: "btn btn-primary",
    }).text(multipleChoiceOp);
    choicesDisplay.append(newLi);
  }
}

//function for compareAsnwers
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
    wrongText.text("Wrong...😔 The Correct Answer is  " + rightAnswer);
    wrongText.show(function () {
      setTimeout(() => {
        wrongText.hide();
      }, 1000);
    });
  }
  if (questionIndex < questionsArray.length) {
    questionIndex++;
  }
  displayQuestions();
}

// function for endQuiz: display scores & local storage
function endQuiz() {
  questionDisplay.hide();
  scoreBoard.show();
  userRecord.show();
  clearInterval(timer);

  var initials = prompt(
    "Your Final Score is: " + timer + "Please enter your initials"
  );
  var currentScores = JSON.parse(localStorage.getItem("quizScore")) || [];
  var playerObj = {
    initials,
    timer,
  };
  currentScores.push(playerObj);
  localStorage.setItem("quizScore", JSON.stringify(currentScores));
  renderScores();
}

// function for retreiving scores
function renderScores() {
  var currentScores = JSON.parse(localStorage.getItem("quizScore")) || [];
  scoreBoard.empty();

  for (var i = 0; i < currentScores.length; i++) {
    var scoreObj = currentScores[i];
    var scoreLi = $("<li>", {
      class: "list-group-item",
    });
    scoreLi.text(scoreObj.initials + ":" + scoreObj.timer);
    scoreBoard.append(scoreLi);
    //   scoreBoard.text(userScore.initlas + timer);
  }
}
