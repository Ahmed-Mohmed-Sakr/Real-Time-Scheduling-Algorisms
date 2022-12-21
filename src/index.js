import { tasks, createTask, getTasks } from "./tasks";
import { renderTasks } from "./views";

renderTasks();

document.querySelector("#create-task").addEventListener("click", (e) => {
  const id = createTask();
  location.assign(`/edit.html#${id}`);
});

document.querySelector("#priodic-tasks").addEventListener("click", (e) => {
  location.assign(`/scheduling.html#priodic`);
});

document.querySelector("#Apriodic-tasks").addEventListener("click", (e) => {
  location.assign(`/scheduling.html#apriodic`);
});
