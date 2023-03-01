const addBtn = document.getElementById("add-btn");
const todoCounter = document.getElementById("todo-counter");
const taskTasks = document.getElementById("task-tasks");
const pendingFilter = document.getElementById("pending-filter");
const clearAll = document.getElementById("clear-btn");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("save-list");
const localTodo = localStorage.getItem("saveTodos");
let todoSaves = [];
let filteredTodoSaves = [];
let editTodo = -1;
let firstTopFilter = 35.5;
let filterList = "all"; // all - active - completed
// localStorage.clear();

// If localSave is available, todoSaves will be set to localSave :
if (localTodo) {
    todoSaves = JSON.parse(localStorage.getItem("saveTodos"));
    updateHTML(false);
}

// Filter the todoSave in all - active - completed modes :
function filterTodoSavesFunc() {
    filteredTodoSaves = [];
    switch (filterList) {
        case "active":
            todoSaves.forEach(function (save) {
                if (!save.isComplete) {
                    filteredTodoSaves.push(save);
                }
            });
            break;
        case "completed":
            todoSaves.forEach(function (save) {
                if (save.isComplete) {
                    filteredTodoSaves.push(save);
                }
            });
            break;
        case "all":
            filteredTodoSaves = todoSaves;
            break;
    }
}

// Update the DOM
// Create new tasks with buttons and addEventListeners to them
// Set the position of navigation filters
// Update pending tasks in different modes :
function updateHTML(addNewTodo) {
    todoInput.value = "";
    filterTodoSavesFunc();
    if (!filteredTodoSaves.length) todoList.innerHTML = "<br />";
    else todoList.innerHTML = "";
    for (let i = filteredTodoSaves.length; i > 0; ) {
        i--;
        todoList.innerHTML += `
        <span id="todo-number${i}">
            <div id="work-number${i}">${filteredTodoSaves[i].todo}</div>
            <div id="edit-number${i}">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 30 30" width="30px" height="30px"><path d="M24 11l2.414-2.414c.781-.781.781-2.047 0-2.828l-2.172-2.172c-.781-.781-2.047-.781-2.828 0L19 6 24 11zM17 8L5.26 19.74C7.886 19.427 6.03 21.933 7 23c.854.939 3.529-.732 3.26 1.74L22 13 17 8zM4.328 26.944l-.015-.007c-.605.214-1.527-.265-1.25-1.25l-.007-.015L4 23l3 3L4.328 26.944z"/></svg>
            </div>
            <div id="complete-number${i}">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="24px" height="24px"><path d="M 5 3 C 3.897 3 3 3.897 3 5 L 3 19 C 3 20.103 3.897 21 5 21 L 19 21 C 20.103 21 21 20.103 21 19 L 21 9.2421875 L 19 11.242188 L 19.001953 19 L 5 19 L 5 5 L 16.757812 5 L 18.757812 3 L 5 3 z M 21.292969 3.2929688 L 11 13.585938 L 7.7070312 10.292969 L 6.2929688 11.707031 L 11 16.414062 L 22.707031 4.7070312 L 21.292969 3.2929688 z"/></svg>
            </div>
            <div id="delete-number${i}">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="3" d="M29.5,11.5V11c0-3-2.5-5.5-5.5-5.5S18.5,8,18.5,11v0.5"/><line x1="7.5" x2="40.5" y1="11.5" y2="11.5" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><line x1="36.5" x2="38" y1="27" y2="11.5" fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3"/><path fill="none" stroke="#000" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M10.7,18.6l2,20.3c0.2,2.1,1.9,3.6,4,3.6h14.7c2.1,0,3.8-1.6,4-3.6l0.5-4.8"/></svg>
            </div>
        </span>
        `;
    }
    for (let i = 0; i < filteredTodoSaves.length; i++) {
        document
            .getElementById(`edit-number${i}`)
            .addEventListener("click", function () {
                editBtn(i);
            });
        document
            .getElementById(`complete-number${i}`)
            .addEventListener("click", function () {
                completeBtn(i);
            });
        document
            .getElementById(`delete-number${i}`)
            .addEventListener("click", function () {
                deleteBtn(i);
            });
        if (filteredTodoSaves[i].isComplete) {
            document
                .getElementById(`work-number${i}`)
                .classList.toggle("complete-todo");
        }
    }
    if (addNewTodo) {
        const newTodo = document.getElementById(
            `todo-number${filteredTodoSaves.length - 1}`
        );
        newTodo.style.transform = "translate(0, -3.5vh)";
        newTodo.style.opacity = "0";
        setTimeout(() => {
            newTodo.style.opacity = "1";
            newTodo.style.transform = "translate(0, 0)";
        }, 10);
    }
    todoCounter.textContent = filteredTodoSaves.length;
    if (filteredTodoSaves.length == 1) {
        taskTasks.textContent = "task";
    } else {
        taskTasks.textContent = "tasks";
    }
    switch (filterList) {
        case "all":
            pendingFilter.textContent = "";
            if (filteredTodoSaves.length == 1) {
                taskTasks.textContent = "task in total";
            } else {
                taskTasks.textContent = "tasks in total";
            }
            break;
        case "active":
            pendingFilter.textContent = "active";
            break;
        case "completed":
            pendingFilter.textContent = "completed";
            break;
    }
    if (filteredTodoSaves.length < 7) {
        let filterTop = firstTopFilter - filteredTodoSaves.length * 3 + "vh";
        document.getElementById("filter-nav-background").style.top = filterTop;
        document.getElementById("filter-nav-text").style.top = filterTop;
    } else {
        document.getElementById("filter-nav-background").style.top = "14.85vh";
        document.getElementById("filter-nav-text").style.top = "14.85vh";
    }
}

// Function of edit button on tasks
// Change the style of the addBtn and set the value of todoInput to the task that is
// going to change :
function editBtn(taskNumber) {
    todoInput.value = todoSaves[taskNumber].todo;
    editTodo = taskNumber;
    addBtn.textContent = "✓";
    addBtn.classList.add("change-add-btn");
    todoInput.focus();
}

// Function of complete button on tasks
// Find the taskNumber in todoSaves and change its isComplete property to the opposite
// value :
function completeBtn(taskNumber) {
    for (let i = 0; i < todoSaves.length; i++) {
        if (todoSaves[i].todo == filteredTodoSaves[taskNumber].todo) {
            if (todoSaves[i].isComplete) {
                todoSaves[i].isComplete = false;
            } else {
                todoSaves[i].isComplete = true;
            }
        }
    }
    localStorage.setItem("saveTodos", JSON.stringify(todoSaves));
    document.getElementById(`todo-number${taskNumber}`).style.opacity = 0;
    if (filterList != "all")
        setTimeout(() => {
            updateHTML(false);
        }, 250);
    else updateHTML(false);
}

// Function of delete button on tasks
// Set filteredTodoSaves to the value of the task and run the deleteFunc() function :
function deleteBtn(taskNumber) {
    let deleteSave = filteredTodoSaves[taskNumber];
    filteredTodoSaves = [];
    filteredTodoSaves.push(deleteSave);
    deleteFunc();
    document.getElementById(`todo-number${taskNumber}`).style.opacity = 0;
    setTimeout(() => {
        updateHTML(false);
    }, 250);
}

// Object constructor for new task :
function addTodoSaves(newTodo, newIsComplete) {
    this.todo = newTodo;
    this.isComplete = newIsComplete;
}

// If todoInput.value avalable add it to todoSaves and localSave
// addBtn can also be the button to register the editBtn() :
addBtn.addEventListener("click", function () {
    if (!todoInput.value) return;
    if (editTodo != -1) {
        todoSaves[editTodo].todo = todoInput.value;
        addBtn.textContent = "+";
        addBtn.classList.remove("change-add-btn");
        editTodo = -1;
        localStorage.setItem("saveTodos", JSON.stringify(todoSaves));
        updateHTML(false);
        return;
    }
    todoSaves[todoSaves.length] = new addTodoSaves(todoInput.value, false);
    addBtn.blur();
    localStorage.setItem("saveTodos", JSON.stringify(todoSaves));
    updateHTML(true);
});

// Prevent the browser's default behavior of refreshing the page when 'enter' is
// pressed while an input is in focus :
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault();
});

// Simulate clicking on the addBtn by pressing the Enter key.
document.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addBtn.dispatchEvent(new Event("click"));
    }
});

// Double-click on the Clear All button to delete the task on the filteredTodoSaves :
clearAll.addEventListener("dblclick", function () {
    deleteFunc();
    updateHTML(false);
});

// Delete Tasks that are present in both filteredTodoSaves and todoSaves :
function deleteFunc() {
    for (let i = 0; i < filteredTodoSaves.length; i++) {
        for (let j = 0; j < todoSaves.length; j++) {
            if (filteredTodoSaves[i] == todoSaves[j]) {
                todoSaves.splice(j, 1);
            }
        }
    }
    localStorage.setItem("saveTodos", JSON.stringify(todoSaves));
}

// Add an addEventListener to the filter buttons and change the styles
// for the buttons :
const filterBackground = document.getElementsByClassName("filter-background");
const filtertext = document.getElementsByClassName("filter-text");
const filterDivBackground = document.getElementsByClassName(
    "filter-div-background"
);
for (let i = 0; i < 3; i++) {
    filtertext[i].addEventListener("click", function () {
        for (let j = 0; j < 3; j++) {
            filterBackground[j].style.fill = "rgb(198, 198, 198)";
            filterDivBackground[j].style.zIndex = "1";
        }
        filterBackground[i].style.fill = "white";
        filterDivBackground[i].style.zIndex = "2";
        switch (i) {
            case 0:
                filterList = "all";
                break;
            case 1:
                filterList = "active";
                break;
            case 2:
                filterList = "completed";
                break;
        }
        updateHTML(false);
    });
}
