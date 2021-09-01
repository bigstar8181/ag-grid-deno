import { types } from '../actions/cars';
import { AnyAction } from 'redux';
import {
  addNewDirtyTrade,
  setTradeAsDirty,
  isNotNewTrade,
  getDifference,
  removeDirtyTradeFromState
} from '../utils';
import { IStateTrades } from '../../types';

export const initialState = {
  data: undefined,
  dirtyData: [],
  columnDef: [],
  carManufactures: [],
  carPartsByManufacture: {},
  date: ''
};

export default function reducer(
  state: IStateTrades | undefined = initialState,
  action: AnyAction
): IStateTrades {
  const { type, payload } = action;

  switch (type) {
    case types.LOAD_DATA_COMPLETE: {
      const dirtyData = [...(state.data || []).filter(d => d.isDirty)];
      return {
        ...state,
        data: [
          ...getDifference(payload.entries.data, dirtyData),
          dirtyData
        ].sort((trade1, trade2) => trade2.entryId - trade1.entryId),
        columnDef: payload.entries.columnDef,
        carPartsByManufacture: payload.entries.carPartsByManufacture,
        carManufactures: payload.entries.carManufactures
      };
    }

    case types.DELETE:
      const tradeId = payload;
      return {
        ...state,
        data: removeDirtyTradeFromState(state.data, tradeId)
      };

    case types.CLEAN:
      return { ...state, data: state.data.filter(d => !d.isDirty) };

    case types.PASTE_TRADES:
      const trades = payload;

      return {
        ...state,
        data: [
          ...getDifference(state.dirtyData, trades, 'id'),
          ...trades.map((trade: ITrades) =>
            trade.id ? { ...trade, isDirty: true } : addNewDirtyTrade(trade)
          )
        ]
      };
    case types.SET_DIRTY:
      const allTradesStored = [...(state.data || []), ...state.dirtyData];
      const trade = payload;
      return {
        ...state,
        data: isNotNewTrade(allTradesStored, trade)
          ? setTradeAsDirty(allTradesStored, trade)
          : [
              ...state.data,
              ...[trade].map((trade: ITrades) => addNewDirtyTrade(trade))
            ]
      };

    case types.SET_NEW_DATE:
      return { ...state, date: payload };

    default: {
      return state;
    }
  }
}
