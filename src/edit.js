import { getTasks, updateTask, removeTask } from "./tasks";
import { renderMessageEditPage } from "./views";

const taskName = document.querySelector("#task-name");
const arrivalTime = document.querySelector("#arrival-time");
const executionTime = document.querySelector("#execution-time");
const endingDeadline = document.querySelector("#ending-deadline");
const periodicTask = document.querySelector("#periodic-task");

const tasks = getTasks();
const taskId = location.hash.substring(1);

const task = tasks.find((task) => task.id === taskId);
console.log(task);

if (!task) {
  location.assign("/index.html");
}
taskName.value = task.taskName;
arrivalTime.value = task.arrivalTime;
executionTime.value = task.executionTime;
endingDeadline.value = task.endingDeadline;
periodicTask.checked = task.priodic;

renderMessageEditPage(task.valid);

taskName.addEventListener("input", (e) => {
  updateTask(taskId, {
    taskName: e.target.value,
  });
});

arrivalTime.addEventListener("input", (e) => {
  updateTask(taskId, {
    arrivalTime: e.target.value,
  });
  renderMessageEditPage(task.valid);
});
executionTime.addEventListener("input", (e) => {
  updateTask(taskId, {
    executionTime: e.target.value,
  });
  renderMessageEditPage(task.valid);
});
endingDeadline.addEventListener("input", (e) => {
  updateTask(taskId, {
    endingDeadline: e.target.value,
  });
  renderMessageEditPage(task.valid);
});
periodicTask.addEventListener("input", (e) => {
  updateTask(taskId, {
    priodic: e.target.checked,
  });
});

document.querySelector("#remove-task").addEventListener("click", () => {
  removeTask(taskId);
  location.assign("/index.html");
});
