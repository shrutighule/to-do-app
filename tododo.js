let todoList = getTodoListFromLocalStorage() || [];

displayItems();

function addTodo() {
    let inputElement = document.querySelector('#todo-input');
    let dateElement = document.querySelector('#todo-date');
    let todoItem = inputElement.value;
    let todoDate = dateElement.value;
    console.log(todoItem);
    todoList.push({ item: todoItem, dueDate: todoDate });
    inputElement.value = '';
    dateElement.value = '';

    // Save the updated todoList to local storage
    saveTodoListToLocalStorage();

    displayItems();
}

function displayItems() {
    let containerElement = document.querySelector('.todo-container');

    let newHtml = '';
    for (let i = 0; i < todoList.length; i++) {
        let { item, dueDate } = todoList[i];
        newHtml += `
            <span>${item}</span>
            <span>${dueDate}</span>
            <button class='btn-delete' onclick="deleteTodoItem(${i})">Delete</button>
        `;
    }
    containerElement.innerHTML = newHtml;
}

function deleteTodoItem(index) {
    todoList.splice(index, 1);

    // Save the updated todoList to local storage
    saveTodoListToLocalStorage();

    displayItems();
}

function saveTodoListToLocalStorage() {
    // Stringify the todoList array and store it in local storage
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function getTodoListFromLocalStorage() {
    // Retrieve the stringified todoList from local storage and parse it back to an array
    const storedTodoList = localStorage.getItem('todoList');
    return storedTodoList ? JSON.parse(storedTodoList) : null;
}
