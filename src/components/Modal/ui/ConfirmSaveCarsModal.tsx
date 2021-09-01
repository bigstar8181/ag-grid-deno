import React from 'react';
import { connect } from 'react-redux';
import { Alert, Intent } from '@blueprintjs/core';
import { hideModalAction } from '../../../modules';

interface IExitCarModalProps {
  isOpen: boolean;
  currentDate: string;
  actions: { loadData: (currentDate: string) => void };
  dispatch: any;
}
const exitCarModal = ({
  currentDate,
  actions: { loadData },
  dispatch
}: IExitCarModalProps) => {
  const handleMoveCancel = () => dispatch(hideModalAction());

  const handleMoveConfirm = () => {
    dispatch(loadData(currentDate));
    dispatch(hideModalAction());
  };

  return (
    <Alert
      cancelButtonText="Cancel"
      confirmButtonText="Continue"
      icon="hand"
      intent={Intent.WARNING}
      isOpen={true}
      onCancel={handleMoveCancel}
      onConfirm={handleMoveConfirm}
    >
      <p>do you want quit?</p>
    </Alert>
  );
};

export default connect((state, props) => ({
  actions: state.modal.modalProps.actions,
  isOpen: state.modal.modalProps.isOpen
}))(exitCarModal);
