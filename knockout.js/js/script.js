const todoInput = document.getElementById("todo-input");

const VM = {
    todos: ko.observableArray([]),
    todoText: ko.observable(""),
    acceptInput: ko.observable(true),
    addTodo: function () {
        if (this.acceptInput() && todoInput.value) {
            VM.todos.push(new addNewTodo(VM.todoText()));
            VM.todoText("");
        }
    },
    todosFilter: ko.observable("active"), // all - active - completed
};

VM.showTodos = ko.computed(function () {
    let filteredList = function () {
        switch (VM.todosFilter()) {
            case "active":
                return VM.todos().filter(function (todo) {
                    return todo.isActive();
                });
            case "completed":
                return VM.todos().filter(function (todo) {
                    return !todo.isActive();
                });
            default:
                return VM.todos();
        }
    };
    if (filteredList().length < 8) {
        let filterTop = 35.5 - filteredList().length * 2.95 + "vh";
        document.getElementById("filter-nav-background").style.top = filterTop;
        document.getElementById("filter-nav-text").style.top = filterTop;
    } else {
        document.getElementById("filter-nav-background").style.top = "14.85vh";
        document.getElementById("filter-nav-text").style.top = "14.85vh";
    }
    console.log(filteredList());
    return filteredList();
});

function addNewTodo(todoText) {
    this.todoText = todoText;
    this.isActive = ko.observable(true);
    this.editTodo = function () {
        todoInput.value = this.todoText;
        VM.acceptInput(false);
        document.getElementById("add-btn").addEventListener(
            "click",
            function () {
                this.todoText = todoInput.value;
                VM.acceptInput(true);
                console.log(this.todoText, todoInput.value);
            },
            { once: true }
        );
    };
    this.changeCompleteState = function () {
        this.isActive(!this.isActive());
    };
    this.deleteTodo = function () {
        VM.todos.remove(this);
    };
    this.isActive.subscribe(function (value) {
        console.log(todoText, "=>", value);
    });
}

VM.todosFilterAll = function () {
    console.log("all");
    VM.todosFilter("all");
};
VM.todosFilterActive = function () {
    console.log("active");
    VM.todosFilter("active");
};
VM.todosFilterCompleted = function () {
    console.log("completed");
    VM.todosFilter("completed");
};

VM.taskTasks = ko.computed(function () {
    if (VM.showTodos().length == 1) {
        return "task";
    } else {
        return "tasks";
    }
});

ko.applyBindings(VM);
