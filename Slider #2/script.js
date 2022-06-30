const images = document.querySelectorAll('.slider .slider-line img');
const sliderLine = document.querySelector('.slider-line');
let count = 0; // ссылается на активный слайдер
let width; // ширина слайдера

// ф-я работает при загрузке/перезагрузке страницы
function init() {
    //расчет текущей ширины элемента
    width = document.querySelector('.slider').offsetWidth;
    sliderLine.style.width = width * images.length + "px";
    //Сделать все изображения = ширине слайдера
    images.forEach((item) => {
        item.style.width = width + "px";
        // сохраняем пропорции изображения
        item.style.height =  "auto"; // как только изменим ширину - высота подтянется автоматически
    });
    rollSlider(); //если после листания размер экрана меняется - то исправляется смещение
}

//при изменении размеров картинки - вызов функции init
window.addEventListener('resize', init);
init();

//пролистывание слайдера вперед
document.querySelector('.slider-next').addEventListener("click", function () {
    count++;
    if (count >= images.length) {
        count = 0;
    }
    rollSlider();
})

//пролистывание слайдера назад
document.querySelector('.slider-prev').addEventListener("click", function () {
    count--;
    if (count < 0) {
        count = images.length - 1;
    }
    rollSlider();
})

//смещение слайдера
function rollSlider() {
    sliderLine.style.transform = 'translate(-' + count * width + 'px)';
}
