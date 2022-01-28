import { TSortDirection } from "./TSortDirection";

export type TTableParameters = {
  tableName: string,
  mainValue: string
  addMenuTitle?: string,
  defaultSortField?: string | string[],
  defaultSortDirection?: TSortDirection | TSortDirection[],
  defaultGroupField?: string,
  hasTitleRow?: boolean,
  hasAddMenu?: boolean,
  hasSublistData?: boolean,
  hasActionMenu?: boolean,
  hasEditMenu?: boolean,
  hasDeleteButton?: boolean,
  hasSetStatusMenu?: boolean,
  hasGoToDiscussion?: boolean,
  hasDiscussion?: boolean,
  hasNotificationButton?: boolean,
}
