let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

// Массив для хранения "дел" (объектов)
let todoList = [];

//Если обновить стр. - все данные сотрутся, но они хранятся в localStorage. Тут подтягиваем данные оттуда.
//Если в localStorage есть данные - то true
if (localStorage.getItem('todo')) {
    //возвращаем данные в массив из localStorage
    //JSON.parse() - получает данные и json преобразовывается в массив
    todoList = JSON.parse(localStorage.getItem('todo'));

    //когда данные прилетели в массив todoList - выводим их
    displayMessages();
}

addButton.addEventListener('click', function() {
    // Не выводим пустую строку (завершаяем ф-ию, если длина = 0)
    if (!addMessage.value) return

    //объект, как будут создаваться "дела"
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };
    //Добавляем новое "дело" в массив
    todoList.push(newTodo);

    //Вызываем каждый раз, когда нажимаем "Добавить"
    displayMessages();

    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

//функция для вывода "дел" (перебираем todoList и выводим на стр в виде тега li)
function displayMessages() {
    //что бы потом конкотенировать li - создаем переменную вне цикла
    let displayMessage = '';

    if (todoList.length === 0) {
        todo.innerHTML = '';
    }

    todoList.forEach(function(item, index) {
        //Создаем верстку (создаем тег(и) li)
        //Конкотенируем строки, что бы выводилось несколько значений, а не одно, если просто присвоить через "="
        //${item.checked ? 'checked' : ''} - проверяет отмечено ли как выполненный или нет
        displayMessage += `
            <li>
                <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
                <label for='item_${index}' class="${item.important ? 'important' : ''}">${item.todo}</labal>
                <span class="close">&#215</span>
            </li>
        `;
        //Вставляем на страницу, в класс todo (список)
        todo.innerHTML = displayMessage;
    });
}

// Отслеживаем галочки и записываем изменения в хранилище
todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') +']').innerHTML;

    //Что бы галочка не пропадала при перезагрузке страницы
    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
});

//Удаление элементов при клике на "х"
todo.addEventListener("click", function (event) {
    todoList.forEach((item, index) => {
        if (event.target.closest('.close')) {
            todoList.splice(index, 1);
            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
})

// todo.addEventListener('contextmenu', function (event) {
//     event.preventDefault();
//
//     // При клике пр кнопкой - перебираем массив
//     todoList.forEach(function(item, index) {
//         if (item.todo === event.target.innerHTML) {
//             if (event.ctrlKey || event.metaKey) {
//                 todoList.splice(index, 1);
//             }
//             else {
//                 item.important = !item.important;
//             }
//
//             displayMessages();
//             localStorage.setItem('todo', JSON.stringify(todoList));
//         }
//     });
// })


















//
