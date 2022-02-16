export const getGroupColumnData = (dataRef: React.RefObject<HTMLDivElement>, index: number) => {
  return dataRef.current
    ? Array.from(dataRef.current.querySelectorAll(`.data-table-cell-${index}`))
        .map((e) => e.textContent)  // get inner texft content
        .splice(1)                  // remove first header row text
    : []
}
