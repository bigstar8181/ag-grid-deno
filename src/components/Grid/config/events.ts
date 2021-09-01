import {
  RowNode,
  GetContextMenuItemsParams,
  CellValueChangedEvent,
  PasteStartEvent,
  GridApi,
  CellClickedEvent
} from 'ag-grid-community';
import { getTradesToPaste } from '../utils/grid';
import { ITrades } from '../../../types';
import { CellKeyDownEvent } from 'ag-grid-community/dist/lib/events';
import {
  suppressKeyboardEvent,
  onCellKeyDown,
  handleCellCheckBox
} from '../utils/keyboard';
import { gridOptions } from './grid';

export default ({ actions }) => {
  function getAllDataToCopy(api: GridApi, rowIndex: number): ITrades[] {
    const rows = [];

    api.forEachNodeAfterFilterAndSort(({ data }: RowNode, index: number) => {
      if (index >= rowIndex) {
        rows.push(data);
      }
    });
    return rows;
  }
  const handlePasteStart = async ({ api, columnApi }: PasteStartEvent) => {
    const { column, rowIndex } = api.getFocusedCell();
    const { data } = api.getDisplayedRowAtIndex(rowIndex);
    const tradesToCopy = getAllDataToCopy(api, rowIndex);

    const tradeToPaste = await getTradesToPaste(
      data,
      column,
      columnApi,
      tradesToCopy
    );

    actions.pasteTrades(tradeToPaste);
  };

  return {
    onCellValueChanged: ({
      data,
      oldValue,
      newValue,
      colDef
    }: CellValueChangedEvent) => {
      if (oldValue != newValue) {
        if (data.isNoValidated) {
          delete data.validationErrors[colDef.field];
        }

        actions.updateData(data);
      }
    },
    getContextMenuItems: function getContextMenuItems({
      api,
      columnApi,
      node
    }: GetContextMenuItemsParams) {
      return [
        {
          name: 'Paste',
          action: async function() {
            const { column, rowIndex } = api.getFocusedCell();
            const { data } = node;
            const tradesToCopy = getAllDataToCopy(api, rowIndex);

            const tradeToPaste = await getTradesToPaste(
              data,
              column,
              columnApi,
              tradesToCopy
            );
            actions.pasteTrades(tradeToPaste);
          }
        },
        {
          name: 'Remove',
          action: function() {
            console.log(api.getSelectedRows());
          }
        }
      ];
    },
    onPasteEnd: handlePasteStart,
    suppressKeyboardEvent: suppressKeyboardEvent,
    onCellKeyDown(e: CellKeyDownEvent) {
      onCellKeyDown(e, actions);
    },
    onCellClicked(e: CellClickedEvent) {
      handleCellCheckBox(e, actions);
    }
  };
};
