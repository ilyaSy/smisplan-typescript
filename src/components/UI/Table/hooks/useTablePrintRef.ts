import { useEffect, useRef } from 'react';

import { TData } from 'types';
import { PAGE_SIZE } from 'consts';
import { usePrintPDFContext } from 'context';

interface IUseTablePrintRef {
  filterData: TData[],
  pageSize: number,
  setPageSize: (pageSize: number) => void,
}

export const useTablePrintRef = ({
  filterData,
  pageSize,
  setPageSize,
}: IUseTablePrintRef) => {
  const dataRef = useRef<HTMLDivElement>(null);
  const { setDataRef, setPrintMode, printMode } = usePrintPDFContext();

  useEffect(() => {
    if (dataRef) setDataRef(dataRef);
  }, [setDataRef]);

  useEffect(() => {
    if (printMode === 'all') {
      setPageSize(0);
      setPrintMode('print');
    } else if (printMode === 'current') {
    } else if (pageSize === 0) {
      setPageSize(PAGE_SIZE);
    }
  }, [filterData, setPageSize, pageSize, printMode, setPrintMode]);

  return dataRef;
};
