const inputBox = document.getElementById("text-input");
const listContainer = document.getElementById("list-container");
const dueDateInput = document.getElementById("due-date");
const categoryInput = document.getElementById("category");
const priorityInput = document.getElementById("priority");
const errorMessage = document.getElementById("error-message");

function addTask() {
  if (inputBox.value === '' || dueDateInput.value === '') {
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  let li = document.createElement('li');

  let dueDate = dueDateInput.value;
  let category = categoryInput.value;
  let priority = priorityInput.value;

  
  li.innerHTML = `${inputBox.value} - Due: ${dueDate} - Category: ${category} - Priority: ${priority}`;
  listContainer.appendChild(li);

  let span = document.createElement("span");
  span.innerHTML = "\u00d7";
  li.appendChild(span);

  
  inputBox.value = '';
  dueDateInput.value = '';
  categoryInput.value = 'work';
  priorityInput.value = 'medium';

  savedata();
}

listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    savedata();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    savedata();
  }
}, false);


function savedata() {
  localStorage.setItem("data", listContainer.innerHTML);
}


function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();


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
