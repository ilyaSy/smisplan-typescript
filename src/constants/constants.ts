export const modes = [
  { id: 'task', value: 'Задачи', realData: true },
  { id: 'discussion', value: 'Совещания', realData: true },
  { id: 'calendar', value: 'Календарь', realData: true },
  { id: 'event', value: 'Изменения', realData: true },
];

export const mainModes = modes.filter((e) => e.realData).map((e) => e.id);

export const DATE_FORMAT_FULLDATE = 'DD MMMM YYYY, dddd';
export const DATE_FORMAT_DATE = 'YYYY-MM-DD';
export const DATE_FORMAT_TIME = 'HH:mm';

export const urlApi = '/smisplan-typescript/cgi';
export const TEST = true;

export const PAGE_SIZE = 10;
