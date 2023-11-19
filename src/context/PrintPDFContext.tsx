import { createContext, RefObject, useContext, useState } from 'react';

export type TPrintMode = 'print' | 'all' | 'current' | undefined;

interface IPrintPDFContext {
  printMode: TPrintMode;
  setPrintMode: (mode: TPrintMode) => void;
  dataRef: RefObject<HTMLDivElement> | undefined;
  setDataRef: (dataRef: RefObject<HTMLDivElement>) => void;
}

const PrintPDFContext = createContext<IPrintPDFContext>({} as IPrintPDFContext);

export const usePrintPDFContext = () => {
  const context = useContext(PrintPDFContext);

  return context;
};

export const PrintPDFContextProvider: React.FC = ({ children }) => {
  const [printMode, setPrintMode] = useState<TPrintMode>();
  const [dataRef, setDataRef] = useState<RefObject<HTMLDivElement>>();

  return (
    <PrintPDFContext.Provider value={{ printMode, setPrintMode, dataRef, setDataRef }}>
      {children}
    </PrintPDFContext.Provider>
  );
};
