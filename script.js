const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

const STORAGE_KEY = 'todo-app-items';

let todos = loadTodos();

function loadTodos() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = `todo-item ${todo.done ? 'completed' : ''}`;

    const left = document.createElement('div');
    left.className = 'todo-item-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.className = 'delete-button';
    deleteButton.addEventListener('click', () => {
      todos = todos.filter((target) => target.id !== todo.id);
      saveTodos();
      renderTodos();
    });

    left.appendChild(checkbox);
    left.appendChild(text);
    item.appendChild(left);
    item.appendChild(deleteButton);
    list.appendChild(item);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) {
    return;
  }

  todos.unshift({
    id: Date.now(),
    text,
    done: false,
  });

  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

renderTodos();
