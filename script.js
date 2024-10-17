const inputBox = document.getElementById("text-input");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === '') {
    alert("You must write something");
  } else {
    let li = document.createElement('li');

    // Get due date, category, and priority
    let dueDate = document.getElementById('due-date').value;
    let category = document.getElementById('category').value;
    let priority = document.getElementById('priority').value;

    // Construct task with details
    li.innerHTML = `${inputBox.value} - Due: ${dueDate} - Category: ${category} - Priority: ${priority}`;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  // Reset the input fields
  inputBox.value = '';
  document.getElementById('due-date').value = '';
  document.getElementById('category').value = 'work';
  document.getElementById('priority').value = 'medium';

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
