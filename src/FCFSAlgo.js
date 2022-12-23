import { filter } from "./filters";

const FirstComeFirstServed = (comingTasks) =>
  comingTasks.sort((a, b) => {
    if (a.arrivalTime < b.arrivalTime) {
      return -1;
    } else if (a.arrivalTime > b.arrivalTime) {
      return 1;
    } else {
      return 0;
    }
  });

const getApriodicSchedule = (filterTaskes) => {
  const makeTasksReady = structuredClone(filterTaskes);
  const messagesOfSchdulingProcess = [];
  let processingTime = 0;
  FirstComeFirstServed(makeTasksReady);

  if (makeTasksReady.length > 0 && makeTasksReady[0].arrivalTime > 0) {
    messagesOfSchdulingProcess.push(
      `Time[${0}->${
        makeTasksReady[0].arrivalTime
      }]: Ideal Time there is no Tasks to process`
    );
    processingTime = makeTasksReady[0].arrivalTime;
  }

  makeTasksReady.forEach((task) => {
    if (task.arrivalTime <= processingTime) {
      const endingTime = processingTime + parseInt(task.executionTime);
      if (endingTime <= parseInt(task.endingDeadline)) {
        messagesOfSchdulingProcess.push(
          `Time[${processingTime}->${endingTime}]: ${task.taskName}-(${task.id}) Finished successfully`
        );
        processingTime = endingTime;
      } else {
        messagesOfSchdulingProcess.push(
          `Task: ${task.taskName}-(${task.id}) Faild`
        );
      }
    } else {
      const endingTime = processingTime + (task.arrivalTime - processingTime);
      messagesOfSchdulingProcess.push(
        `Time[${processingTime}->${endingTime}]: Ideal Time there is no Tasks to process`
      );
      processingTime = endingTime;
    }
  });

  return messagesOfSchdulingProcess;
};

export { getApriodicSchedule };
