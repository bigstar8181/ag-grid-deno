import { isCellInEditingMode, copyCar } from './grid';
import {
  selectAll,
  selectAllCellsInRow,
  selectCells,
  selectSelectedRows,
  selectColumn
} from './selection';
import {
  CellKeyDownEvent,
  CellKeyPressEvent
} from 'ag-grid-community/dist/lib/events';

export function suppressKeyboardEvent({ event }) {
  const key = event.which;
  const KEY_A = 65;
  const KEY_C = 67;
  const KEY_D = 68;
  const KEY_H = 72;
  const KEY_SPACE = 32;
  const KEY_ARROW_UP = 38;
  const KEY_ARROW_BOTTOM = 40;
  const keysToSuppress = [KEY_SPACE];

  keysToSuppress.push(KEY_A, KEY_C, KEY_D);

  if (event.ctrlKey || event.metaKey) {
    keysToSuppress.push(KEY_A, KEY_C, KEY_D, KEY_H, KEY_SPACE);
  }

  if (event.shiftKey) {
    keysToSuppress.push(KEY_ARROW_UP, KEY_ARROW_BOTTOM, KEY_SPACE);
  }

  const suppress = keysToSuppress.indexOf(key) >= 0;
  if (suppress) {
    event.preventDefault();
  }

  return suppress;
}

export function onCellKeyDown(e: CellKeyDownEvent, actions: any) {
  const { api, columnApi, data } = e;
  const event = e.event as KeyboardEvent;
  const keyPressed = event.keyCode;
  const altKeyPressed = event.altKey;
  const ctrlKeyPressed = event.ctrlKey || event.metaKey;
  const shiftPressed = event.shiftKey;
  if (ctrlKeyPressed && !altKeyPressed && !shiftPressed) {
    console.log(keyPressed);

    // select all ctrl
    if (keyPressed === 65) {
      selectAll();
      // delete
    } else if (keyPressed === 8) {
      api
        .getCellRanges()
        .forEach(
          ({ startRow: { rowIndex: startIndex }, endRow: { rowIndex } }) => {
            const aa = api.getDisplayedRowAtIndex(startIndex);
            console.log(aa.data);
          }
        );
      actions.deleteCarStart(data.id);
    } else if (keyPressed === 67) {
      // ctrl + c
      const { rowIndex, column } = api.getFocusedCell();
      const selectedRange = api.getCellRanges();
      const colKey = column.getColId();
      if (selectedRange.length > 0) {
        api.copySelectedRangeToClipboard(false);
      }
      api.setFocusedCell(rowIndex, colKey, null);
    } else if (keyPressed === 93) {
      console.log(e.column.getColId());
      selectColumn(api, e.column.getColId());
    }

    return;
  }

  if (ctrlKeyPressed && shiftPressed && !altKeyPressed) {
    if (keyPressed === 67) {
      // ctrl + shift + C
      // const { rowIndex, column } = api.getFocusedCell();
      //const colKey = column.getColId();

      const selectedRows = api.getSelectedRows();
      if (selectedRows.length > 0) {
        const columns = columnApi
          .getAllColumns()
          .map(col => col.getColId())
          .filter(colId => colId !== 'status');
        //selectSelectedRows(api, columnApi, 'date');
        //api.copySelectedRowsToClipboard(false, columns);
      }
      //api.setFocusedCell(rowIndex, colKey, null);
    }
    return;
  }
  if (altKeyPressed && !ctrlKeyPressed && !shiftPressed) {
    if (keyPressed === 68) {
      const dataCopied = copyCar(data);
      actions.updateData(dataCopied);
    } else if (keyPressed === 77) {
      actions.setNewDate();
    } else if (keyPressed === 75) {
      actions.copyToDate(data.id);
    } else if (keyPressed === 83) {
      actions.saveData();
    } else if (keyPressed === 32) {
      const { node } = e;
      node.setSelected(!node.isSelected());
    } else if (keyPressed === 67) {
      // ctrl + shift + C
      // const { rowIndex, column } = api.getFocusedCell();
      //const colKey = column.getColId();
    }
    return;
  }

  if (shiftPressed && !altKeyPressed && !ctrlKeyPressed) {
    // select single row - shift space
    if (keyPressed === 32) {
      const { node } = e;
      node.setSelected(!node.isSelected());
      selectAllCellsInRow('date');
    } else if (keyPressed === 38) {
      //arrow
      selectCells(-1);
    } else if (keyPressed === 40) {
      //arrow down
      selectCells(1);
    }
    return;
  }

  if (event.code === 'Space') {
    handleCellCheckBox(e, actions);
  }

  if (keyPressed === 40 || keyPressed === 38) {
    api.clearRangeSelection();
    api.forEachNode(node => {
      if (node.isSelected()) {
        selectSelectedRows(api, columnApi, 'date', node.rowIndex);
      }
    });
  }
  if (keyPressed === 39 && isCellInEditingMode(api)) {
    api.tabToNextCell();
  }
  if (keyPressed === 37 && isCellInEditingMode(api)) {
    api.tabToPreviousCell();
  }
}

const CELL_EDITOR = 'checkBoxEditor';

export function handleCellCheckBox(
  e: CellKeyPressEvent | CellKeyDownEvent,
  actions
) {
  const {
    event: { target },
    colDef: { cellEditor },
    data,
    api
  } = e;

  if (!target || cellEditor !== CELL_EDITOR || isCellInEditingMode(api)) {
    return;
  }

  actions.updateData({ ...data, available: !data.available });
}
