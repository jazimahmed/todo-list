document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTodo();
    });

    function addTodo() {
        const newTodo = {
            id: Date.now(),
            text: todoInput.value,
            completed: false
        };
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        todoInput.value = '';
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button class="edit" onclick="editTodo(${todo.id})">Edit</button>
                    <button class="delete" onclick="deleteTodo(${todo.id})">Delete</button>
                    <button class="complete" onclick="toggleComplete(${todo.id})">${todo.completed ? 'Undo' : 'Complete'}</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    window.deleteTodo = function(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
        renderTodos();
    };

    window.editTodo = function(id) {
        const newText = prompt('Edit your task:');
        const todo = todos.find(todo => todo.id === id);
        if (newText) {
            todo.text = newText;
            saveTodos();
            renderTodos();
        }
    };

    window.toggleComplete = function(id) {
        const todo = todos.find(todo => todo.id === id);
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    };

    renderTodos();
});