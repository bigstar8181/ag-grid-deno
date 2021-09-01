import { types } from '../actions/modal';
import { AnyAction } from 'redux';
import { IStateModal } from '../../types';

const initialState = {
  modalType: undefined,
  modalProps: {
    isOpen: false,
    actions: {},
    id: null
  }
};

export default function(
  state: IStateModal = initialState,
  action: AnyAction
): IStateModal {
  const { type, payload } = action;
  switch (type) {
    case types.SHOW_MODAL:
      return {
        modalType: payload.modalType,
        modalProps: {
          isOpen: payload.isOpen,
          actions: payload.actions,
          id: payload.id
        }
      };
    case types.HIDE_MODAL:
      return initialState;
    default:
      return state;
  }
}
