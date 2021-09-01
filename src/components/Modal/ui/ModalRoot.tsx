import React from 'react';
import { connect } from 'react-redux';
import DeleteCarModal from './DeleteCarModal';
import MoveCopyToDateModal from './MoveCopyToDateModal';
import exitCarModal from './ConfirmSaveCarsModal';

const MODAL_COMPONENTS = {
  DELETE_CAR: DeleteCarModal,
  CONFIRM_SAVE_CARS: exitCarModal,
  MOVE_CAR_TO_DATE: DeleteCarModal,
  COPY_TO_DATE: MoveCopyToDateModal
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return <span />;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

export default connect(state => state.modal)(ModalRoot);
