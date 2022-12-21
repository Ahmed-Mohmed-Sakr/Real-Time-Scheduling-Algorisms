import { getTasks, updateTask, removeTask } from "./tasks";

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

taskName.addEventListener("input", (e) => {
  updateTask(taskId, {
    taskName: e.target.value,
  });
});

arrivalTime.addEventListener("input", (e) => {
  updateTask(taskId, {
    arrivalTime: e.target.value,
  });
});
executionTime.addEventListener("input", (e) => {
  updateTask(taskId, {
    executionTime: e.target.value,
  });
});
endingDeadline.addEventListener("input", (e) => {
  updateTask(taskId, {
    endingDeadline: e.target.value,
  });
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
