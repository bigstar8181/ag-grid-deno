import { AnyAction } from 'redux';
import { put, call, takeLatest, fork, select } from 'redux-saga/effects';
import { loadDataComplete, deleteCar, clean, types } from '../actions/cars';
import { setServerErrorAction } from '../actions/errors';
import { showModalAction } from '../actions/modal';
import { showMessageAction } from '../actions/message';
import PostService from '../../services/services';
import {
  createEntryFromLocalStorage,
  deleteEntryFromLocalStorage
} from '../utils';
import { IAppState, ITrades } from '../../types';
import uuid from 'uuid';
import { SagaIterator } from 'redux-saga';

const getTradesStore = (state: IAppState): ITrades[] => [
  ...state.app.data,
  ...state.app.dirtyData
];

function* save(trades: ITrades[]): SagaIterator {
  yield call(createEntryFromLocalStorage, trades);
}

function* getDataFromServer(selectedDate?: string): SagaIterator {
  try {
    const data = yield call(PostService.getAllCars);
    const carManufactures = yield call(PostService.getCarManufactures);
    const carPartsByManufacture = yield call(
      PostService.getCarPartsByManufacture
    );

    yield put(
      loadDataComplete({
        data,
        carManufactures,
        carPartsByManufacture
      })
    );
  } catch (error) {
    console.log(error);
    yield put(setServerErrorAction());
  }
}

export function* loadDataStartSaga({
  payload: selectedDate
}: AnyAction): SagaIterator {
  yield call(getDataFromServer, selectedDate);
}

export function* reload(): SagaIterator {
  yield put(clean());
  yield call(getDataFromServer);
}

export function* deleteCarStart({ payload: id }: AnyAction): SagaIterator {
  yield put(
    showModalAction({
      id,
      isOpen: true,
      modalType: 'DELETE_CAR',
      actions: { deleteCar }
    })
  );
}

export function* removeSaga({ payload }): SagaIterator {
  yield call(deleteEntryFromLocalStorage, payload);

  yield call(getDataFromServer);
  yield put(
    showMessageAction({
      message: 'remove',
      messageType: 'SUCCESS_MESSAGE',
      type: 'SUCCESS_MESSAGE'
    })
  );
}

export function* saveSaga(): SagaIterator {
  const cars = yield select(getTradesStore);
  yield call(save, cars);
  yield call(reload);
  yield put(
    showMessageAction({
      message: 'save',
      messageType: 'SUCCESS_MESSAGE',
      type: 'SUCCESS_MESSAGE'
    })
  );
}

export function* copyToDate({ payload: id }: AnyAction): SagaIterator {
  const tradeStore = yield select(getTradesStore);
  const trades = tradeStore.filter((trade: ITrades) => trade.id === id);
  const trade = {
    ...trades,
    ...{ date: '2019-10-30T19:39:14.344Z', id: uuid.v4() }
  };
  yield call(createEntryFromLocalStorage, [...tradeStore, trade]);
  yield put(deleteCar(id));
}

export function* watchInitAppSaga(): SagaIterator {
  yield fork(getDataFromServer);
  yield takeLatest(types.LOAD_DATA_START, loadDataStartSaga);
  yield takeLatest(types.DELETE_START, deleteCarStart);
  yield takeLatest(types.DELETE, removeSaga);
  yield takeLatest(types.SAVE, saveSaga);
  yield takeLatest(types.RELOAD, reload);
}
