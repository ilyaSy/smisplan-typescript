/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { SuspenseFallback } from 'components/UI/SuspenseFallback';
import { Task } from 'pages/task';
import { Discussion } from 'pages/discussion';
import { Calendar } from 'pages/calendar';
import { Event } from 'pages/event';
import Sidebar from 'components/Sidebar';

import classes from './index.module.scss';

// const DataTable = lazy(() => import('components/DataTable'));
// const DataCalendar = lazy(() => import('components/DataCalendar'));

const Content: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') navigate('/task');
  }, [pathname, navigate]);

  return (
    <main className={classes.content}>
      <Sidebar />

      <Routes >
        <Route path='/task' element={<Task />} />

        <Route path='/discussion' element={<Discussion />} />

        <Route path='/event' element={<Event />} />

        <Route path='/calendar' element={<Calendar mode='discussion'/>} />

        {/* <Suspense fallback={<SuspenseFallback type="loading" />}>
          <DataCalendar mode='discussion'/>
        </Suspense> */}
      </Routes >
    </main>
  );
};

export default Content;
