import { TTableParameters } from '../types/TTableParameters';

type TGetTableParameters = (
  metadata: Record<string, any>[]
) => TTableParameters

const getTableParameters: TGetTableParameters = (metadata) => {
  return (metadata.find((c) => Object.keys(c)[0] === 'specificParameters') as Record<string, any>).specificParameters;
}

export default getTableParameters;