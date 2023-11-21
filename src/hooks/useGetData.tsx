import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TData } from 'interfaces';
import { dataSelector } from 'storages/selectors';
import { dataGetAction } from 'storages/actions/data';

export const useGetData = <T extends TData>(tablename: string) => {
  const { data, isError, isLoading } = useSelector(dataSelector());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataGetAction(tablename));
  }, [tablename, dispatch]);

  return { data: data as T[], isError, isLoading };
};
