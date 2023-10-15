var quiz = document.getElementById('quiz');
var startBtn = document.getElementById('startBtn');
var end = document.getElementById('end');
var start = document.getElementById('start');
var quizQuestion = document.getElementById('quizQuestion');
var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var choice4 = document.getElementById('choice4');
var timer = document.getElementById('time');
var initials = document.getElementById('initialsTxt');
var userScore = document.getElementById('userScore');
var index = 0;

// Array of quiz questions
var questions = [
  {
    question: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    question: 'The condition in an if / else statement is enclosed within _____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    question: 'Arrays in JavaScript can be used to store _____.',
    choices: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
    answer: 'all of the above',
  },
  {
    question: 'String values must be enclosed within _____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
];

var time = questions.length * 12;
var timerInt;

// Function that starts the quiz
function quizStart() {
  start.classList.add('hide');
  quiz.classList.remove('hide');
  displayQuestion();
  choice1.addEventListener('click', questionAnswer);
  choice2.addEventListener('click', questionAnswer);
  choice3.addEventListener('click', questionAnswer);
  choice4.addEventListener('click', questionAnswer);
  startTimer();
}

// Function that starts the timer
function startTimer() {
  timerInt = setInterval(function () {
    time--;
    timer.textContent = time;

    if (time <= 0) {
      clearInterval(timerInt);
      gameover();
    }
  }, 1000);
}

// Function that handles user's answer to a question, and deducts time from the clock if the user answers incorrectly
function questionAnswer(event) {
  if (event.target.textContent === questions[index].answer) {
    console.log('correct');
  } else {
    console.log('incorrect');
    time -= 10;
  }

  index++;

  if (index >= questions.length) {
    gameover();
  } else {
    displayQuestion();
    clearInterval(timerInt);
    startTimer();
  }
}

// Function that displays the current question with corrresponding answer choices
function displayQuestion() {
  quizQuestion.textContent = questions[index].question;
  choice1.textContent = questions[index].choices[0];
  choice2.textContent = questions[index].choices[1];
  choice3.textContent = questions[index].choices[2];
  choice4.textContent = questions[index].choices[3];
}

// Function that ends the quiz and displays the user's score
function gameover() {
  end.classList.remove('hide');
  quiz.classList.add('hide');
  timer.parentElement.classList.add('hide');
  clearInterval(timerInt);
  end.querySelector('p').textContent = "Your score: " + time;
}

// Event listener for the submit button to store the user's initials and final time in localStorage
submitBtn.addEventListener('click', function() {
  var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  var newScore = {
    initials: initials.value,
    score: time
  };
  highScores.push(newScore);

  localStorage.setItem('highScores', JSON.stringify(highScores));

  initials.value = "";
  index = 0;
  time = questions.length * 12;
  end.classList.add('hide');
  start.classList.remove('hide');
});

startBtn.addEventListener('click', quizStart);
