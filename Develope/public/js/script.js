const api = 'https://opentdb.com/api.php?amount=10&category=31';
const level = 1;
const strikes = 0;

function getTrivia() {
    fetch(api).then(response => response.json().then(data => {
        const question = data.results[0].question;
        const incorrectAnswer = data.results[0].incorrectAnswer;
        const correctAnswer = data.results[0].correctAnswer;

        //display question
        document.getElementById('question').textContent = question;

        //show the answers, spilling incorrect answers
        const answers = [...incorrectAnswer, correctAnswer];

        //shuffle answers?
        const shuffleAnswers = shuffle(answers);

        //display answers under choices
        const choiceContainer = document.getElementById('choices');
        choiceContainer.innerHTML = '';

        shuffleAnswers.forEach(answer => {
            const choice = document.createElement('li')
        })

    }))
}