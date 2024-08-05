//Select
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filterTodoSelect = document.getElementById("filter-todo");

//UNTUK MENAMBAHKAN TUGAS KE DAFTAR
function addTask() {
  //UNTUK MEMERIKSA APAKAH KOTAK INPUT KOSONG,KLO KOSONG AKAN MUNCUL
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
  filterTodo();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
    filterTodo();
  },
  false
);

filterTodoSelect.addEventListener("change", filterTodo);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  filterTodo();
}

function filterTodo() {
  const todos = listContainer.getElementsByTagName("li");
  const filterValue = filterTodoSelect.value;

  Array.from(todos).forEach(function (todo) {
    switch (filterValue) {
      case "all":
        todo.style.display = "list-item";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "list-item";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "list-item";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

showTask();
