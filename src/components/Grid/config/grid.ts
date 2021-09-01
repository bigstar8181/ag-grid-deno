import { SelectWithAutoComplete } from '../SelectWithAutoComplete';
import { RowNode, GridOptions } from 'ag-grid-community';
import { CheckBoxRenderer } from '../CheckBoxRenderer';
import { CheckBoxEditor } from '../CheckBoxEditor';
import { AgGridDatePickerEditor } from '../AgGridDatePickerEditor';
import { StatusRenderer } from '../StatusRenderer';

export const gridOptions: GridOptions = {
  frameworkComponents: {
    autosuggestion: SelectWithAutoComplete,
    checkBoxRenderer: CheckBoxRenderer,
    checkBoxEditor: CheckBoxEditor,
    agGridDatePickerEditor: AgGridDatePickerEditor,
    statusRenderer: StatusRenderer
    // textWithValidation: TextWithValidation
  },
  //rowHeight: 35,
  // isRowSelectable: function(rowNode) {
  //   return rowNode.data ? rowNode.data.entryId || rowNode.data.isDirty : false;
  // },
  rowSelection: 'multiple',
  suppressRowClickSelection: true,
  //copyHeadersToClipboard: true,
  // isRowSelectable: function(rowNode) {
  //   return rowNode.data ? rowNode.data.date: false;
  // },

  suppressCopyRowsToClipboard: true,
  enableRangeSelection: true,
  stopEditingWhenGridLosesFocus: true,

  suppressContextMenu: false,
  allowContextMenuWithControlKey: true,
  suppressClickEdit: false,
  deltaRowDataMode: true,
  defaultColDef: {
    editable: true,
    sortable: true,
    resizable: true
  },
  rowGroup: true,
  animateRows: true,
  filter: false,
  sideBar: false,
  postSort: (rowNodes: Array<RowNode>) => {
    rowNodes.push(
      ...rowNodes.splice(
        rowNodes.findIndex(
          rowNode => !rowNode.data.entryId && !rowNode.data.isDirty
        ),
        1
      )
    );
  }
};
