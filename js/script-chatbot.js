const chatDisplay = document.getElementById('chat-display');
const userInput = document.getElementById('user-input');
const tryAgainButton = document.createElement('button');
let questions = [
    {
        question: 'Qual é a capital do Brasil?',
        options: ['Rio de Janeiro', 'São Paulo', 'Brasília', 'Salvador'],
        answer: 'Brasília'
    },
    {
        question: 'Qual é o maior planeta do sistema solar?',
        options: ['Júpiter', 'Vênus', 'Saturno', 'Marte'],
        answer: 'Júpiter'
    },
    {
        question: 'Quem pintou a Mona Lisa?',
        options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
        answer: 'Leonardo da Vinci'
    }
];
let currentQuestionIndex = 0;
let correctAnswers = 0;

window.addEventListener('DOMContentLoaded', function () {
    appendMessage('chatbot', 'Olá! Bem-vindo ao ChatBot. Responda as perguntas abaixo.');
    askQuestion();
});

function askQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionText = currentQuestion.question;
    const options = currentQuestion.options;

    appendMessage('chatbot', questionText);
    createOptionButtons(options);
}

function createOptionButtons(options) {
    userInput.innerHTML = '';

    options.forEach(function (option) {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', function () {
            checkAnswer(option);
        });
        userInput.appendChild(button);
    });
}

function createTryAgainButton() {
    tryAgainButton.textContent = 'Tentar Novamente';
    tryAgainButton.classList.add('try-again-button');
    userInput.appendChild(tryAgainButton);
    tryAgainButton.addEventListener('click', function () {

        currentQuestionIndex = 0;
        correctAnswers = 0;
        setTimeout(function () {
            userInput.style.gridTemplateColumns = "1fr 1fr";
            askQuestion();
        }, 1000);
    });
}

function checkAnswer(userAnswer) {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    appendMessage('user', userAnswer);

    let feedbackMessage = '';
    if (userAnswer === correctAnswer) {
        feedbackMessage = 'Resposta correta!';
        correctAnswers++;
    } else {
        feedbackMessage = 'Resposta incorreta!';
    }

    appendMessage('chatbot', feedbackMessage);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        userInput.classList.add('hidden');
        showLoadingMessage();

        setTimeout(function () {
            askQuestion();
            userInput.classList.remove('hidden');
            hideLoadingMessage();
        }, 1500);
    } else {
        showFinalResult();
    }
}

function showLoadingMessage() {
    const loadingMessage = document.createElement('div');
    loadingMessage.id = 'loading-message';
    loadingMessage.classList.add('loading-message');
    loadingMessage.textContent = 'Carregando...';
    chatDisplay.appendChild(loadingMessage);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

function hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

function showFinalResult() {
    const resultMessage = `Você acertou ${correctAnswers} de ${questions.length} perguntas.`;

    createTryAgainButton();

    userInput.innerHTML = '';
    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');
    resultContainer.appendChild(document.createTextNode(resultMessage));

    userInput.style.gridTemplateColumns = "1fr";
    userInput.appendChild(tryAgainButton);
    appendMessage('chatbot', resultContainer);
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    const messageBubble = document.createElement('div');
    messageBubble.classList.add('message-bubble');
    messageBubble.textContent = message instanceof HTMLElement ? '' : message;
    if (message instanceof HTMLElement) {
        messageBubble.appendChild(message);
    }
    messageElement.appendChild(messageBubble);
    chatDisplay.appendChild(messageElement);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}