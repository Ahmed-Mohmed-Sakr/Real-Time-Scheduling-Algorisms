import { tasks, createTask, getTasks } from "./tasks";
const generateTaskDOM = (task) => {
  const taskEl = document.createElement("a");
  const taskNameEl = document.createElement("span");
  const taskTypeEl = document.createElement("span");

  taskEl.setAttribute("href", `/edit.html#${task.id}`);
  taskEl.style.display = "block";
  taskEl.style.marginBottom = "12px";

  taskNameEl.textContent = `Task Name: ${task.taskName} --- `;
  taskEl.appendChild(taskNameEl);

  if (task.priodic) {
    taskTypeEl.textContent = "Task Type: priodic";
  } else {
    taskTypeEl.textContent = "Task Type: Apriodic";
  }
  taskEl.appendChild(taskTypeEl);

  taskEl.appendChild(taskStatusMessageEl(task.valid));

  return taskEl;
};

const taskStatusMessageEl = (taskStatus) => {
  const taskStatusEl = document.createElement("span");
  taskStatusEl.textContent = ` --- ${taskStatus ? "Valid" : "UnValid"} Task`;
  return taskStatusEl;
};

const renderTasks = () => {
  const tasksEl = document.querySelector("#tasks");
  const emptyLineEl = document.createElement("br");
  const tasks = getTasks();

  tasksEl.innerHTML = "";

  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const taskEl = generateTaskDOM(task);
      tasksEl.appendChild(taskEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No tasks to show";
    tasksEl.appendChild(emptyMessage);
  }
};

const renderMessageEditPage = (validTask) => {
  const taskMessageBody = document.querySelector("#task-status");
  taskMessageBody.innerHTML = "";
  taskMessageBody.appendChild(taskStatusMessageEl(validTask));
};

export {
  renderTasks,
  generateTaskDOM,
  taskStatusMessageEl,
  renderMessageEditPage,
};
