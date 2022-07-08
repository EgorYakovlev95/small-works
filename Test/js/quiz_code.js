window.onload = function () {
    let result = {};
    let step = 0;

    //показываем 1-й вопрос
    function showQuestion(questionNumber) {
        //Вопрос
        document.querySelector('.question').innerHTML = quiz[step]['q'];
        //Ответ
        let answer = '';
        // перебираем массив со всеми вариантами ответов
        for (let key in quiz[step]['a']) {
            answer += `<li>
                <label>
                    <input class="answer-variant" type="radio" name=${step} value="${key}">
                    ${quiz[step]['a'][key]}
                </label>
            </li>`;
        }

        document.querySelector('.answer').innerHTML = answer;
    }

    // disabled = false для кнопки "Далее" после выбора любого input
    document.querySelector('.answer').addEventListener("change", function (event) {
        if (event.target.matches('.answer-variant') && step < quiz.length) {
            document.querySelector('.btn-next').disabled = false;
        }
    })

    // События клике на "Далее"
    document.querySelector('.btn-next').addEventListener("click", function(event) {
        if (step < quiz.length) {
            let checkedInput = Array.from(document.querySelectorAll('input:checked'));

            if (result[checkedInput[0].value] != undefined) {
                result[checkedInput[0].value]++;
            } else {
                result[checkedInput[0].value] = 1;
            };

            step++; //после того как проголосовали - наращиваем шаг

            // проверяем, если step последний - то переход к выводу результатов
            if (step == quiz.length) {
                document.querySelector('.question').remove();
                document.querySelector('.answer').remove();
                document.querySelector('h1').remove();
                document.querySelector('.btn-next').remove();
                showResult();
            } else {
                showQuestion(step);
            }
        }

        document.querySelector('.btn-next').disabled = true;
        // console.log(result);
        showQuestion(step);
    })

    // Ищем ключ с максимальным значением и выводим результат
    function showResult() {
        let key = Object.keys(result).reduce(function(a,b) {
            return result[a] > result[b] ? a : b;
        });

        //вывод результата ответов, зная max ключ
        let div = document.createElement('div');
        div.classList.add('result');
        div.innerHTML = answers[key]['description'];
        document.querySelector('main').appendChild(div);

        //вывод изображения
        let divImg = document.createElement('div');
        divImg.classList.add('result-img');
        divImg.innerHTML = `
            <img src="img/${answers[key]['image']}" alt="">
        `;
        document.querySelector('main').appendChild(divImg);
    }
    showQuestion(step);
}
