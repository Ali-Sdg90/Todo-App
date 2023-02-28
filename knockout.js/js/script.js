const obj = {
    todos: ko.observableArray([]),
    todoText: ko.observable(""),
    addTodo: function () {
        obj.todos.push(new addNewTodo(obj.todoText()));
        obj.todoText("");
    },
    todosFilter: ko.observable("active"), // all - active - completed
};

obj.showTodos = ko.computed(function () {
    switch (obj.todosFilter()) {
        case "active":
            return obj.todos().filter(function (todo) {
                return todo.isActive();
            });
        case "completed":
            return obj.todos().filter(function (todo) {
                return !todo.isActive();
            });
        default:
            return obj.todos();
    }
});

function addNewTodo(todoText) {
    this.todoText = todoText;
    this.isActive = ko.observable(true);
    this.changeCompleteState = function () {
        this.isActive(!this.isActive());
    };
    this.deleteTodo = function () {
        obj.todos.remove(this);
    };
    this.isActive.subscribe(function (value) {
        console.log(todoText, "=>", value);
    });
}

ko.applyBindings(obj);
