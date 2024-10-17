const inputBox = document.getElementById("text-input");
const listContainer = document.getElementById("list-container");
const dueDateInput = document.getElementById("due-date");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const errorMessage = document.getElementById("error-message");

function addTask() {
  // Validate input fields
  if (inputBox.value === '' || dueDateInput.value === '') {
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  let li = document.createElement('li');

  // Get due date, category, and priority
  let dueDate = dueDateInput.value;
  let category = categoryInput.value;
  let priority = priorityInput.value;

  // Construct task with details
  li.innerHTML = `${inputBox.value} - Due: ${dueDate} - Category: ${category} - Priority: ${priority}`;
  listContainer.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  // Reset the input fields
  inputBox.value = '';
  dueDateInput.value = '';
  categoryInput.value = 'work';
  priorityInput.value = 'medium';

  savedata();
}

// Toggle task completion and delete task
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    savedata();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    savedata();
  }
}, false);

// Save tasks to localStorage
function savedata() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Show tasks from localStorage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// Filter tasks based on status (all, completed, pending)
function filterTasks(filter) {
  const tasks = document.querySelectorAll('li');
  tasks.forEach(task => {
    if (filter === 'all') {
      task.style.display = '';
    } else if (filter === 'completed') {
      task.style.display = task.classList.contains('checked') ? '' : 'none';
    } else if (filter === 'pending') {
      task.style.display = !task.classList.contains('checked') ? '' : 'none';
    }
  });
}
