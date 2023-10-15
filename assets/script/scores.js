// Retrieve scores from local storage
var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Sort the scores in descending order based on the score value
highScores.sort(function(a, b) {
  return b.score - a.score;
});

var scoreList = document.getElementById('scoreList');

// Generate HTML to display the scores
var scoresHTML = highScores
  .map(function(score, i) {
    if (i%2===0){
        return `<li class="evenScore">${score.initials}: ${score.score}</li>`;
    } else {
        return `<li class="oddScore">${score.initials}: ${score.score}</li>`;
    }
  })
  .join('');

// Set the HTML content of the scoreList element
scoreList.innerHTML = scoresHTML;