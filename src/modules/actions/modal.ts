export enum types {
  SHOW_MODAL = '@cars/SHOW_MODAL',
  HIDE_MODAL = '@cars/HIDE_MODAL'
}

type ModalType = {
  modalType: string;
  isOpen: boolean;
  actions: any;
  id: string;
};

export function showModalAction(payload: ModalType) {
  return {
    type: types.SHOW_MODAL,
    payload: payload
  };
}

export function hideModalAction() {
  return {
    type: types.HIDE_MODAL
  };
}
