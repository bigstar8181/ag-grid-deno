import uuid from 'uuid';
import { ITrades } from './../types';

export const deleteEntryFromLocalStorage = (id: string) => {
  const item = localStorage.getItem('cars');
  const carsStorage = item ? JSON.parse(item) : [];
  const newCarStorage = carsStorage.filter((car: ITrades) => car.id !== id);

  localStorage.setItem('cars', JSON.stringify(newCarStorage));
};

export const createEntryFromLocalStorage = (cars: ITrades[]) => {
  const newCars = cars.map(car => ({
    ...car,
    isDirty: false,
    entryId: car.entryId || uuid.v4(),
    id: uuid.v4()
  }));

  localStorage.setItem('cars', JSON.stringify(newCars));
};

export function getDefaultTradeValues() {
  return {
    make: '',
    model: '',
    release: '',
    price: 0,
    entryId: '',
    date: new Date().toISOString()
  };
}

export function getDifference(
  a1: Array<any> = [],
  a2: Array<any> = [],
  key: string = 'entryId'
) {
  const a = a1.filter((o1: any) => !a2.some((o2: any) => o1[key] === o2[key]));
  return a;
}

export function isNotNewTrade(trades: ITrades[], trade: ITrades) {
  return trades.some(function(tradeStored: ITrades): boolean {
    return tradeStored.id === trade.id;
  });
}

export function addNewDirtyTrade(trade: ITrades): ITrades {
  return { ...getDefaultTradeValues(), ...trade, isDirty: true, id: uuid.v4() };
}

export function setTradeAsDirty(trades: ITrades[], trade: ITrades): ITrades[] {
  return trades.map(function(tradeStored: ITrades) {
    return tradeStored.id === trade.id // change id
      ? { ...trade, isDirty: true } // change isDirty
      : tradeStored;
  });
}

export function removeDirtyTradeFromState(
  trades: ITrades[],
  tradeId: string
): ITrades[] {
  return trades
    ? trades.filter(function(tradeStored: ITrades) {
        return tradeStored.id !== tradeId; // change id
      })
    : undefined;
}

export function sortByTimestamp(list: ITrades[]): ITrades[] {
  return list.sort(function(a: ITrades, b: ITrades) {
    if (Number(a.entryId) && Number(b.entryId)) {
      if (a.entryId < b.entryId) {
        return -1;
      }
      if (a.entryId > b.entryId) {
        return 1;
      }
    }
    return 0;
  });
}
