const question = document.querySelector(".question");

const answers = document.querySelector(".answers");

const spanQtd = document.querySelector(".spanQtd");

const textFinish = document.querySelector(".text-finish");

const content = document.querySelector(".container-quiz-question");

const contentFinish = document.querySelector(".finish");

const restartButton = document.querySelector(".restart-button");

const nextQuestionButton = document.getElementById("next-question");

const feedbackButton = document.querySelector("#feedback");

const correctResponse = document.querySelector("#correct-response");





import questions from "./questions-quiz.js";



let currentIndex = 0;

let questionsCorrect = 0;



restartButton.onclick = () => {

	content.style.display = "grid";

	contentFinish.style.display = "none";



	currentIndex = 0;

	questionsCorrect = 0;

	loadQuestion();

};



feedbackButton.onclick = () => {

	let correctResponse = document.getElementById("correct-response");

	let answers = document.querySelectorAll(".answer");

	let correctAnswer = getCorrectAnswer(answers);



	correctResponse.classList.toggle("d-none");

	correctResponse.innerHTML = correctAnswer.innerText;

}



function changeCorrectAnswer() {
	let correctResponse = document.getElementById("correct-response");
	let answers = document.querySelectorAll(".answer");
	let correctAnswer = getCorrectAnswer(answers);
	correctResponse.innerHTML = correctAnswer.innerText;
}

function getCorrectAnswer(items) {
	let result;
	items.forEach(item => {
		if (item.getAttribute("data-correct") == "true") {
			result = item;
		}
	})
	return result;
}

nextQuestionButton.onclick = () => {
	if (!nextQuestionButton.classList.contains("alert")) {
		Swal.fire({
			icon: 'info',
			title: 'Ops!',
			text: 'Você esqueceu de responder a questão!',
			confirmButtonColor: "#7066E0",
			iconColor: "#7066E0",
			width: "300px"
		})
		return;
	}

	correctResponse.classList.add("d-none");
	feedbackButton.classList.remove("d-block");
	feedbackButton.classList.add("d-none");
	nextQuestionButton.classList.remove("alert");

	if (currentIndex < questions.length - 1) {
		currentIndex++;
		loadQuestion();
	} else {
		console.log(questionsCorrect)
		finish();
	}
}



function finish() {
	textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length} questões!`;
	content.style.display = "none";
	contentFinish.style.display = "grid";
}



function shuffleArray(array) {
	// Loop em todos os elementos
	for (let i = array.length - 1; i > 0; i--) {
		// Escolhendo elemento aleatório
		const j = Math.floor(Math.random() * (i + 1));

		// Reposicionando elemento
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}



function loadQuestion() {
	spanQtd.innerHTML = `Questão ${currentIndex + 1}/${questions.length}`;
	let item = questions[currentIndex];
	item.answers = shuffleArray(item.answers);
	answers.innerHTML = "";
	question.innerHTML = item.question;

	item.answers.forEach((answer) => {
		let { option } = answer;
		let index = item.answers.findIndex(item => item.option === option);
		let letter = findLetter(index);
		const div = document.createElement("div");
		const button = document.createElement("button");

		button.setAttribute("class", "answer");
		button.setAttribute("data-correct", answer.correct);
		button.innerText = `${letter}) ${answer.option}`;
		button.addEventListener('click', function () {
			nextQuestionButton.classList.add("alert");
			feedbackButton.classList.add("d-block")

			disableAnswers();

			if (answer.correct) {
				questionsCorrect++;
				button.classList.remove("answer");
				button.classList.add("correct-answer");
			}

			if (!answer.correct) {
				button.classList.remove("answer");
				button.classList.add("wrong-answers");
			}

		});

		div.appendChild(button);

		answers.appendChild(div);

	});

	changeCorrectAnswer();

}

function disableAnswers() {
	let answers = document.querySelectorAll(".answer");
	answers.forEach(item => {
		item.setAttribute("disabled", "true");
		item.classList.remove("answer");
		item.classList.add("button-disabled");
		console.log(item);
	});
}

function findLetter(index) {

	if (index === 0) return "a";

	if (index === 1) return "b";

	if (index === 2) return "c";

	if (index === 3) return "d";

	if (index === 4) return "e";

}



shuffleArray(questions);

loadQuestion();