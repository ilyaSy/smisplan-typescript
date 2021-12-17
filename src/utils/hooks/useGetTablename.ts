import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useGetTablename = () => {
  const [ tablename, setTablename ] = useState<string>('task');

  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname) {
      setTablename(location.pathname.replace(/\/(.+?)(\/|$)/, '$1'));
    }
  }, [location]);

  return tablename
}

export default useGetTablename;