let taskList = breakBigTaskIntoMicroTasks(monsterTaskList);
requestAnimationFrame(processTaskList);

function processTaskList(taskStartTime) {
  let taskFinishTime;
  do {
    let nextTask = taskList.pop();
    processTaskList(nextTask);

    taskFinishTime = window.performance.now();
  } while (taskFinishTime - taskStartTime < 3);

  if (taskList.length > 0) {
    requestAnimationFrame(processTaskList);
  }
}
