// вывод на экран самого вопроса при загрузке стр.
window.onload = function () {
    let result = {};

    // определяем шаг вопроса, на каком сейчас находимся
    let step = 0;

    //показываем хотябы 1-й вопрос
    function showQuestion(questionNumber) {
        //Вопрос
        document.querySelector('.question').innerHTML = quiz[step]['q'];
        //Ответ
        let answer = '';
        // перебираем массив со всеми вариантами ответов
        for (let key in quiz[step]['a']) {
            answer += `<li data-v="${key}" class="answer-variant">${quiz[step]['a'][key]}</li>`;
        }
        document.querySelector('.answer').innerHTML = answer;
    }

    document.onclick = function (event) {
        event.stopPropagation();
        if (event.target.classList.contains('answer-variant') && step < quiz.length) {
            //Если ли ключ (Тони Старка) в массива
            if (result[event.target.dataset.v] != undefined) {
                result[event.target.dataset.v]++;
            } else {
                result[event.target.dataset.v] = 1;
            }
            step++; //после того как проголосовал - надо нарастить шаг

            // проверяем, есть ли еще вопросы. Если step последний - то вывод результатов
            if (step == quiz.length) {
                document.querySelector('.question').remove();
                document.querySelector('.answer').remove();
                document.querySelector('h1').remove();
                showResult();
            } else {
                showQuestion(step);
            }
        }
        console.log(result);
        showQuestion(step);
    }

    // ищем ключ с максимальным значением для вывода результата
    function showResult() {
        let key = Object.keys(result).reduce(function(a,b) {
            return result[a] > result[b] ? a : b;
        });
        //вывод результатов ответов, зная max ключ
        let div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);

        //выводим изображение
        let divImg = document.createElement('div');
        divImg.classList.add('result-img');
        divImg.innerHTML = `
            <img src="img/${answers[key]['image']}" alt="">
        `;
        // divImg.style.cssText = `
        //         width: 500px;
        //         height: 300px;
        // `
        document.querySelector('main').appendChild(divImg);
    }

    showQuestion(step);
}
