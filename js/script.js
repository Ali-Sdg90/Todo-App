import {
    addBtn,
    todoCounter,
    taskTasks,
    pendingFilter,
    clearAll,
    todoInput,
    todoList,
} from "./var-dom.js";
import {
    localTodo,
    todoSaves,
    filteredTodoSaves,
    editTodo,
    firstTopFilter,
    filterList,
} from "./var-js.js";

export { filterTodoSavesFunc, editBtn, completeBtn, deleteBtn };
import { updateHTML } from "./updateHTML.js";

// import updateHTML from './updateHTML.js';
// updateHTML(addNewTodo);

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

        default:
            break;
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
