export const modes = [
  { id: 'task', value: 'Задачи', realData: true },
  { id: 'discussion', value: 'Совещания', realData: true },
  { id: 'calendar', value: 'Календарь', realData: true },
  { id: 'event', value: 'Изменения', realData: true },
];

export const mainModes = modes.filter((e) => e.realData).map((e) => e.id);

export const urlApi = '/smisplan-typescript/cgi';
export const TEST = true;
