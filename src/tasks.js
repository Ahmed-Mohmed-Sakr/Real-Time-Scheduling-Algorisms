import uuidv4 from "uuid/v4";
import { validTask } from "./filters";
let tasks = [];

const loadTasks = () => {
  const tasksJSON = localStorage.getItem("tasks");

  try {
    tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
  } catch (e) {
    return [];
  }
};

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getTasks = () => tasks;

const createTask = () => {
  const id = uuidv4();

  tasks.push({
    id: id,
    taskName: "",
    arrivalTime: "",
    executionTime: "",
    endingDeadline: "",
    priodic: false,
    valid: false,
  });
  saveTasks();

  return id;
};

const removeTask = (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex > -1) {
    tasks.splice(taskIndex, 1);
    saveTasks();
  }
};

const updateTask = (id, updates) => {
  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return;
  }

  if (typeof updates.taskName === "string") {
    task.taskName = updates.taskName;
  }
  if (typeof updates.arrivalTime === "string") {
    task.arrivalTime = updates.arrivalTime;
  }
  if (typeof updates.executionTime === "string") {
    task.executionTime = updates.executionTime;
  }
  if (typeof updates.endingDeadline === "string") {
    task.endingDeadline = updates.endingDeadline;
  }
  if (typeof updates.priodic === "boolean") {
    task.priodic = updates.priodic;
  }

  task.valid = validTask(task);
  saveTasks();
};

loadTasks();
export { createTask, loadTasks, saveTasks, getTasks, removeTask, updateTask };
