/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { dataSelector } from 'storages/selectors';
import { dataGetAction } from 'storages/actions/data';

export const useGetData = (tablename: string) => {
  const { data, isError, isLoading } = useSelector(dataSelector());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataGetAction(tablename));
  }, [tablename, dispatch]);

  return { data, isError, isLoading };
};
