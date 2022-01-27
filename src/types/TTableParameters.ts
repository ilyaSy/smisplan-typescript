export type TTableParameters = {
  tableName: string,
  mainValue: string
  addMenuTitle?: string,
  defaultSortField?: string,
  defaultSortDirection?: "asc" | "desc",
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
