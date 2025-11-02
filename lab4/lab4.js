const list = document.querySelector('.todo-list');
const addButton = document.querySelector('.add-button');
const inputElement = document.querySelector('.input-element');
const filterButtons = document.querySelectorAll('.filter-buttons button');

let toDoArray = [];
let currentFilter = 'all';

function render() {
    list.innerHTML = '';
    let filteredTasks = [];
    for (let i = 0; i < toDoArray.length; i++) {
        if (currentFilter === 'active' && toDoArray[i].completed === true) {
            continue;
        }
        if (currentFilter === 'completed' && toDoArray[i].completed === false) {
            continue;
        }
        filteredTasks.push(toDoArray[i]);
    }

    for (let i = 0; i < filteredTasks.length; i++) {
        const task = filteredTasks[i];
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function () {
            toggleCompleted(task.id);
        });

        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
            span.style.textDecoration = 'line-through';
            span.style.color = 'gray';
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', function () {
            deleteItem(task.id);
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(span);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
    }
}

function addTodoItem() {
    const input = inputElement.value.trim();
    if (input === '') {
        alert("Please write something first!");
        return;
    }

    const newTask = {
        id: new Date().getTime(),
        text: input,
        completed: false
    };

    toDoArray.push(newTask);
    render();
    inputElement.value = '';
}

function deleteItem(id) {
    let newList = [];
    for (let i = 0; i < toDoArray.length; i++) {
        if (toDoArray[i].id !== id) {
            newList.push(toDoArray[i]);
        }
    }
    toDoArray = newList;
    render();
}

function toggleCompleted(id) {
    for (let i = 0; i < toDoArray.length; i++) {
        if (toDoArray[i].id === id) {
            toDoArray[i].completed = !toDoArray[i].completed;
        }
    }
    render();
}

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener('click', function () {
        currentFilter = filterButtons[i].textContent.toLowerCase();
        render();
    });
}

addButton.addEventListener('click', addTodoItem);
