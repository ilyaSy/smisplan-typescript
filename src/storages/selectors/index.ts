import { createSelector } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { TRootState } from 'storages/storage';

export const dataSelector = () => createSelector((state: TRootState) => state.dataReducer, (data) => data);

export const useMetadataSelector = () => useSelector((state: TRootState) => state.metadataReducer);
