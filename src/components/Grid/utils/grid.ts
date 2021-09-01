import { Column, ColumnApi } from 'ag-grid-community';
import uuid from 'uuid';
import moment from 'moment';
import { ITrades } from '../../../types';

export const copyCar = (data: ITrades) => ({
  ...data,
  id: uuid.v4(), //is a new row to duplicate - CHANGE id
  entryId: '', //is a new row to duplicate => clean - CHANGE entryId
  isDirty: false //the original item could be true  - CHANGE isDirty
});

export function isCellEditable(col: Column, data: ITrades): boolean {
  const colDef = col['colDef'];
  const isEditable =
    typeof colDef.editable === 'function'
      ? colDef.editable({ data, colDef })
      : colDef.editable;

  return isEditable;
}

export async function pasteFromClipBoard(
  cellsProps: any,
  tradesToCopy: ITrades[]
): Promise<ITrades[] | []> {
  const delimitatorNewLine = '\n';
  const delimitator = '\t';
  const clipText = await navigator['clipboard'].readText();
  const clipsRows = clipText.split(delimitatorNewLine);

  const clipsToPaste = clipsRows.map(element => {
    const clipArray = element.split(delimitator);
    const cellPropsEditable = cellsProps.slice(0, clipArray.length);

    const clipToPaste = cellPropsEditable.reduce(
      (acc: Record<string, any>, cellPropEditable: any, index: number) => {
        const { name, allowPaste } = cellPropEditable;
        const valueToCopy = clipArray[index];

        if (allowPaste && valueToCopy) {
          if (name === 'settlement') {
            acc['additionalProperties'] = {
              [name]: valueToCopy
            };
          } else {
            acc[name] = valueToCopy;
          }
        }
        return acc;
      },
      {}
    );
    return clipToPaste;
  });

  const { length: clipsToPasteLength } = clipsToPaste;
  const tradesToUpdate = tradesToCopy.slice(0, clipsToPasteLength);
  /* Indexes of clipsToPaste is less or equal to the number of trades to update */
  const tradesUpdated = tradesToUpdate.map((trade, index) => ({
    ...trade,
    ...clipsToPaste[index],
    id: trade.id
  }));

  const tradesToAdd = clipsToPaste.filter((_, i) => {
    return i > tradesUpdated.length - 1;
  });

  const tradesToPaste = [...tradesUpdated, ...tradesToAdd];

  return tradesToPaste;
}

export async function getTradesToPaste(
  data: ITrades,
  column: Column,
  columnApi: ColumnApi,
  tradesToCopy: ITrades[]
) {
  function getAgGridCellsProps(cols: Column[]) {
    const colsProps = cols.map(function(col: Column) {
      return {
        name: col.getColId(),
        allowPaste: isCellEditable(col, data)
      };
    });

    return colsProps;
  }

  function getIndexColStartToPaste(
    colsProps: Record<string, any>[],
    colNameSelected: string
  ): number {
    return colsProps.findIndex(function(colProp: Record<string, any>) {
      return colProp.name === colNameSelected;
    });
  }

  const columns = columnApi.getAllColumns();
  const cellsProps = getAgGridCellsProps(columns);
  const colNameSel = column.getColId();
  const pivot = getIndexColStartToPaste(cellsProps, colNameSel);
  const cellsToPaste = cellsProps.slice(pivot);

  return await pasteFromClipBoard(cellsToPaste, tradesToCopy);
}

export function getUtcDate(localDate: Date) {
  return moment.utc(localDate).format();
}

export function getStringFromDate(localDate: Date) {
  return localDate.toString();
}

export function getDateFormatted(localDate: Date) {
  return moment(localDate).format('DD MMM YYYY HH:mm:ss');
}

export function isCellInEditingMode(api) {
  const editingCells = api.getEditingCells();
  return editingCells.length > 0;
}
