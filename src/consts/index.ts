export {
  EModes,
  ETaskStatus, TaskStatusMap,
  ETaskPriority, TaskPriorityMap,
  EDiscussionStatus, DiscussionStatusMap,
  EDiscussionType, DiscussionTypeMap,
  EEventStatus, EventStatusMap,
  EEventMode, EventModeMap,
} from './enum';

export const modes = [
  {
    id: 'task',
    value: 'Задачи',
  },
  {
    id: 'discussion',
    value: 'Совещания',
  },
  {
    id: 'calendar',
    value: 'Календарь',
  },
  {
    id: 'event',
    value: 'Изменения',
  },
];

export const mainModes = modes.map((e) => e.id);

export const DATE_FORMAT_FULLDATE = 'DD MMMM YYYY, dddd';
export const DATE_FORMAT_PRETTY = 'dddd, DD MMMM';
export const DATE_FORMAT_DATE = 'YYYY-MM-DD';
export const DATE_FORMAT_TIME = 'HH:mm';

export const urlApi = '/smisplan-typescript/cgi';
export const TEST = true;

export const PAGE_SIZE = 10;
