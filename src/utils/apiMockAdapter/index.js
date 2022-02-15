import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { urlApi } from '../../constants/constants';
import { dataCounterFactory } from './utils';

const user = require('../../constants/dummyData/user.json');
const developers = require('../../constants/dummyData/developers.json');
const projects = require('../../constants/dummyData/projects.json');

const metaData = {
  task: null,
  discussion: null,
  calendar: null,
  event: null,
};

metaData.task = require('../../constants/dummyData/task_meta.json');
metaData.discussion = require('../../constants/dummyData/discussion_meta.json');
metaData.calendar = require('../../constants/dummyData/calendar_meta.json');
metaData.event = require('../../constants/dummyData/event_meta.json');

const data = {
  task: null,
  discussion: null,
  calendar: null,
  event: null,
};

data.task = require('../../constants/dummyData/task.json');
data.discussion = require('../../constants/dummyData/discussion.json');
data.calendar = require('../../constants/dummyData/calendar.json');
data.event = require('../../constants/dummyData/event.json');

const mock = new MockAdapter(axios, { delayResponse: 100 });

const dataCount = {
  task: dataCounterFactory(data, "task"),
  discussion: dataCounterFactory(data, "discussion"),
};

const replyPostWithOK = (mode) => (mockResponseConfig) => {
  const body = JSON.parse(mockResponseConfig.data);
  return [200, { id: dataCount[mode](), ...body}]
}

export default function setMockAdapter() {
  // get basic information
  mock.onGet(`${urlApi}/user/`).reply(200, user);
  mock.onGet(`${urlApi}/developer/`).reply(200, developers);
  mock.onGet(`${urlApi}/project/`).reply(200, projects);

  // get meta data information
  mock.onGet(`${urlApi}/task-meta/`).reply(200, metaData.task);
  mock.onGet(`${urlApi}/discussion-meta/`).reply(200, metaData.discussion);
  mock.onGet(`${urlApi}/calendar-meta/`).reply(200, metaData.calendar);
  mock.onGet(`${urlApi}/event-meta/`).reply(200, metaData.event);

  // get data
  mock.onGet(`${urlApi}/task/`).reply(200, data.task);
  mock.onGet(`${urlApi}/discussion/`).reply(200, data.discussion);
  mock.onGet(`${urlApi}/calendar/`).reply(200, data.calendar);
  mock.onGet(`${urlApi}/event/`).reply(200, data.event);

  // get data: specific
  const pathGetTaskDiscussions = new RegExp(`${urlApi}/task/get-discussion/.+`);
  mock.onGet(pathGetTaskDiscussions).reply((mockRequestConfig) => {
    const urlArray = mockRequestConfig.url.split('/');
    const connectedTable = urlArray[urlArray.length - 3];
    const table = urlArray[urlArray.length - 2].split('-')[1];
    const id = urlArray[urlArray.length - 1];

    const connectedData = data[table]
      .filter((d) => d.mainTable === connectedTable)
      .filter((d) => d.status === 'done')
      .filter((d) => +d.idTask === +id)
      .map((d) => {
        return {
          title: `${d.date} ${d.time}`,
          description: `${d.theme}\n${d.result}`
        };
      })

    return [200, connectedData]
  });

  // put data
  // mock.onPut(`${urlApi}/task/`).reply(404);
  mock.onPut(`${urlApi}/task/`).reply(replyPostWithOK("task"));
  mock.onPut(`${urlApi}/discussion/`).reply(replyPostWithOK("discussion"));

  // patch data
  mock.onPatch(`${urlApi}/task/`).reply(replyPostWithOK("task"));
  mock.onPatch(`${urlApi}/discussion/`).reply(replyPostWithOK("discussion"));

  // delete data
  mock.onDelete(`${urlApi}/task/`).reply(replyPostWithOK("task"));
  mock.onDelete(`${urlApi}/discussion/`).reply(replyPostWithOK("discussion"));

  // post data
  mock.onPost(`${urlApi}/task/`).reply(200, { status: 'OK', error: '' });
  mock.onPost(`${urlApi}/discussion/`).reply(200, { status: 'OK', error: '' });
}

export const removeMockAdapter = () => mock.restore();
