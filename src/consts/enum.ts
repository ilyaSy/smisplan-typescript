export const enum EModes {
  task = 'task',
  discussion = 'discussion',
  calendar = 'calendar',
  event = 'event',
}

export const enum ETaskStatus {
  new = 'new',
  accepted = 'accepted',
  work = 'work',
  done = 'done',
  postponed = 'postponed',
}

export const enum ETaskPriority {
  simple = 'simple',
  medium = 'medium',
  hard = 'hard',
}

export const enum EDiscussionStatus {
  new = 'new',
  done = 'done',
  postponed = 'postponed',
  rejected = 'rejected',
}

export const enum EDiscussionType {
  otdel = 'otdel',
  zoom = 'zoom',
  mixed = 'mixed',
  offline = 'offline',
  offsite = 'offsite',
}

export const enum EEventStatus {
  new = 'new',
  done = 'done',
  postponed = 'postponed',
}

export const enum EEventMode {
  put = 'put',
  upd = 'upd',
  del = 'del',
}

export const TaskStatusMap = {
  new: {
    title: 'новая',
    color: 'gold',
    order: 1,
  },
  accepted: {
    title: 'принята',
    color: 'blue',
    order: 2,
  },
  work: {
    title: 'в работе',
    color: 'geekblue',
    order: 3,
  },
  done: {
    title: 'выполнена',
    color: 'green',
    order: 4,
  },
  postponed: {
    title: 'отложена',
    color: 'magenta',
    order: 5,
  },
};

export const TaskPriorityMap = {
  simple: {
    title: 'низкий',
    order: 1,
  },
  medium: {
    title: 'средний',
    order: 2,
  },
  hard: {
    title: 'высокий',
    order: 3,
  },
};

export const DiscussionStatusMap = {
  new: {
    title: 'запланировано',
    color: 'gold',
  },
  rejected: {
    title: 'отменено',
    color: 'red',
  },
  done: {
    title: 'проведено',
    color: 'green',
  },
  postponed: {
    title: 'перенесено',
    color: 'magenta',
  },
};

export const DiscussionTypeMap = {
  otdel: {
    title: 'отдел',
  },
  zoom: {
    title: 'zoom',
  },
  mixed: {
    title: 'отдел+zoom',
  },
  offline: {
    title: 'заочное',
  },
  offsite: {
    title: 'выездное',
  },
};

export const EventStatusMap = {
  new: {
    title: 'новая',
    color: 'gold',
  },
  done: {
    title: 'выполнена',
    color: 'green',
  },
  postponed: {
    title: 'отложена',
    color: 'magenta',
  },
};

export const EventModeMap = {
  put: {
    title: 'добавление',
  },
  upd: {
    title: 'изменение',
  },
  del: {
    title: 'удаление',
  },
};
