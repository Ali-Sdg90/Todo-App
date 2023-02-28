const obj = {
    todos: ko.observableArray([]),
    todoText: ko.observable(""),
    addTodo: function () {
        console.log(obj.todoText());
        obj.todos.push(new addNewTodo(obj.todoText()));
    },
    todosFilter: ko.observable("active"), // all - active - completed
};

obj.showTodos = ko.computed(function () {
    console.log(
        obj.todos().filter(function (todo) {
            switch (obj.todosFilter()) {
                case "all":
                    return todo;
                    break;
                case "active":
                    return todo.isActive();
                    break;
                case "completed":
                    return !todo.isActive();
                    break;
            }
        })
    );
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
