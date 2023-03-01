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
    });
}

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
};

const localTodo = localStorage.getItem("saveTodos-knockout");
// localStorage.clear();
VM.todos.subscribe(function () {
    console.log("CHANGE!");
    // localStorage.setItem("saveTodos-knockout", JSON.stringify(VM.todos()));
    // console.log(VM.todos(), JSON.stringify(VM.todos()), JSON.parse(VM.todos()));

    localStorage.setItem("saveTodos-knockout", ko.toJSON(VM.todos()));

    // console.log(VM);
    console.log("End of Changes!");
    // console.log("S:",JSON.stringify(VM.todos()))
});

if (localTodo) {
    // console.log("R:", localStorage.getItem("saveTodos-knockout"));
    // VM.todos(localStorage.getItem("saveTodos-knockout"));
    VM.todos(JSON.parse(localStorage.getItem("saveTodos-knockout")));
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
    if (filteredList().length < 8) {
        let filterTop = 35.9 - filteredList().length * 3.0 + "vh";
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

VM.clearAll = function () {
    VM.todos(
        VM.todos().filter(function (todo) {
            return !VM.showTodos().includes(todo);
        })
    );
};

// const localTodo = localStorage.getItem("saveTodos-knockout");



ko.applyBindings(VM);
