import { memo } from 'react';
// import { TableRow, TableCell } from '@material-ui/core';

import { LoadingComponent } from 'components/UI/LoadingComponent';

type TSuspenseFallback = {
  type: 'loading' | 'textNode';
};

export const SuspenseFallback: React.FC<TSuspenseFallback> = memo(({ type }) => (
  <>
    {type === 'loading' && <LoadingComponent />}
    {type === 'textNode' && <p>...</p>}
    {/* {type === 'row' && (
        <TableRow>
          <TableCell>...</TableCell>
        </TableRow>
      )} */}
  </>
));
