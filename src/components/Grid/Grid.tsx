import React, { useState, useEffect, useRef, useCallback } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { AgGridReact } from 'ag-grid-react';
import { getColumnDefs, getGridEvents, rowClassRules } from './config';
import { ITrades } from '../../types';
import uuid from 'uuid';
import useBeforeUnload from './useBeforeUnload';
import { gridOptions } from './config/grid';
import { ValidationPopup } from './ValidationPopup';

import './Grid.scss';

interface IAgGridPRops {
  carManufactures: Array<string>;
  carPartsByManufacture: Array<string>;
  rowData: Array<ITrades>;
  haveDirtyTrade: boolean;
}

export const Grid = ({ rowData, haveDirtyTrade, ...config }: IAgGridPRops) => {
  const [gridApi, setGridApi] = useState();
  const [invalidCell, setInvalidCell] = useState({ target: null, message: '' });
  const gridEl = useRef(null);

  const { carManufactures, carPartsByManufacture, ...actions } = config;
  const columnDefs = getColumnDefs({
    carManufactures,
    carPartsByManufacture,
    actions
  });

  function handleOnFocusCell({ target }) {
    function showPopup() {
      const cellClass = target.getAttribute('class');
      const isInvalidCell = cellClass
        ? cellClass.includes('no-valid-cell')
        : null;

      const invalidCellRootTarget = !!target.closest('.no-valid-cell');

      if (!isInvalidCell && !invalidCellRootTarget) {
        return setInvalidCell({ target: null, message: '' });
      }

      if (isInvalidCell || invalidCellRootTarget) {
        return setInvalidCell({
          target,
          message: 'this is a long long loooooong test message....'
        });
      }

      return;
    }

    if (target) {
      setTimeout(function() {
        showPopup();
      }, 10);
    }
  }

  function processDataFromClipboard() {
    return [[]];
  }

  useEffect(() => {
    if (gridEl.current) {
      const { current } = gridEl;

      current.addEventListener('focus', handleOnFocusCell, true);
      return () => {
        current.removeEventListener('focus', handleOnFocusCell, true);
      };
    }
  }, [gridEl]);

  useEffect(() => {
    if (gridApi && rowData) {
      const store = [...rowData, { id: uuid.v4() }];
      gridApi.setRowData(store);
    }
  }, [rowData, gridApi]);

  useBeforeUnload(haveDirtyTrade);

  return (
    <div className="ag-theme-balham bl-grid" ref={gridEl}>
      <AgGridReact
        onGridReady={({ api }) => {
          setGridApi(api);

          const mapValue = {
            Ccy: 'pluto',
            Underlying: 'paperino',
            Settlement: 'Ario'
          };

          const parser = new RegExp('{([a-zA-z]+)}', 'i');
          const format = '{Ccy} test {Underlying} @ -- {Settlement}';
          let description = format;
          let result = '';

          while (parser.test(description)) {
            const firstKey = parser.exec(description);
            const substringToReplace = firstKey[0];
            const prop = firstKey[1];
            const value = mapValue[prop] || '';

            description = description.replace(substringToReplace, value);
            const portion = description.substring(
              result.length,
              firstKey.index + value.length
            );

            if (value) {
              result += portion;
            } else {
              description = description.replace(portion, '');
            }
          }
          console.log('format', result);
        }}
        rowClassRules={rowClassRules}
        getRowNodeId={({ id }) => id}
        gridOptions={gridOptions}
        columnDefs={columnDefs}
        {...getGridEvents({ actions })}
        processDataFromClipboard={processDataFromClipboard}
      />
      {invalidCell.target && (
        <ValidationPopup
          target={invalidCell.target}
          message={invalidCell.message}
        />
      )}
    </div>
  );
};
