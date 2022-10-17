let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let removeAll = document.querySelector(".rem");
let font = document.querySelector("#font");

let fonts = ["Roboto Mono", "Fuzzy Bubbles", "Open Sans", "Cairo" , "Ubuntu"];

// Set the options 
fonts.forEach((ele) => {
  let option = document.createElement("option");
  option.value = ele;
  option.append(ele);
  font.append(option)
});

// Set the options on change
font.onchange = function () {
  document.querySelector("body").style.fontFamily = this.value;
  window.localStorage.setItem("Font Type", this.value);
};
if (localStorage.getItem("Font Type")) {
  document.querySelector("body").style.fontFamily = localStorage.getItem("Font Type");
  font.value = localStorage.getItem("Font Type")
};

if (localStorage.getItem("Theme")) {
  document.querySelector("#cssStyle").setAttribute("href", localStorage.getItem("Theme"));
};

let arrayOfTasks = [];

// check if there is a data in localStorage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage()

// add task 
submit.onclick = function () {
  if (input.value !== "") {
    addTasksToArray(input.value);
    input.value = "";
  };
};

// click on task
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // remove from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove from page
    e.target.parentElement.remove();
  };
  if (e.target.classList.contains("task")) {
    // toggle complete for the task
    toggleStutusTaskWith(e.target.getAttribute("data-id"));
    // toggle done class
    e.target.classList.toggle("done")
  };
});

// click on remove all 
removeAll.onclick = function () {
  tasksDiv.innerHTML = "";
  window.localStorage.removeItem("tasks")
}

function addTasksToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // add the task to array
  arrayOfTasks.push(task);
  // add the task from array to the page
  addElementsToPageFrom(arrayOfTasks);
  // add the tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
};

function addElementsToPageFrom(arrayOfTasks) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    // check if task is done
    if (task.completed) {
      div.className("task done");
    };
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
};

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
};

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  };
};

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
};

function toggleStutusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    };
  };
  addDataToLocalStorageFrom(arrayOfTasks);
};

function swapStyleSheet(sheet) {
  document.querySelector("#cssStyle").setAttribute("href", sheet);
  window.localStorage.setItem("Theme", sheet);
};
function initate() {
  var light = document.querySelector("#light");
  var dark = document.querySelector("#dark");
  light.onclick = function () { swapStyleSheet("CSS/main.css"); };
  dark.onclick = function () { swapStyleSheet("CSS/dark.css") };
}
window.onload = initate;