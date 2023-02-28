const obj = {
    todos: ko.observableArray([]),
    todoText: ko.observable(""),
};

function addNewTodo(todoText) {
    this.todoText = todoText;
    this.isActive = ko.observable(true);
    this.deleteTodo = function () {
        obj.todos.remove(this);
    };
}

obj.addTodo = function () {
    obj.todos.push(new addNewTodo(obj.todoText()));
};

ko.applyBindings(obj);
