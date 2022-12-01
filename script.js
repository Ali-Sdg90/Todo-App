const addBtn = document.getElementById("add-btn");
const todoCounter = document.getElementById("todo-counter");
const clearAll = document.getElementById("clear-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("save-list");
const localTodo = localStorage.getItem("saveTodos");
const defaultTodo = "Add your new todo";
let todoSaves = [];
let htmlOutput;
todoInput.value = defaultTodo;
// localStorage.clear();
function addToHtml() {
    htmlOutput = "";
    for (let i = todoSaves.length; i > 0; ) {
        i--;
        // console.log(i);
        htmlOutput += `
        <span>
            <div>${todoSaves[i]}</div> 
            <div id="delete-btn${i}">X</div>
        </span>
        `;
    }
    todoList.innerHTML = htmlOutput;
    todoCounter.innerHTML = todoSaves.length;
}
if (localTodo) {
    todoSaves = localTodo.split(",");
    addToHtml();
}
addBtn.addEventListener("click", function () {
    if (!todoInput.value || todoInput.value == defaultTodo) return;
    todoSaves.push(todoInput.value);
    // console.log(todoSaves);
    addToHtml();
    // console.log(htmlOutput);
    todoInput.value = defaultTodo;
    localStorage.setItem("saveTodos", todoSaves);
});
todoInput.addEventListener("focusout", function () {
    if (!todoInput.value) todoInput.value = defaultTodo;
});
todoCounter.innerHTML = todoSaves.length;
clearAll.addEventListener("dblclick", function () {
    localStorage.setItem("saveTodos","[]");
    todoSaves = [];
    addToHtml();
    todoInput.value = defaultTodo;
});
todoList.addEventListener("mouseup", function () {
    for (let i = 0; i < todoSaves.length; i++) {
        document
            .getElementById(`delete-btn${i}`)
            .addEventListener("click", function () {
                todoSaves.splice(i, 1);
                // console.log(todoSaves);
                localStorage.setItem("saveTodos", todoSaves);
                addToHtml();
            });
    }
});
