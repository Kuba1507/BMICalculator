const personImage = document.querySelector(".image");
const maleBtn = document.querySelector(".male");
const femaleBtn = document.querySelector(".female");
const age = document.getElementById("age");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const calcBtn = document.querySelector(".calculate");
const warning = document.querySelector(".warning");
const shadowBg = document.querySelector(".shadow");
const resultPopup = document.querySelector(".result-popup");
const result = document.querySelector(".result");
const closeBtn = document.querySelector(".close-popup");
const characteristic = document.querySelector(".characteristic");
let bmi = 0;

const pressedMaleBtn = () => {
	maleBtn.classList.toggle("active");
	femaleBtn.classList.remove("active");
};

const pressedFemaleBtn = () => {
	femaleBtn.classList.toggle("active");
	maleBtn.classList.remove("active");
};

const changeImage = () => {
	if (maleBtn.classList.contains("active")) {
		personImage.src = "img/man.svg";
		toggleFading();
	} else if (femaleBtn.classList.contains("active")) {
		personImage.src = "img/woman.svg";
		toggleFading();
	} else {
		personImage.src = "img/gym.svg";
		toggleFading();
	}
};

const toggleFading = () => {
	personImage.classList.add("fading-image");
	setTimeout(
		(removeFading = () => {
			personImage.classList.remove("fading-image");
		}),
		1000
	);
};

const checkForm = () => {
	if (
		(maleBtn.classList.contains("active") ||
			femaleBtn.classList.contains("active")) &&
		height.value !== "" &&
		age.value !== "" &&
		weight.value !== ""
	) {
		if (age.value > 1 && age.value < 18) {
			warning.style.display = "block";
			warning.textContent =
				"Wskaźnika BMI nie należy stosować u dzieci i młodzieży, ponieważ podczas intensywnego rozwoju zmienia się zawartość tkanki tłuszczowej. Przyjmuje się, że kalkulator daje prawidłowy wynik dla osób powyżej 18. roku życia.";
		} else {
			warning.textContent = "";
			showResult();
		}
	} else {
		warning.style.display = "block";
		warning.textContent = "Uzupełnij wszystkie pola!";
	}
};

const showResult = () => {
	shadowBg.style.display = "block";
	resultPopup.style.transform = "translateY(0)";
	resultPopup.style.transition = "ease-in 1s";
	weightBmi = weight.value;
	heightBmi = height.value / 100;
	bmi = weightBmi / (heightBmi * heightBmi);

	if (bmi < 16) {
		result.style.color = "red"; //3 niedowaga
		characteristic.textContent = "III stopień niedowagi 😢";
	} else if (bmi >= 16 && bmi < 17) {
		result.style.color = "rgb(254, 150, 39)"; //2 niedowaga
		characteristic.textContent = "II stopień niedowagi 🥺";
	} else if (bmi >= 17 && bmi < 18.5) {
		result.style.color = "rgb(249, 249, 81)"; //1 niedowaga
		characteristic.textContent = "I stopień niedowagi 🙁";
	} else if (bmi >= 18.5 && bmi < 25) {
		result.style.color = "rgb(23, 199, 14)"; //prawidlowa
		characteristic.textContent = "Prawidłowa masa ciała 🤩";
	} else if (bmi >= 25 && bmi < 30) {
		result.style.color = "rgb(157, 161, 43)"; //nadwaga
		characteristic.textContent = "Nadwaga 😔";
	} else if (bmi >= 30 && bmi < 35) {
		result.style.color = "rgb(249, 249, 81)"; //1 otylosc
		characteristic.textContent = "I stopień otyłości 🙁";
	} else if (bmi >= 35 && bmi < 40) {
		result.style.color = "rgb(254, 150, 39)"; //2 otylosc
		characteristic.textContent = "II stopień otyłości 🥺";
	} else if (bmi > 40) {
		result.style.color = "red"; //3 otylosc
		characteristic.textContent = "III stopień otyłości 😢";
	}

	result.textContent = bmi.toFixed(2);
};

const resetForm = () => {
	maleBtn.classList.remove("active");
	femaleBtn.classList.remove("active");
	age.value = "";
	height.value = "";
	weight.value = "";
};

const closePopup = () => {
	shadowBg.style.display = "none";
	resultPopup.style.transform = "translateY(-850px)";
	resultPopup.style.transition = "ease-in 1s";
	resetForm();
};

maleBtn.addEventListener("click", () => {
	pressedMaleBtn();
	changeImage();
});

femaleBtn.addEventListener("click", () => {
	pressedFemaleBtn();
	changeImage();
});

calcBtn.addEventListener("click", checkForm);
closeBtn.addEventListener("click", closePopup);
