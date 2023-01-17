const addBtn = document.getElementById("add-btn");
const todoCounter = document.getElementById("todo-counter");
const pendingTask = document.getElementById("pending-task");
const clearAll = document.getElementById("clear-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("save-list");
const localTodo = localStorage.getItem("saveTodos");
const defaultTodo = "Add your new todo";
let todoSaves = [];
let htmlOutput;
todoInput.value = defaultTodo;
// localStorage.clear();
function addToHtml(addNewTodo) {
    htmlOutput = "";
    for (let i = todoSaves.length; i > 0; ) {
        i--;
        // htmlOutput += `
        // <span id="todo-number${i}">
        //     <div>${todoSaves[i]}</div>
        //     <div id="opption-number${i}">≣</div>
        // </span>
        // `;
        let newTodo = document.createElement("div");
        newTodo.textContent = todoSaves[i];
        let newTodoOpption = document.createElement("div");
        newTodoOpption.textContent = "≣";
        newTodoOpption.id = `opption-number${i}`;
        let newSpan = document.createElement("span");
        newSpan.id = `todo-number${i}`;
        newSpan.appendChild(newTodo);
        newSpan.appendChild(newTodoOpption);
        todoList.appendChild(newSpan);
        console.log(todoList);
        // todoList.innerHTML=newSpan;
        console.log(todoList);
        // console.log(newSpan)
        console.log("============");
    }
    todoList.innerHTML = htmlOutput;
    // if (addNewTodo) {
    //     const newTodo = document.getElementById(
    //         `todo-number${todoSaves.length - 1}`
    //     );
    //     newTodo.style.transform = "translate(0, -3.5vh)";
    //     newTodo.style.opacity = "0";
    //     setTimeout(() => {
    //         newTodo.style.opacity = "1";
    //         newTodo.style.transform = "translate(0, 0)";
    //     }, 10);
    // }
    todoCounter.textContent = todoSaves.length;
    if (todoSaves.length == 1) {
        pendingTask.textContent = "pending task";
    } else {
        pendingTask.textContent = "pending tasks";
    }
}
if (localTodo) {
    todoSaves = localTodo.split(",");
    addToHtml(false);
}
addBtn.addEventListener("click", function () {
    if (!todoInput.value || todoInput.value == defaultTodo) return;
    todoSaves.push(todoInput.value);
    addToHtml(true);
    todoInput.value = defaultTodo;
    localStorage.setItem("saveTodos", todoSaves);
});
todoInput.addEventListener("focusout", function () {
    if (!todoInput.value) todoInput.value = defaultTodo;
});
todoCounter.textContent = todoSaves.length;
clearAll.addEventListener("dblclick", function () {
    localStorage.setItem("saveTodos", "");
    todoSaves = [];
    todoList.innerHTML = "<br />";
    todoCounter.textContent = todoSaves.length;
    pendingTask.textContent = "pending tasks";
    todoInput.value = defaultTodo;
});
todoList.addEventListener("mouseup", function () {
    for (let i = 0; i < todoSaves.length; i++) {
        document
            .getElementById(`delete-btn${i}`)
            .addEventListener("click", function () {
                todoSaves.splice(i, 1);
                localStorage.setItem("saveTodos", todoSaves);
                addToHtml(false);
            });
    }
});
