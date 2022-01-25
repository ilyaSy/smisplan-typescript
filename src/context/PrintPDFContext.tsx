import React, { useCallback, useContext, useMemo, useState } from "react";

export type TPrintMode = 'print' | 'all' | 'current' | undefined;

interface IPrintPDFContext {
  dataPrintMode: TPrintMode;
  setDataPrintMode: (mode:TPrintMode) => void;
  dataPrintRef: React.RefObject<HTMLDivElement> | undefined;
  setDataPrintRef: (dataRef: React.RefObject<HTMLDivElement>) => void;
}

const PrintPDFContext = React.createContext<IPrintPDFContext>({} as IPrintPDFContext);

export const usePrintPDFContext = () => {
  const context = useContext(PrintPDFContext);
  return context;
}

export const PrintPDFContextProvider: React.FC = ({ children }) => {
  const [printMode, setPrintMode] = useState<TPrintMode>();
  const [dataRef, setDataRef] = useState<React.RefObject<HTMLDivElement>>();

  const dataPrintRef = useMemo(() => dataRef, [dataRef]);
  const setDataPrintRef = useCallback((refObject) => setDataRef(refObject), []);

  const dataPrintMode = useMemo(() => printMode, [printMode]);
  const setDataPrintMode = useCallback((mode: TPrintMode) => setPrintMode(mode), []);

  return (
    <PrintPDFContext.Provider value={{
      dataPrintMode,
      setDataPrintMode,
      dataPrintRef,
      setDataPrintRef,
    }}>
      {children}
    </PrintPDFContext.Provider>
  );
}
