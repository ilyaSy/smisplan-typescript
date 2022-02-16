import { useEffect, useRef } from "react";
import { PAGE_SIZE } from "../../../../constants/constants";
import { TData } from "../../../../types/TData";
import { usePrintPDFContext } from "../../../../context/PrintPDFContext";

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
  const dataRef = useRef<HTMLDivElement>(null)
  const { setDataPrintRef, setDataPrintMode, dataPrintMode } = usePrintPDFContext();

  useEffect(() => {
    if (dataRef) setDataPrintRef(dataRef)
  }, [setDataPrintRef]);

  useEffect(() => {
    if (dataPrintMode === 'all') {
      setPageSize(0);
      setDataPrintMode('print');
    } else if (dataPrintMode === 'current') {
    }
    else if (pageSize === 0) {
      setPageSize(PAGE_SIZE);
    }
  }, [filterData, setPageSize, pageSize, dataPrintMode, setDataPrintMode])

  return dataRef;
}
