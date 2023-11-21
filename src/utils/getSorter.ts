import { TData } from 'interfaces';

export const getSorter = <T extends TData>(key: string, a: T, b: T) => {
  const aValue = a[key];
  const bValue = b[key];

  if (typeof aValue === 'string') {
    return aValue.localeCompare(bValue);
  }

  return +aValue - +bValue;
};
