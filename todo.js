//Select all elements

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelectorAll("#filter");
const clearButton = document.querySelectorAll("#clear-todos");

eventListeners()

function eventListeners() {
    form.addEventListener("submit", addTodo);
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
        showAlert("danger", "Please Enter A Todo");
    }
    else {

        showAlert("success", "Todo Entered Succesfully !!!");
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
        },1000);

}