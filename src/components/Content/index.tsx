import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import { SuspenseFallback } from 'components/UI/SuspenseFallback';
import Sidebar from 'components/Sidebar';

import classes from './index.module.scss';

const DataTable = lazy(() => import('components/DataTable'));
const DataCalendar = lazy(() => import('components/DataCalendar'));

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
        <Route path="calendar"
          element={
            <Suspense fallback={<SuspenseFallback type="loading" />}>
              <DataCalendar mode='discussion'/>
            </Suspense>
          }
        />

        <Route path="*"
          element={
            <Suspense fallback={<SuspenseFallback type="loading" />}>
              <DataTable />
            </Suspense>
          }
        />
      </Routes >
    </main>
  );
};

export default Content;
