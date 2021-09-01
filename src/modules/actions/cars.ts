import { ITrades } from '../../types';
import { AnyAction } from 'redux';

export const types = {
  LOAD_DATA_START: '@cars/LOAD_DATA_START',
  LOAD_DATA_COMPLETE: '@cars/LOAD_DATA_COMPLETE',
  RELOAD: '@cars/RELOAD',
  SAVE: '@cars/SAVE',
  SET_DIRTY: '@cars/SET_DIRTY',
  SET_NEW_DATE: '@cars/SET_NEW_DATE',
  SET_NEW_DATE_STARTED: '@cars/SET_NEW_DATE_STARTED',
  COPY_TO_DATE: '@cars/COPY_TO_DATE',
  MOVE_TO_DATE: '@cars/MOVE_TO_DATE',
  DELETE: '@cars/DELETE',
  DELETE_START: '@cars/DELETE_START',
  CLEAN: '@cars/CLEAN',
  PASTE_TRADES: '@cars/PASTE_TRADES'
};

export function pasteTrades(trades: ITrades[]): AnyAction {
  return {
    type: types.PASTE_TRADES,
    payload: trades
  };
}

export function loadData(date?: string): AnyAction {
  return {
    type: types.LOAD_DATA_START,
    payload: date || ''
  };
}

export function loadDataComplete(entries: any): AnyAction {
  return {
    type: types.LOAD_DATA_COMPLETE,
    payload: { entries }
  };
}

export function reload(): AnyAction {
  return {
    type: types.RELOAD
  };
}

export function save(): AnyAction {
  return {
    type: types.SAVE
  };
}

export function clean(): AnyAction {
  return {
    type: types.CLEAN
  };
}

export function deleteCar(id: string): AnyAction {
  return {
    type: types.DELETE,
    payload: id
  };
}

export function deleteCarStart(id: string): AnyAction {
  return {
    type: types.DELETE_START,
    payload: id
  };
}

export function setDirty(car: ITrades): AnyAction {
  return {
    type: types.SET_DIRTY,
    payload: car
  };
}

export function setNewDateStarted(): AnyAction {
  return {
    type: types.SET_NEW_DATE_STARTED
  };
}

export function setNewDate(date: string): AnyAction {
  return {
    type: types.SET_NEW_DATE,
    payload: date
  };
}

export function copyToDate(id: string): AnyAction {
  return {
    type: types.COPY_TO_DATE,
    payload: id
  };
}

export function moveToDate(id: string): AnyAction {
  return {
    type: types.MOVE_TO_DATE,
    payload: id
  };
}
