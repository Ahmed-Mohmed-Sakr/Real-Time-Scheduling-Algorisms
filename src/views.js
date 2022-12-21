import { tasks, createTask, getTasks } from "./tasks";
import { getpriodicSchedule } from "./earliestDeadline";
import { getApriodicSchedule } from "./FCFSAlgo";
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

const createTaskDOM = (meaasge) => {
  const messageEl = document.createElement("p");
  messageEl.textContent = meaasge;
  return messageEl;
};

const renderScheduling = (typeOfTasks, tasks) => {
  const schedulingResults = document.querySelector("#scheduling");
  const filterTaskes = tasks.filter((task) => {
    if (typeOfTasks === "priodic") {
      return task.valid === true && task.priodic == true;
    } else if (typeOfTasks === "apriodic") {
      return task.valid === true && task.priodic == false;
    }
  });

  schedulingResults.innerHTML = "";

  const schedulingTasks =
    typeOfTasks === "priodic"
      ? getpriodicSchedule(filterTaskes)
      : getApriodicSchedule(filterTaskes);

  if (typeOfTasks === "priodic") {
    const messageEL = createTaskDOM(
      "****Earliest deadline scheduling using completion deadlines**** :)"
    );
    schedulingResults.appendChild(messageEL);
  }
  schedulingTasks.forEach((message) => {
    const messageEl = createTaskDOM(message);
    schedulingResults.appendChild(messageEl);
  });
};

export {
  renderTasks,
  generateTaskDOM,
  taskStatusMessageEl,
  renderMessageEditPage,
  renderScheduling,
};
