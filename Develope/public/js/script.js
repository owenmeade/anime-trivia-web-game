const api = "https://opentdb.com/api.php?amount=10&category=31";
let level = 1;
const strikes = 0;
let correctAnswer;

function getTrivia() {
  fetch(api).then((response) =>
    response
      .json()
      .then((data) => {
        //Retrieve question, incorrect answers, and correct answer based on current level
        const question = data.results[level - 1].question;
        const incorrectAnswers = data.results[level - 1].incorrect_answers;
        correctAnswer = data.results[level - 1].correct_answer;
        console.log(data.results)

        //Display the question
        document.getElementById("question").textContent = question.replaceAll('&quot;', '"');

        //Show the answers, including incorrect answers and correct answers
        const answers = [...incorrectAnswers, correctAnswer];

        //Shuffle the answers
        // const shuffleAnswers = shuffle(answers);

        //Display answers under choices
        const choiceContainer = document.getElementById("choices-container");
        choiceContainer.innerHTML = "";

        answers.forEach((answer) => {
          const choice = document.createElement("button");
          choice.textContent = answer;
          choice.classList.add("choice");
          choice.addEventListener("click", () => {
            selectAnswer(choice);
      });
          choiceContainer.appendChild(choice);
        });
        clearSelectedChoice();
      })
      .catch((error) => {
        console.log("Error fething trivia questions:", error);
        //Display error message to the user
        document.getElementById("question").textContent =
          "Failed to fetch trivia questions.";
      })
  );
    } 

//Event listener for start button
document.getElementById("startButton").addEventListener("click", () => {
  //Start initial trivia questions
  getTrivia();
});

//Event listener for answer submission
document.getElementById("submit").addEventListener("click", validateAnswer);


function selectAnswer(choice) {
  if (!choice.classList.contains("selected")) {
    const selectedChoices = document.querySelectorAll(".choice.selected");

    
    selectedChoices.forEach((selectedChoice) => {
        selectedChoice.classList.remove("selected");
      });
    
      choice.classList.add("selected");
    }
  }

function validateAnswer() {
  const choices = document.querySelectorAll(".choice");
  let selectedAnswer;

  choices.forEach((choice) => {
    if (choice.classList.contains("selected")) {
      selectedAnswer = choice.textContent;
      }
    });

      if (selectedAnswer) {
    //Retrieves the correct answer from API based on current level
    // const correctAnswer = data.results[level - 1].correct_answer;

    //Check if selected answer is correct
        if (selectedAnswer === correctAnswer) {
          level++;
          document.getElementById("level").textContent = `Level ${level}`;

      //Check if all levels have been completed
      if (level > 10) {
        document.getElementById("question").textContent =
          "Congratulations! You passed all levels!";
        return;
      }

      //Fetch the next trivia question
      getTrivia();
    } else {
      //Increment strikes
      strikes++;
      document.getElementById("strikeCount").textContent = `Strikes: ${strikes}`;

      //Checks if player has reached maximum strikes
      if (strikes >= 3) {
        //Display game over message
        document.getElementById("question").textContent = "Game Over!";
        return;
      }
      //Display strike message
      document.getElementById("question").textContent =
        "Incorrect answer. Try again.";

      //Fetch new trivia question
      getTrivia();
    }
  } else {
    //No answer selected
    console.log("Please select an answer");
  }
}

function clearSelectedChoice() {
  const selectedChoices = document.querySelectorAll(".choice.selected");
  selectedChoices.forEach((selectedChoice) => {
    selectedChoice.classList.remove("selected");
  });
}

//Helper funtion to shuffle answers
// function shuffle(array) {
//   let currentIndex = array.length;
//   let temporaryValue;
//   let randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;

//     temporaryValue = array[currentIndex];
//     array[currentIndex] = array[randomIndex];
//     array[randomIndex] = temporaryValue;
//   }
//   return array;
// }
