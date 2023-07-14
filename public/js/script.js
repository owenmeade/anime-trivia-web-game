document.addEventListener("DOMContentLoaded", () => {
  const api = "https://opentdb.com/api.php?amount=10&category=31";
  let level = 1;
  let strikes = 0;
  let data;

  function getTrivia() {
    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        data = responseData;
        //Retrieve question, incorrect answers, and correct answer based on current level
        const question = data.results[level - 1].question;
        const incorrectAnswers = data.results[level - 1].incorrect_answers;
        const correctAnswer = data.results[level - 1].correct_answer;

        //Display the question
        document.getElementById("question").innerHTML = question;

        //Show the answers, including incorrect answers and correct answers
        const answers = [...incorrectAnswers, correctAnswer];

        //Shuffle the answers
        const shuffleAnswers = shuffle(answers);

        //Display answers under choices
        const choiceContainer = document.getElementById("choices");
        choiceContainer.innerHTML = "";

        shuffleAnswers.forEach((answer) => {
          const choice = document.createElement("button");
          choice.innerHTML = answer;
          choice.addEventListener("click", () => {
            selectAnswer(choice);
          });
          choiceContainer.appendChild(choice);
        });

        document.getElementById("level").textContent = `Level ${level}`;
        document.getElementById("strikeCount").textContent = strikes;
        clearSelectedChoice();
      })
      .catch((error) => {
        console.log("Error fetching trivia questions:", error);
        document.getElementById("question").textContent =
          "Failed to fetch trivia questions.";
      });
  }

  //Event listener for start button
  document.getElementById("startButton").addEventListener("click", () => {
    // Hide the startKey main section
    document.querySelector(".startKey").style.display = "none";
    // Display the trivia section
    document.querySelector(".trivia").style.display = "block";
    //Start initial trivia questions
    getTrivia();
  });

  //Event listener for answer submission
  document.getElementById("submit").addEventListener("click", () => {
    validateAnswer();
  });
  
  function selectAnswer(choice) {
    if (!choice.classList.contains("selected")) {
      const selectedChoices = document.querySelectorAll("#choices button.selected");

      if (selectedChoices.length > 0) {
        selectedChoices.forEach((selectedChoice) => {
          selectedChoice.classList.remove("selected");
        });
      }
      choice.classList.add("selected");
    }
  }

  function validateAnswer() {
    const choices = document.querySelectorAll("#choices button");
    let selectedAnswer;
  
    choices.forEach((choice) => {
      if (choice.classList.contains("selected")) {
        selectedAnswer = choice.innerHTML;
      }
    });
  
    if (selectedAnswer) {
      // Retrieves the correct answer from API based on current level
      const correctAnswer = data.results[level - 1].correct_answer;
  
      // Check if selected answer is correct
      if (selectedAnswer === correctAnswer) {
        level++; // Increase the level
      } else {
        strikes++; // Increase the number of strikes
      }
  
      // Checks if player has reached maximum strikes
      if (strikes >= 3) {
        document.getElementById("question").textContent = "Game Over!";
        document.getElementById("retryButton").style.display = "block";
        document.getElementById("retryButton").addEventListener("click", () => {
          level = 1;
          strikes = 0;
          getTrivia();
          document.getElementById("retryButton").style.display = "none";
        });
      

        // // Hide choices and submit button
        // document.getElementById("choices").style.display = "none";
        // document.getElementById("submit").style.display = "none";
        // // Display the start button
        // document.getElementById("startButton").style.display = "block";

        return;
      }
  
      // Check if all levels have been completed
      if (level >= 10) {
        document.getElementById("question").textContent =
          "Congratulations! You passed all levels!";
          document.getElementById("retryButton").style.display = "block";
          document.getElementById("retryButton").addEventListener("click", () => {
            level = 1;
            strikes = 0;
            getTrivia();
            document.getElementById("retryButton").style.display = "none";
          });

        // // Hide choices, and submit button
        // document.getElementById("choices").style.display = "none";
        // document.getElementById("submit").style.display = "none";
        // // Display the start button
        // document.getElementById("startButton").style.display = "block";

        return;
      }
  
      // Fetch the next trivia question
      getTrivia();
    } else {
      // No answer selected
      console.log("Please select an answer");
    }
  }
  

  function clearSelectedChoice() {
    const selectedChoices = document.querySelectorAll("#choices button.selected");
    selectedChoices.forEach((selectedChoice) => {
      selectedChoice.classList.remove("selected");
    });
  }

  //Helper funtion to shuffle answers
  function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
});
