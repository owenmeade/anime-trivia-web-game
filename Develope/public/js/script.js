const api = "https://opentdb.com/api.php?amount=10&category=31";
const level = 1;
const strikes = 0;

function getTrivia() {
  fetch(api).then((response) =>
    response.json().then((data) => {
      const question = data.results[0].question;
      const incorrectAnswer = data.results[0].incorrectAnswer;
      const correctAnswer = data.results[0].correctAnswer;

      //display question
      document.getElementById("question").textContent = question;

      //show the answers, spilling incorrect answers
      const answers = [...incorrectAnswer, correctAnswer];

      //shuffle answers?
      const shuffleAnswers = shuffle(answers);

      //display answers under choices
      const choiceContainer = document.getElementById("choices");
      choiceContainer.innerHTML = "";

      shuffleAnswers.forEach((answer) => {
        const choice = document.createElement("li");
        choice.textContent = answer;
        choice.addEventListener("click", () => {
          selectAnswer(choice, correctAnswer);
        });
        choiceContainer.appendChild(choice);
      });
    })
  );
}

function selectAnswer(choice, correctAnswer) {
  if (!choice.classList.contains("selected")) {
    const selectedChoices = document.querySelectorAll("#choices li.selected");

    if (selectedChoices.length > 0) {
      selectedChoices.forEach((selectedChoice) => {
        selectedChoice.classList.remove("selected");
      });
    }
    choice.classList.add("selected");

    //check if selected answer is correct
    if (choice.textContent === correctAnswer) {
      level++;
      document.getElementById("level").textContent = `Level ${level}`;

      //check if all levels have been completed
      if (level > 10) {
        document.getElementById("question").textContent =
          "Congratulations! You passed all levels!";
        return;
      }

      //Next trivia question
      getTrivia();
    } else {
      strikes++;
      document.getElementById("strikeCount").textContent = strikes;
    }
  }
}
