import { ColumnApi, GridApi } from 'ag-grid-community';
import { gridOptions } from '../config';

export function selectAll() {
  const { api, columnApi } = gridOptions;

  const lastRowIndex = api.getDisplayedRowCount() - 1;
  const cols = columnApi.getAllColumns();
  const lastCol = cols[cols.length - 1];
  api.clearRangeSelection();
  selectRange(api, 0, lastRowIndex - 1, 'date', lastCol.getColId());
}

export function selectAllCellsInRow(colStartName: string) {
  const { api, columnApi } = gridOptions;
  const cols = columnApi.getAllColumns();
  const lastCol = cols[cols.length - 1];

  const rows = api.getCellRanges().map((cellRange: any) => {
    const {
      startRow: { rowIndex: rowStartIndex },
      endRow: { rowIndex: rowEndIndex }
    } = cellRange;
    return { rowStartIndex, rowEndIndex };
  });

  api.clearRangeSelection();
  rows.forEach(({ rowStartIndex, rowEndIndex }) => {
    selectRange(
      api,
      rowStartIndex,
      rowEndIndex,
      colStartName,
      lastCol.getColId()
    );
  });
}

export function selectCells(direction: number) {
  const { api } = gridOptions;

  const {
    startRow: { rowIndex: rowStartIndex },
    endRow: { rowIndex: rowEndIndex },
    startColumn,
    columns
  } = api.getCellRanges()[0];

  api.clearRangeSelection();
  selectRange(
    api,
    rowStartIndex,
    rowEndIndex + direction,
    startColumn.getColId(),
    columns[columns.length - 1].getColId()
  );
}

export function selectColumn(api: GridApi, colId) {
  const lastRowIndex = api.getDisplayedRowCount() - 1;
  const aa = api.getCellRanges().map(a => {
    return { columnStart: a.startColumn.getColId() };
  });

  api.clearRangeSelection();
  aa.forEach(a => {
    selectRange(api, 0, lastRowIndex - 1, a.columnStart, a.columnStart);
  });
}

export function selectSelectedRows(
  api: GridApi,
  columnApi: ColumnApi,
  colStartName: string,
  rowIndex: number
) {
  // api.clearRangeSelection();
  //const selectedRows = api.getSelectedNodes();
  const cols = columnApi.getAllColumns();
  const lastCol = cols[cols.length - 1];
  //selectedRows.forEach(({ rowIndex }: RowNode) => {
  selectRange(api, rowIndex, rowIndex, colStartName, lastCol.getColId());
  // });
}

export function selectRange(
  api: GridApi,
  rowStartIndex: number,
  rowEndIndex: number,
  columnStart: string,
  columnEnd: string
) {
  api.addCellRange({
    rowStartIndex,
    rowEndIndex,
    columnStart,
    columnEnd
  });
}
