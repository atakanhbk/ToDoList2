//Select all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelectorAll("#clear-todos")[0];


eventListeners();


function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {

    if (confirm("Are You Sure Delete Every Todos ???")) {
        while (todoList.lastElementChild) {

            todoList.removeChild(todoList.lastElementChild);

        }

        clearAllTodosFromStorage();
    }

}

function clearAllTodosFromStorage() {
    localStorage.removeItem("todos");
}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLowerCase();

        if (text.indexOf(filterValue) === -1) {
            console.log("Include");
            listItem.setAttribute("style", "display : none !important");
        }
        else {
            listItem.setAttribute("style", "display :block ");
        }
    })


}


function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentNode.parentNode.remove();

        deleteTodoFromStorage(e.target.parentNode.parentNode.textContent);
        showAlert("success", "Todo Deleted Successfully");
    }
}

function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();



    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}


function loadAllTodosToUI() {
    const todos = getTodosFromStorage();
    todos.forEach(element => {
        addTodoToUI(element);
    });
}


function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger", "Please Enter A Todo");
    }
    else {

        showAlert("success", "Todo Entered Succesfully !!!");
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }

    e.preventDefault();
}

function addTodoToUI(newTodo) {

    //Create List Item
    const listItem = document.createElement("li");
    listItem.className = "list-group-item d-flex justify-content-between";
    //Create a link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //Add Text Node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //Add List Item To Todo List
    todoList.appendChild(listItem);

    //Clear Input
    todoInput.value = "";
    getTodosFromStorage();
}

function showAlert(type, message) {


    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.role = "alert";
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    //setTimeout

    setTimeout(function () {
        alert.remove();
    }, 1000);
}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));

}

