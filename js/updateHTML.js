import {
    filterTodoSavesFunc,
    editBtn,
    completeBtn,
    deleteBtn,
} from "./script.js";
import {
    localTodo,
    todoSaves,
    filteredTodoSaves,
    editTodo,
    firstTopFilter,
    filterList,
} from "./var-js.js";
import {
    addBtn,
    todoCounter,
    taskTasks,
    pendingFilter,
    clearAll,
    todoInput,
    todoList,
} from "./var-dom.js";

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
    if (filteredTodoSaves.length < 8) {
        let filterTop = firstTopFilter - filteredTodoSaves.length * 2.95 + "vh";
        document.getElementById("filter-nav-background").style.top = filterTop;
        document.getElementById("filter-nav-text").style.top = filterTop;
    } else {
        document.getElementById("filter-nav-background").style.top = "14.85vh";
        document.getElementById("filter-nav-text").style.top = "14.85vh";
    }
}

export { updateHTML };
