import { upperFirst } from 'lodash';
import moment from 'moment';
import { Tag } from 'antd';

import { ITask, TColumn } from 'interfaces';
import { DATE_FORMAT_FULLDATE, TaskPriorityMap, TaskStatusMap } from 'consts';

export const getColumns = (): TColumn<ITask>[] => [
  {
    dataIndex: 'id',
    title: 'ID',
    showInTable: true,
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
    isGroup: true,
    // defaultValue: 'otdel',
    render: ({ project }: ITask) => project ?? null, // Dictionary[project]
  },
  {
    dataIndex: 'title',
    title: 'Название',
    showInTable: true,
    isInlineEditable: true,
    // hasFullTextLink: true,
    // addMenuIndex: '1',
  },
  {
    dataIndex: 'description',
    title: 'Описание',
    // type: 'fulltext',
    showInTable: false,
  },
  {
    dataIndex: 'result',
    title: 'Результат',
    showInTable: false,
  },
  {
    dataIndex: 'priority',
    title: 'Приоритет',
    showInTable: true,
    // validValues: [
    //   {
    //     text: 'Низкий',
    //     value: 'simple',
    //   },
    //   {
    //     text: 'Средний',
    //     value: 'medium',
    //   },
    //   {
    //     text: 'Высокий',
    //     value: 'hard',
    //   },
    // ],
    // isFilter: true,
    // type: 'select',
    // defaultValue: 'simple',
    render: ({ priority }: ITask) => TaskPriorityMap[priority].title,
  },
  {
    dataIndex: 'status',
    title: 'Статус',
    showInTable: true,
    // type: 'select',
    // isFilter: true,
    // defaultValue: 'new',
    render: ({ status }: ITask) =>
      <Tag color={TaskStatusMap[status].color}>{TaskStatusMap[status].title}</Tag>,
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
    isSort: true,
    // addMenuIndex: true,
    render: ({ developer }: ITask) => developer ?? null, // Dictionary
  },
  {
    dataIndex: 'dateStart',
    title: 'Начало работы',
    showInTable: false,
    // isFilter: true,
    // defaultValue: 'date',
    render: ({ dateStart }: ITask) => dateStart ? moment(dateStart).format(DATE_FORMAT_FULLDATE) : null,
  },
  {
    dataIndex: 'dateEnd',
    showInTable: true,
    title: 'Срок',
    // isFilter: true,
    // type: 'date',
    render: ({ dateEnd }: ITask) => dateEnd ? moment(dateEnd).format(DATE_FORMAT_FULLDATE) : null,
  },
  {
    dataIndex: 'critical',
    title: 'Критический',
    showInTable: true,
    // validValues: [
    //   {
    //     text: 'Да',
    //     value: true,
    //     tag: 'red',
    //   },
    //   {
    //     text: 'Нет',
    //     value: false,
    //     tag: 'white',
    //   },
    // ],
    // isFilter: true,
    // defaultValue: false,
    render: ({ critical }: ITask) =>
      <Tag color={critical ? 'red' : 'white'}>{upperFirst(critical ? 'да' : 'нет')}</Tag>,
  },
  // <ActionMenu
  //     key={`action-menu-${dataItem.id}-${index}`}
  //     title='Меню действий'
  //     dataItem={dataItem}
  //     tableParameters={tableParameters}
  //     tablename={tablename}
  //   />
];
