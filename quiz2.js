function startQuiz(quizCategory) {
    currentQuiz = quizCategory;
    document.getElementById('quiz-title').innerText = `${quizCategory} Quiz`;
    document.getElementById('quiz-container').classList.remove('hide');
    document.getElementById('start-button').classList.add('hide');
    document.getElementById('next-button').classList.add('hide');
    document.getElementById('skip-button').classList.add('hide');
    document.getElementById('score-container').innerText = '';
    resetState();

    // Load questions based on the selected category
    switch (quizCategory) {
        case 'General Knowledge':
            shuffledQuestions = GKquestions.sort(() => Math.random() - 0.5);
            break;
        case 'History':
            shuffledQuestions = Historyquestions.sort(() => Math.random() - 0.5);
            break;
        case 'Computer Science':
            shuffledQuestions = CSquestions.sort(() => Math.random() - 0.5);
            break;
        case 'Information Technology':
            shuffledQuestions = ITquestions.sort(() => Math.random() - 0.5);
            break;
        default:
            shuffledQuestions = [];
    }

    currentQuestionIndex = 0;
    score = 0;
    skippedQuestions = [];
    questionContainer.classList.remove('hide');
    setNextQuestion();
}





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
        question: 'What is 2 + 2?',
        answers: [
            { text: 'A. 4', correct: true },
            { text: 'B. 5', correct: false },
            { text: 'C. 6', correct: false },
            { text: 'D. 7', correct: false }
        ]
    },
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'A. London', correct: false },
            { text: 'B. Paris', correct: true },
            { text: 'C. Berlin', correct: false },
            { text: 'D. Madrid', correct: false }
        ]
    },
    {
        question: 'What is the capital of Spain?',
        answers: [
            { text: 'A. London', correct: false },
            { text: 'B. Paris', correct: false },
            { text: 'C. Berlin', correct: false },
            { text: 'D. Madrid', correct: true }
        ]
    },
    {
        question: 'Who wrote Romeo and Juliet?',
        answers: [
            { text: 'A. Shakespeare', correct: true },
            { text: 'B. Mark Twain', correct: false },
            { text: 'C. Jane Austen', correct: false },
            { text: 'D. Charles Dickens', correct: false }
        ]
    }
];
