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
        question: 'What does HTML stand for?',
        answers: [
            { text: 'A. Hyper Text Markup Language', correct: true },
            { text: 'B. Hyperlinks and Text Markup Language', correct: false },
            { text: 'C. Home Tool Markup Language', correct: false },
            { text: 'D. Hyper Tool Markup Language', correct: false }
        ]
    },
    {
        question: 'Which programming language is known as the "mother of all languages"?',
        answers: [
            { text: 'A. C', correct: true },
            { text: 'B. Java', correct: false },
            { text: 'C. Python', correct: false },
            { text: 'D. COBOL', correct: false }
        ]
    },
    {
        question: 'What is the process of finding errors and fixing them within a program?',
        answers: [
            { text: 'A. Debugging', correct: true },
            { text: 'B. Compiling', correct: false },
            { text: 'C. Coding', correct: false },
            { text: 'D. Testing', correct: false }
        ]
    },
    {
        question: 'What does CSS stand for?',
        answers: [
            { text: 'A. Computer Style Sheets', correct: false },
            { text: 'B. Creative Style Sheets', correct: false },
            { text: 'C. Cascading Style Sheets', correct: true },
            { text: 'D. Colorful Style Sheets', correct: false }
        ]
    },
    {
        question: 'Which data structure uses LIFO (Last In, First Out) order?',
        answers: [
            { text: 'A. Queue', correct: false },
            { text: 'B. Stack', correct: true },
            { text: 'C. Linked List', correct: false },
            { text: 'D. Tree', correct: false }
        ]
    }
];

