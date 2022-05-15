var highScoreBtn = $("#high-scores");
var retakeBtn = $("#retake-btn");
var clearBtn = $("#clear-btn");

// Clear scores if wanted
clearBtn.on("click", function () {
  //   localStorage.clear();
  localStorage.empty();
  location.reload();
});
// Start from begining
retakeBtn.on("click", function () {
  window.location.replace(
    "https://addiguskey.github.io/Module4-Coding-Quiz-Challenge/"
  );
});
// Retreives local stroage and displays
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);
if (allScores !== null) {
  for (var i = 0; i < allScores.length; i++) {
    var createLi = $("<li>", {
      id: "high-score",
    });
    createLi.text(allScores[i].initials + " " + allScores[i].score);
    highScoreBtn.append(createLi);
  }
}
