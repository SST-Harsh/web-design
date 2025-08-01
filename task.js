
const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");


addBtn.addEventListener("click", () => {
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }


  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;
  
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  const head=document.createElement('h2')
  head.innerText="Task Details"
    head.style.textAlign="center";
  
  delBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Edit") {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = span.textContent;
      editInput.style.border="none"
      li.replaceChild(editInput, span);
      editBtn.textContent = "Save";
    } 
    else {
      const updatedText = li.querySelector("input").value.trim();
      if (updatedText === "") {
        alert("Task cannot be empty!");
        return;
      }
      span.textContent = updatedText;
      li.replaceChild(span, li.querySelector("input"));
      editBtn.textContent = "Edit";
    }
  });

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  taskList.appendChild(li);

  input.value = "";
});
