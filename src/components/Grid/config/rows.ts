import { RowNode } from 'ag-grid-community';

export const rowClassRules = {
  'dirty-row': function setRowDirty({ data }: RowNode) {
    return data.isDirty;
  },
  'no-valid-row': function setRowNoValidated({ data }: RowNode) {
    return (
      !!data.validationErrors && Object.keys(data.validationErrors).length > 0
    );
  }
};
