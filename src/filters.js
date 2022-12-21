const filter = {
  numberOfSteps: 0,
};

const validTask = (task) => {
  const taskBeginTime = parseInt(task.arrivalTime);
  const taskLength = parseInt(task.executionTime);
  const taskDeadline = parseInt(task.endingDeadline);

  if (
    taskBeginTime + taskLength <= taskDeadline &&
    taskBeginTime <= taskDeadline
  ) {
    return true;
  }
  return false;
};

export { validTask, filter };
