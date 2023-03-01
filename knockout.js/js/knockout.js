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
    todosFilter: ko.observable("all"), // all - active - completed
    padding: function () {
        if (this.todosFilter() === "all") {
            return "";
        } else {
            return this.todosFilter();
        }
    },
    todosFilterAll: function () {
        console.log("all");
        this.todosFilter("all");
    },
    todosFilterActive: function () {
        console.log("active");
        this.todosFilter("active");
    },
    todosFilterCompleted: function () {
        console.log("completed");
        this.todosFilter("completed");
    },
    clearAll: function () {
        this.todos(
            this.todos().filter(function (todo) {
                return !VM.showTodos().includes(todo);
            })
        );
    },

    addBr: function () {
        if (!VM.showTodos().length) {
            return "<br>";
        }
    },
};

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
    if (filteredList().length < 7) {
        let filterTop = 35.5 - filteredList().length * 3 + "vh";
        document.getElementById("filter-nav-background").style.top = filterTop;
        document.getElementById("filter-nav-text").style.top = filterTop;
    } else {
        document.getElementById("filter-nav-background").style.top = "14.85vh";
        document.getElementById("filter-nav-text").style.top = "14.85vh";
    }
    console.log(filteredList());
    return filteredList().slice(0).reverse();
});

taskTasks = ko.computed(function () {
    let output = "";
    if (VM.showTodos().length == 1) {
        output += "task";
    } else {
        output += "tasks";
    }
    if (VM.todosFilter() === "all") {
        output += " in total";
    }
    return output;
});

ko.applyBindings(VM);
