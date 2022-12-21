import { getTasks } from "./tasks";
import { filter } from "./filters";
import { renderScheduling } from "./views";
const typeOfTasks = location.hash.substring(1);
const tasks = getTasks();

const getApriodicSchedule = (filterTaskes) => {};

renderScheduling(typeOfTasks, tasks);

document.querySelector("#steps-number").addEventListener("input", (e) => {
  filter.numberOfSteps = e.target.value;
  renderScheduling(typeOfTasks, tasks);
});

export { getApriodicSchedule };
