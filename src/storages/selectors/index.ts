import { useSelector } from 'react-redux';

import { TRootState } from 'storages/storage';

export const useDataSelector = () => useSelector((state: TRootState) => state.dataReducer);

export const useMetadataSelector = () => useSelector((state: TRootState) => state.metadataReducer);
