import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import SuspenseFallback from '../UI/SuspenseFallback';
import Sidebar from '../Sidebar';
import classes from './Content.module.scss';

const DataTable = lazy(() => import('../DataTable'));
const DataCalendar = lazy(() => import('../DataCalendar'));

const Content: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/') navigate('/task');
  }, [location, navigate]);

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
}

export default Content;
