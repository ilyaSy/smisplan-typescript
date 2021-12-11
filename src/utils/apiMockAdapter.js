import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { urlApi } from '../constants/constants';

const user = require('../constants/dummyData/user.json');
const developers = require('../constants/dummyData/developers.json');
const projects = require('../constants/dummyData/projects.json');

const metaData = {
  task: null,
  discussion: null,
  calendar: null,
  event: null,
};

metaData.task = require('../constants/dummyData/task_meta.json');
metaData.discussion = require('../constants/dummyData/discussion_meta.json');
metaData.calendar = require('../constants/dummyData/calendar_meta.json');
metaData.event = require('../constants/dummyData/event_meta.json');

const data = {
  task: null,
  discussion: null,
  calendar: null,
  event: null,
};

data.task = require('../constants/dummyData/task.json');
data.discussion = require('../constants/dummyData/discussion.json');
data.calendar = require('../constants/dummyData/calendar.json');
data.event = require('../constants/dummyData/event.json');

const mock = new MockAdapter(axios, { delayResponse: 100 });

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

  // put data
  mock.onPut(`${urlApi}/task/`).reply(200, { status: 'OK', error: '', data: { id: 777 } });

  mock.onPut(`${urlApi}/discussion/`).reply(200, { status: 'OK', error: '', data: { id: 777 } });

  // patch data
  mock.onPatch(`${urlApi}/task/`).reply(200, { status: 'OK', error: '', data: {} });

  mock.onPatch(`${urlApi}/discussion/`).reply(200, { status: 'OK', error: '', data: {} });

  // delete data
  mock.onDelete(`${urlApi}/task/`).reply(200, { status: 'OK', error: '' });

  mock.onDelete(`${urlApi}/discussion/`).reply(200, { status: 'OK', error: '' });

  // post data
  mock.onPost(`${urlApi}/task/`).reply(200, { status: 'OK', error: '' });

  mock.onPost(`${urlApi}/discussion/`).reply(200, { status: 'OK', error: '' });
}