import { filter } from "./filters";

const taskFailOrComplete = (processTime, filterTaskes, makeTasksReady) => {
  let cnt = 0;
  const messages = [];
  makeTasksReady.forEach((task) => {
    if (task.executionTime == 0 && task.endingDeadline >= processTime - 1) {
      task.arrivalTime = parseInt(task.endingDeadline);
      task.executionTime = parseInt(filterTaskes[cnt].executionTime);
      task.endingDeadline =
        parseInt(task.endingDeadline) +
        parseInt(filterTaskes[cnt].endingDeadline);
      messages.push(
        `Task: ${task.taskName}-(${task.id}) Finished Successfully`
      );
    } else if (
      task.executionTime > 0 &&
      task.endingDeadline < processTime - 1
    ) {
      task.arrivalTime = parseInt(task.endingDeadline);
      task.executionTime = parseInt(filterTaskes[cnt].executionTime);
      task.endingDeadline =
        parseInt(task.endingDeadline) +
        parseInt(filterTaskes[cnt].endingDeadline);
      messages.push(`Task: ${task.taskName}-(${task.id}) Failed`);
    }
    cnt++;
  });
  return messages;
};

const upComingTasks = (processTime, makeTasksReady) =>
  makeTasksReady.filter((task) => {
    return task.arrivalTime <= processTime;
  });

const erlistDeadlineFirst = (comingTasks) =>
  comingTasks.sort((a, b) => {
    if (a.endingDeadline > b.endingDeadline) {
      return -1;
    } else if (a.endingDeadline < b.endingDeadline) {
      return 1;
    } else {
      return 0;
    }
  });

const getpriodicSchedule = (filterTaskes) => {
  const makeTasksReady = structuredClone(filterTaskes);
  const messagesOfSchdulingProcess = [];
  const lengthOfxecution =
    filter.numberOfSteps > 10000 ? 100 : filter.numberOfSteps;
  for (let processTime = 1; processTime <= lengthOfxecution; processTime++) {
    //see finished taskes and faild ones
    const messages = taskFailOrComplete(
      processTime,
      filterTaskes,
      makeTasksReady
    );
    messagesOfSchdulingProcess.push(...messages);
    /// get tasks that started;
    const comingTasks = upComingTasks(processTime, makeTasksReady);

    // sort tasks dpending on deadline;
    const comingSortedTasks = erlistDeadlineFirst(comingTasks);

    if (comingSortedTasks.length > 0) {
      comingTasks[0].executionTime--;
      messagesOfSchdulingProcess.push(
        `Time[${processTime - 1}->${processTime}]: ${
          comingTasks[0].taskName
        }-(${comingTasks[0].id}) become has ${
          comingTasks[0].executionTime
        } unit of time to finish`
      );
    } else {
      messagesOfSchdulingProcess.push(
        `Time[${
          processTime - 1
        }->${processTime}]: Ideal Time there is no Tasks to process`
      );
    }
  }

  return messagesOfSchdulingProcess;
};

export { getpriodicSchedule };
