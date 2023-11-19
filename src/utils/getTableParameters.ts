import { TTableParameters } from 'types';

export const getTableParameters = (metadata: Record<string, any>[]) =>
  metadata.find((c) => c.id === 'specificParameters') as TTableParameters;
