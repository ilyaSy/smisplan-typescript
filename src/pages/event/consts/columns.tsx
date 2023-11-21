import moment from 'moment';
import { Tag } from 'antd';

import { IEvent, TColumn } from 'interfaces';
import { DATE_FORMAT_DATE, DATE_FORMAT_TIME, EventModeMap, EventStatusMap } from 'consts';

export const getColumns = (): TColumn<IEvent>[] => [
  {
    dataIndex: 'id',
    title: 'ID',
    showInTable: true,
  },
  {
    dataIndex: 'event',
    title: 'Действие',
    showInTable: true,
    // isEditable: false,
    // validValues: [
    //   {
    //     text: "Добавление",
    //     value: "put"
    //   },
    //   {
    //     text: "Изменение",
    //     value: "upd"
    //   },
    //   {
    //     text: "Удаление",
    //     value: "del"
    //   }
    // ],
    // isFilter: true,
    // type: 'select',
    render: ({ event }: IEvent) => EventModeMap[event].title,
  },
  {
    dataIndex: 'task_id',
    'title': 'ID задачи',
    showInTable: true,
  },
  {
    dataIndex: 'mainTable',
    title: 'Таблица',
    showInTable: true,
    // "validValues": [
    //   {
    //     "text": "Задачи",
    //     "value": "task"
    //   },
    //   {
    //     "text": "Обсуждения",
    //     "value": "discussion"
    //   }
    // ],
    // "isFilter": true,
    // "type": "select",
    // "defaultValue": "task"
  },
  {
    dataIndex: 'project',
    title: 'Проект',
    // type: 'select',
    showInTable: true,
    // validValues: {
    //   getDataUrl: '/smisplan-typescript/cgi/project/',
    // },
    // isFilter: true,
    // defaultValue: 'otdel',
    render: ({ project }: IEvent) => project ?? null, // Dictionary[project]
  },
  {
    dataIndex: 'developer',
    title: 'Ответственный',
    showInTable: true,
    // type: 'select',
    // validValues: {
    //   getDataUrl: '/smisplan-typescript/cgi/developer/',
    // },
    // isFilter: true,
    // vocabulary: 'developer',
    isGroup: true,
    isSortable: true,
    // addMenuIndex: true,
    render: ({ developer }: IEvent) => developer ?? null, // Dictionary
  },
  {
    dataIndex: 'theme',
    title: 'Тема',
    showInTable: true,
    // hasFullTextLink: true,
  },
  {
    dataIndex: 'change_all',
    title: 'Все изменения',
    showInTable: false,
  },
  {
    dataIndex: 'status_old',
    title: 'Статус старый"',
    showInTable: false,
    // "validValues": [
    //   {
    //     "text": "Не согласована",
    //     "value": "new"
    //   },
    //   {
    //     "text": "В работе",
    //     "value": "work"
    //   },
    //   {
    //     "text": "Выполнена",
    //     "value": "done"
    //   }
    // ],
    // type: 'select',
    // isFilter: true,
    // defaultValue: 'new',
    render: ({ status_old: status }: IEvent) =>
      <Tag color={EventStatusMap[status].color}>{EventStatusMap[status].title}</Tag>,
  },
  {
    dataIndex: 'status_new',
    title: 'Статус новый',
    showInTable: true,
    // "validValues": [
    //   {
    //     "text": "Не согласована",
    //     "value": "new"
    //   },
    //   {
    //     "text": "В работе",
    //     "value": "work"
    //   },
    //   {
    //     "text": "Выполнена",
    //     "value": "done"
    //   }
    // ],
    // type: 'select',
    // isFilter: true,
    // defaultValue: 'new',
    render: ({ status_old: status }: IEvent) =>
      <Tag color={EventStatusMap[status].color}>{EventStatusMap[status].title}</Tag>,
  },
  {
    dataIndex: 'dt',
    title: 'Время изменений',
    showInTable: true,
    render: ({ dt }: IEvent) => dt ? moment(dt).format(`${DATE_FORMAT_DATE} ${DATE_FORMAT_TIME}`) : null,
  },
];
