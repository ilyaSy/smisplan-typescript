import React from 'react';
// import { TableRow, TableCell } from '@material-ui/core';
import LoadingComponent from './LoadingComponent';

type TSuspenseFallback = {
  type: 'loading' | 'textNode' | 'row';
};

const SuspenseFallback: React.FC<TSuspenseFallback> = ({ type }) => {
  return (
    <>
      {type === 'loading' && <LoadingComponent />}
      {type === 'textNode' && <p>...</p>}
      {/* {type === 'row' && (
        <TableRow>
          <TableCell>...</TableCell>
        </TableRow>
      )} */}
    </>
  );
};

export default React.memo(SuspenseFallback);
