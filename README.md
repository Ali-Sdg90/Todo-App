<h1>Todo App</h1>
<p>
    This is a simple JavaScript based Todo app that allows users to add, filter,
    and clear tasks. The app uses the DOM to manipulate the HTML and
    localStorage to save the tasks.
</p>
<h2>Getting Started</h2>
<p>
    To get started, simply clone or download the repository and open the
    <code>index.html</code> file in your browser. You should be able to see the
    Todo app interface.
</p>
<h2>Features</h2>
<ul>
    <li>
        Add tasks by typing into the input field and clicking the "Add" button
    </li>
    <li>
        Filter tasks by clicking the "All", "Active", or "Completed" buttons
    </li>
    <li>Clear all tasks by clicking the "Clear" button</li>
    <li>
        Tasks are saved to localStorage, so they will persist even after the
        browser is closed or refreshed
    </li>
</ul>
<h2>Code Structure</h2>
<p>
    The app uses several variables such as <code>addBtn</code>,
    <code>todoCounter</code>, <code>taskTasks</code>,
    <code>pendingFilter</code>, <code>clearAll</code>, <code>todoInput</code>,
    <code>todoList</code>, and <code>localTodo</code> to select different parts
    of the HTML and manipulate them.
</p>
<p>
    The app uses an array <code>todoSaves</code> to store the tasks and another
    array <code>filteredTodoSaves</code> to store the filtered tasks. The
    <code>filterTodoSavesFunc()</code> function is used to filter the tasks
    based on the filter mode (<code>all</code>, <code>active</code>, or
    <code>completed</code>) and the <code>updateHTML(addNewTodo)</code> function
    is used to update the DOM and refresh the list of tasks.
</p>
<h2>Built With</h2>
<ul>
    <li>HTML</li>
    <li>SCSS</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>
<h2>Author</h2>
<ul>
    <li><a href="https://github.com/Ali-Sdg90" target="_new">Ali-Sdg90</a></li>
</ul>
<h2>Steps</h2>
<ul>
    <li>
        <p>
            Todo Step 3 :
            <a
                href="https://github.com/Ali-Sdg90/Todo-App/tree/2471d1bfbd34de78b451684a90d3c6db4ac20350"
                target="_new"
                >GitHub</a
            >
            |
            <a href="https://jsfiddle.net/Ali_Sdg90/v60okbum/" target="_new"
                >Jsfiddle</a
            >
        </p>
    </li>
    <li>
        <p>
            Todo Step 4 :
            <a
                href="https://github.com/Ali-Sdg90/Todo-App/tree/1ba75aa5ab8cb51396f7a46678a6b9791e9a0f14"
                target="_new"
                >GitHub</a
            >
            |
            <a href="https://jsfiddle.net/Ali_Sdg90/k4Lwxare/" target="_new"
                >Jsfiddle</a
            >
        </p>
    </li>
</ul>
