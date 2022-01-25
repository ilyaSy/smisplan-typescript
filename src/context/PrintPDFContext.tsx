import React, { useCallback, useContext, useMemo, useState } from "react";

interface IPrintPDFContext {
  dataPrintRef: React.RefObject<HTMLDivElement> | undefined;
  setDataPrintRef: (dataRef: React.RefObject<HTMLDivElement>) => void;
}

const PrintPDFContext = React.createContext<IPrintPDFContext>({} as IPrintPDFContext);

export const usePrintPDFContext = () => {
  const context = useContext(PrintPDFContext);
  return context;
}

export const PrintPDFContextProvider: React.FC = ({ children }) => {
  const [dataRef, setDataRef] = useState<React.RefObject<HTMLDivElement>>();

  const dataPrintRef = useMemo(() => dataRef, [dataRef]);
  const setDataPrintRef = useCallback((refObject) => setDataRef(refObject), []);

  return (
    <PrintPDFContext.Provider value={{
      dataPrintRef,
      setDataPrintRef,
    }}>
      {children}
    </PrintPDFContext.Provider>
  );
}
