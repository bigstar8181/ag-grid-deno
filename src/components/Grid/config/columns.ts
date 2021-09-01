import {
  BaseColDefParams,
  ValueFormatterParams
} from 'ag-grid-community/dist/lib/entities/colDef';
import { getDateFormatted } from '../utils/grid';

interface IGridOptionsPRops {
  carManufactures: Array<string>;
  carPartsByManufacture: Array<string>;
  actions: any;
}

const validatorField = 'make';
const isEditable = (field: string, value: string): boolean =>
  !!field && !!value && field.indexOf(value) > -1;

export function getColumnDefs({
  carManufactures,
  carPartsByManufacture,
  actions
}: IGridOptionsPRops) {
  return Object.keys(carManufactures).length === 0
    ? []
    : [
        {
          headerName: 'Status',
          field: 'status',
          editable: false,
          width: 100,
          pinned: true,
          suppressNavigable: true,
          cellClass: ['no-selectable-col', 'no-b'],
          cellRenderer: 'statusRenderer',
          suppressPaste: true
        },
        {
          colId: 'date',
          headerName: 'Time',
          field: 'date',
          editable: true,
          cellEditor: 'agGridDatePickerEditor',
          valueFormatter: function dateFormatted({
            value
          }: ValueFormatterParams) {
            return value && getDateFormatted(value);
          }
        },
        {
          headerName: 'Manufacture',
          field: 'make',
          colId: 'make',
          editable: true,
          cellEditor: 'autosuggestion',
          tooltipComponent: 'customTooltip',
          cellEditorParams: () => {
            return { values: carManufactures || [] };
          }
        },
        {
          headerName: 'Model',
          field: 'P/R',
          editable: true,
          cellClassRules: {
            'no-valid-cell': ({
              data: { validationErrors },
              colDef: { field }
            }) => {
              return !!(validationErrors && validationErrors[field]);
            }
          }
        },
        {
          headerName: 'Release',
          field: 'release',
          editable: true,
          cellClassRules: {
            'no-valid-cell': ({
              data: { validationErrors },
              colDef: { field }
            }) => {
              return validationErrors && validationErrors[field];
            }
          }
        },
        {
          colId: 'available',
          headerName: 'Available',
          field: 'available',
          editable: true,
          width: 100,
          cellEditor: 'checkBoxEditor',
          cellEditorParams({ data, charPress }) {
            const value =
              charPress === 'Space' ? !data.available : data.available;
            return { value };
          },
          cellRenderer: 'checkBoxRenderer'
        },
        {
          headerName: 'Settlement',
          colId: 'additionalProperties.settlement',
          field: 'additionalProperties.settlement',
          editable: true
        },
        {
          headerName: 'Price',
          field: 'price',
          cellClass: 'no-border',
          width: 100,
          suppressNavigable({
            data,
            colDef: { field }
          }: BaseColDefParams): boolean {
            return !isEditable(
              carPartsByManufacture[field],
              data[validatorField]
            );
          },
          cellClassRules: {
            disabled: ({ data, colDef: { field } }) => {
              const part = field && carPartsByManufacture[field];
              const value = data[validatorField];
              const activateCss = part && !isEditable(part, value);
              return activateCss;
            },
            'no-border': ({
              data,
              colDef: { field }
            }: BaseColDefParams): boolean =>
              !isEditable(carPartsByManufacture[field], data[validatorField])
          },
          editable: ({ data, colDef: { field } }: BaseColDefParams): boolean =>
            isEditable(carPartsByManufacture[field], data[validatorField])
        }
      ];
}

// https://www.ag-grid.com/javascript-grid-cell-editing/#example-dynamic-parameters
