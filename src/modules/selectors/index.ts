import { createSelector } from 'reselect';
import { IAppState } from '../../types';

const data = (state: IAppState) => state.app.data;
const dirtyData = (state: IAppState) => state.app.dirtyData;

export const getAllTrades = createSelector(
  [data, dirtyData],
  (data, dirtyData) => {
    return data;
  }
);
