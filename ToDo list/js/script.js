let addMessage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todo = document.querySelector('.todo');

// Массив для хранения "дел"
let todoList = [];

// Подтягиваем данные из localStorage, если они есть
if (localStorage.getItem('todo')) {
    todoList = JSON.parse(localStorage.getItem('todo'));

    //когда данные прилетели в массив todoList - выводим их
    displayMessages();
}

// Создание "дел" при клике на кнопку
addButton.addEventListener('click', function() {
    // Не выводим пустую строку
    if (!addMessage.value) return

    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todoList.push(newTodo);
    //Вызываем каждый раз, когда нажимаем "Добавить"
    displayMessages();

    localStorage.setItem('todo', JSON.stringify(todoList));
    addMessage.value = '';
});

//функция для вывода "дел" на страницу
function displayMessages() {
    let displayMessage = '';

    if (todoList.length === 0) {
        todo.innerHTML = '';
    }

    todoList.forEach(function(item, index) {
        displayMessage += `
            <li>
                <input type='checkbox' id='item_${index}' ${item.checked ? 'checked' : ''}>
                <label for='item_${index}' class="${item.important ? 'important' : ''}">${item.todo}</label>
            </li>
        `;
        todo.innerHTML = displayMessage;
    });
}

// Записываем изменение значений галочек в localStorage
todo.addEventListener('change', function(event) {
    let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') +']').innerHTML;

    todoList.forEach(function(item) {
        if (item.todo === valueLabel) {
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
})

// Удаление строки или добавление класса "important"
todo.addEventListener('contextmenu', function (event) {
    event.preventDefault();

    todoList.forEach(function(item, index) {
        if (item.todo === event.target.innerHTML) {
            if (event.ctrlKey || event.metaKey) {
                todoList.splice(index, 1);
            }
            else {
                item.important = !item.important;
            }

            displayMessages();
            localStorage.setItem('todo', JSON.stringify(todoList));
        }
    });
})
