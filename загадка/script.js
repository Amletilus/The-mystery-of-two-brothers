document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("question-form");
    const resultElement = document.getElementById("result");
    const animationElement = document.getElementById("animation");

    // Массивы с ключевыми словами
    const brotherWords = ["брат", "брата", "брату", "другого", "второго","братьев"];
    const locationWords = ["сокровище", "сокровища", "ловушки", "ловушка", "сокровищами", "сокровищем"];
    const indicationWords = ["куда", "какую", "которую", "какая"];
    const doorsWords = ["дверь", "дверью"];

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const question = document.getElementById("question").value;
        const cleanedQuestion = question.replace(/[.,\/#!$%\^&\*;:{}=\?-_`~()]/g, "");
        const words = cleanedQuestion.toLowerCase().split(" ");
        const correctPercent = countCorrectWords(words);
     
        resultElement.textContent = `Ваш ответ верен на ${correctPercent}%`;

        switch (correctPercent) {
            case 0:
                resultElement.style.color = "red";
                break;
            case 25:
                resultElement.style.color = "orange";
                break;
            case 50:
                resultElement.style.color = "yellow";
                break;
            case 75:
                resultElement.style.color = "lightgreen";
                break;
            case 100:
                resultElement.style.color = "green";
                resultElement.textContent = "Правильный ответ!";
                showAnimation();
                break;
        }
    });

    function countCorrectWords(words) {
        let correctBrotherWords = checkWords(words, brotherWords) ? 1 : 0;
       // console.log(correctBrotherWords);
        let correctLocationWords = checkWords(words, locationWords) ? 1 : 0;
       // console.log(correctLocationWords);
        let correctIndicationWords = checkWords(words, indicationWords) ? 1 : 0;
      // console.log(correctIndicationWords);
        let correctDoorsWords = checkWords(words, doorsWords) ? 1 : 0;
       // console.log(correctDoorsWords);

        // Общее количество категорий ключевых слов
        let totalCategories = 4;

        // Количество совпадений во всех категориях
        let totalCorrectWords = correctBrotherWords + correctLocationWords + correctIndicationWords + correctDoorsWords;

        // Процент правильных совпадений
        let correctPercent = (totalCorrectWords / totalCategories) * 100;

        return correctPercent;
    }

    function checkWords(words, keywords) {
        return keywords.some(keyword => words.includes(keyword));
    }

    function showAnimation() {
        // Анимация правильного ответа
       // animationElement.innerHTML = "<p>Анимация правильного ответа!</p>";
        animationElement.querySelector('p').style.animation = "correctAnswer 0.5s ease-out";
    }
});
