import { connect } from 'react-redux';
import {
  save,
  setDirty,
  deleteCar,
  deleteCarStart,
  setNewDateStarted,
  getAllTrades,
  copyToDate,
  moveToDate
} from '../modules';
import { Grid } from '../components';
import { IAppState, ITrades } from '../types';
import { pasteTrades } from '../modules/actions/cars';

const mapStateToProps = (state: IAppState) => {
  return {
    rowData: getAllTrades(state), //changed
    haveDirtyTrade: state.app.dirtyData.length > 0,
    columnDef: state.app.columnDef,
    carManufactures: state.app.carManufactures,
    carPartsByManufacture: state.app.carPartsByManufacture
  };
};

const mapDispatchToProps = {
  saveData: () => {
    return save();
  },
  updateData: (trade: ITrades) => {
    return setDirty(trade);
  },
  delete: (id: string) => {
    return deleteCar(id);
  },
  deleteCarStart: (id: string) => {
    return deleteCarStart(id);
  },
  setNewDate: () => {
    return setNewDateStarted();
  },
  copyToDate: (id: string) => {
    return copyToDate(id);
  },
  moveToDate: (id: string) => {
    return moveToDate(id);
  },
  pasteTrades: (trades: ITrades[]) => {
    return pasteTrades(trades);
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
