export const dataCounterFactory = (data, mode) => {
  const START_COUNT = {
    task: data.task.length,
    discussion: data.discussion.length,
  }
  let counter = START_COUNT[mode];

  const increase = () => ++counter;

  return increase;
}
