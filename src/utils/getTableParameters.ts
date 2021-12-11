import { TTableParameters } from '../types/TTableSpecificParameters';

type TGetTableParameters = (
  metadata: Record<string, any>[]
) => TTableParameters

const getTableParameters: TGetTableParameters = (metadata) => {
  return metadata.filter((c) => Object.values(c)[0] === 'specificParameters') as unknown as TTableParameters;
}

export default getTableParameters;