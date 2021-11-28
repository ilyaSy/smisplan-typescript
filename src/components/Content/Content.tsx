import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import DataTable from '../DataTable/DataTable';
// import Calendar from '../Calendar/Calendar';
import SuspenseFallback from '../UI/SuspenseFallback';
import classes from './Main.module.scss';

const DataTable = lazy(() => import('../DataTable/DataTable'));
const Calendar = lazy(() => import('../Calendar/Calendar'));

const Content: React.FC = () => {
  return (
    // <>
      <Routes >
        <Route path="calendar"
          element={
            <Suspense fallback={<SuspenseFallback type="loading" />}>
              <Calendar />
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
    // </>
  );
}

export default Content;
