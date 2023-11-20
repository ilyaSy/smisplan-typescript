import moment from 'moment';
import { Tag } from 'antd';

import { IDiscussion, TColumn } from 'interfaces';
import { DATE_FORMAT_PRETTY, DiscussionStatusMap, DiscussionTypeMap } from 'consts';

export const getColumns = (): TColumn<IDiscussion>[] => [
  {
    dataIndex: 'id',
    title: 'ID',
    showInTable: false,
  },
  {
    dataIndex: 'date',
    title: 'Дата',
    showInTable: true,
    // isEditable: true,
    // isFilter: true,
    // isGroup: true,
    // addMenuIndex: '3',
    // type: 'date',
    render: ({ date }: IDiscussion) => date ? moment(date).format(DATE_FORMAT_PRETTY) : null,
  },
  {
    dataIndex: 'time',
    title: 'Время',
    showInTable: true,
    // isEditable: true,
    // type: 'time',
    // addMenuIndex: '4',
  },
  {
    dataIndex: 'idTask',
    title: 'ID задачи',
    showInTable: false,
    // type: 'number',
  },
  {
    dataIndex: 'theme',
    title: 'Тема',
    showInTable: true,
    isInlineEditable: true,
    // isEditable: true,
    // isFilter: true,
    // hasFullTextLink: true,
    // isGroup: true,
    // addMenuIndex: '1',
  },
  {
    dataIndex: 'mainQuestions',
    title: 'Основные вопросы',
    showInTable: false,
    // isEditable: true,
  },
  {
    dataIndex: 'result',
    title: 'Результат',
    showInTable: false,
    // isEditable: true,
    // hasFileUploader: true,
    // type: 'fulltext',
  },
  {
    dataIndex: 'responsible',
    title: 'Ответственный',
    showInTable: true,
    // isEditable: true,
    // validValues: {
    //   getDataUrl: '/smisplan-typescript/cgi/developer/',
    // },
    // isFilter: true,
    // addMenuIndex: '2',
    // type: 'select',
    // vocabulary: 'developer',
    render: ({ responsible }: IDiscussion) => responsible ?? null, // Dictionary
  },
  {
    dataIndex: 'participants',
    title: 'Участники',
    showInTable: true,
    // isEditable: true,
    // initialValue: 'object:data,field:developer',
    // validValues: {
    //   getDataUrl: '/smisplan-typescript/cgi/developer/',
    // },
    // isFilter: true,
    // isSelectCreatable: true,
    // type: 'multi-select',
    // vocabulary: 'developer',
    render: ({ participants }: IDiscussion) => participants ?? null, // Dictionary
  },
  {
    dataIndex: 'mainTable',
    title: 'Тип обсуждения',
    showInTable: false,
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    showInTable: true,
    // isEditable: true,
    // validValues: [
    //   {
    //     text: 'Запланировано',
    //     value: 'new',
    //     tag: 'gold',
    //   },
    //   {
    //     text: 'Проведено',
    //     value: 'done',
    //     tag: 'green',
    //   },
    //   {
    //     text: 'Перенесено',
    //     value: 'postponed',
    //     tag: 'magenta',
    //   },
    //   {
    //     text: 'Отменено',
    //     value: 'rejected',
    //     tag: 'red',
    //   },
    // ],
    // isFilter: true,
    // type: 'select',
    // defaultValue: 'new',
    render: ({ status }: IDiscussion) =>
      <Tag color={DiscussionStatusMap[status].color}>{DiscussionStatusMap[status].title}</Tag>,
  },
  {
    dataIndex: 'week',
    title: 'неделя',
    showInTable: false,
  },
  {
    dataIndex: 'type',
    title: 'Формат',
    showInTable: true,
    // isEditable: true,
    // validValues: [
    //   {
    //     text: 'Отдел',
    //     value: 'otdel',
    //   },
    //   {
    //     text: 'Zoom',
    //     value: 'zoom',
    //   },
    //   {
    //     text: 'Отдел+zoom',
    //     value: 'mixed',
    //   },
    //   {
    //     text: 'Заочное',
    //     value: 'offline',
    //   },
    //   {
    //     text: 'Выездное',
    //     value: 'offsite',
    //   },
    // ],
    // isFilter: true,
    // isSelectCreatable: true,
    // type: 'select',
    // defaultValue: 'otdel',
    render: ({ type }: IDiscussion) => DiscussionTypeMap[type].title,
  },
  {
    dataIndex: 'videoConf',
    title: 'Видеоконференция',
    showInTable: false,
    // isEditable: true,
  },
];
