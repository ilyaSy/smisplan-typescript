import { TTableParameters } from '../types/TTableParameters';

type TGetTableParameters = (
  metadata: Record<string, any>[]
) => TTableParameters

const getTableParameters: TGetTableParameters = (metadata) => {
  return metadata.find((c) => c.id === 'specificParameters') as TTableParameters;
}

export default getTableParameters;