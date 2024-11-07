const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const skipButton = document.getElementById('skip-button');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');

let shuffledQuestions, currentQuestionIndex, score, skippedQuestions;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
});
skipButton.addEventListener('click', () => {
    skippedQuestions.push(shuffledQuestions[currentQuestionIndex]);
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endQuiz();
    }
});

function startQuiz() {
    startButton.classList.add('hide');
    skipButton.classList.remove('hide');
    scoreContainer.innerText = '';
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    skippedQuestions = [];
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex], currentQuestionIndex);
}

function showQuestion(question, index) {
    questionContainer.innerHTML = '';
    const questionElement = document.createElement('div');
    questionElement.innerText = `${index + 1}. ${question.question}`;
    questionContainer.appendChild(questionElement);

    question.answers.forEach((answer, idx) => {
        const button = document.createElement('button');
        button.innerText = `${answer.text}`;
        button.classList.add('btn');
        button.addEventListener('click', () => {
            selectAnswer(button, answer.correct);
        });
        answerButtons.appendChild(button);
    });

    nextButton.classList.remove('hide');
    skipButton.classList.remove('hide');
}

function resetState() {
    nextButton.classList.add('hide');
    skipButton.classList.add('hide');
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

let selectedButton = null;
let selectedButtonCorrect = null;

function selectAnswer(answer, correct) {
    if (selectedButton === answer) {
        // Deselect the button
        selectedButton.classList.remove('selected');
        selectedButton = null;
        selectedButtonCorrect = null;
    } else {
        // Deselect the previously selected button, if any
        if (selectedButton) {
            selectedButton.classList.remove('selected');
        }

        // Select the new button
        answer.classList.add('selected');
        selectedButton = answer;
        selectedButtonCorrect = correct;
    }

    // Update userSelectedOption for the current question
    shuffledQuestions[currentQuestionIndex].answers.forEach((ans) => {
        ans.selected = false;
    });
    shuffledQuestions[currentQuestionIndex].answers[answer.textContent.charCodeAt(0) - 65].selected = true;

    // Check the answer immediately after selecting it
    checkAnswer();
}

function checkAnswer() {
    if (selectedButton && selectedButtonCorrect) {
        score++;
    }

    nextButton.classList.remove('hide');
    skipButton.classList.remove('hide');
}

function endQuiz() {
    questionContainer.innerText = 'Quiz completed!';
    scoreContainer.innerText = `Final score: ${score}/${shuffledQuestions.length}`;

    // Display correct answers and user-selected options
    const results = document.createElement('div');
    results.classList.add('results');
    questions.forEach((question, index) => {
        const resultItem = document.createElement('div');
        const userSelectedOption = shuffledQuestions[index].answers.find(answer => answer.selected);
        if (userSelectedOption) {
            resultItem.innerText = `${index + 1}. ${question.question} - Correct Answer: ${question.answers.find(answer => answer.correct).text} | Your Answer: ${userSelectedOption.text}`;
        } else {
            resultItem.innerText = `${index + 1}. ${question.question} - Correct Answer: ${question.answers.find(answer => answer.correct).text} | You skipped this question`;
        }
        results.appendChild(resultItem);
    });
    questionContainer.appendChild(results);

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.classList.add('hide');
    skipButton.classList.add('hide');
    startButton.innerText = 'Restart Quiz';
    startButton.classList.remove('hide');
    startButton.addEventListener('click', () => {
        startButton.removeEventListener('click', startQuiz);
        startQuiz();
    });
}

const questions = [
    {
        question: 'Who was the first Prime Minister of India?',
        answers: [
            { text: 'A. Jawaharlal Nehru', correct: true },
            { text: 'B. Mahatma Gandhi', correct: false },
            { text: 'C. Sardar Vallabhbhai Patel', correct: false },
            { text: 'D. Rajiv Gandhi', correct: false }
        ]
    },
    {
        question: 'When did India gain independence from British rule?',
        answers: [
            { text: 'A. 1945', correct: false },
            { text: 'B. 1947', correct: true },
            { text: 'C. 1950', correct: false },
            { text: 'D. 1960', correct: false }
        ]
    },
    {
        question: 'Who is known as the "Father of the Indian Constitution"?',
        answers: [
            { text: 'A. Mahatma Gandhi', correct: false },
            { text: 'B. B.R. Ambedkar', correct: true },
            { text: 'C. Jawaharlal Nehru', correct: false },
            { text: 'D. Vallabhbhai Patel', correct: false }
        ]
    },
    {
        question: 'Which Indian king is known for his role in the Maurya Empire and spread of Buddhism?',
        answers: [
            { text: 'A. Chandragupta Maurya', correct: true },
            { text: 'B. Ashoka', correct: false },
            { text: 'C. Harsha', correct: false },
            { text: 'D. Samudragupta', correct: false }
        ]
    },
    {
        question: 'Who led the Salt March, also known as the Dandi March, in 1930?',
        answers: [
            { text: 'A. Jawaharlal Nehru', correct: false },
            { text: 'B. Mahatma Gandhi', correct: true },
            { text: 'C. Bhagat Singh', correct: false },
            { text: 'D. Subhas Chandra Bose', correct: false }
        ]
    }
];

