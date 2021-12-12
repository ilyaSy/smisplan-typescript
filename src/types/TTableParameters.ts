export type TTableParameters = {
  tableName: string,
  mainValue: string
  addMenuTitle?: string,
  defaultSortField?: string,
  defaultSortDirection?: "asc" | "desc",
  defaultGroupField?: string,
  hasEditMenu?: boolean,
  hasDeleteButton?: boolean,
  hasQuestions?: boolean,
  hasSetStatusMenu?: boolean,
  hasGoToDiscussion?: boolean,
  hasTitleRow?: boolean,
  hasAddMenu?: boolean,
  hasDoneButton?: boolean,
  hasSublistData?: boolean,
  hasDiscussion?: boolean,
  hasNotificationButton?: boolean,
  hasEditMenuSaveAsNew?: boolean
}
