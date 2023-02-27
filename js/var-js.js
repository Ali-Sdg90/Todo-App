const localTodo = localStorage.getItem("saveTodos");

let todoSaves = [];
let filteredTodoSaves = [];
let editTodo = -1;
let firstTopFilter = 35.5;
let filterList = "all"; // all - active - completed
// localStorage.clear();

export {
    localTodo,
    todoSaves,
    filteredTodoSaves,
    editTodo,
    firstTopFilter,
    filterList,
};
