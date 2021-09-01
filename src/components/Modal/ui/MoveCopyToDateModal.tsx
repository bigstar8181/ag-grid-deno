import React from "react";
import { connect } from "react-redux";
import { Dialog, Intent, Classes } from "@blueprintjs/core";
import { hideModalAction } from "../../../modules";
import { DatePicker } from "@blueprintjs/datetime";
import moment from "moment";

interface IDeleteCarModalProps {
  isOpen: boolean;
  id: string;
  actions: { deleteCar: (id: string) => void };
  dispatch: any;
}
const MoveToCopyModal = ({
  isOpen,
  id,
  actions: { deleteCar },
  dispatch
}: IDeleteCarModalProps) => {
  const handleMoveCancel = () => dispatch(hideModalAction());

  const handleMoveConfirm = () => {
    dispatch(deleteCar(id));
    dispatch(hideModalAction());
  };

  const options = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    hasBackdrop: true,
    usePortal: true,
    useTallContent: false
  };
  const handleOnChange = a => {
    console.log(a);
    dispatch(hideModalAction());
  };

  return (
    <Dialog
      className={Classes.OVERLAY_SCROLL_CONTAINER}
      isOpen={isOpen || false}
      {...options}
    >
      <DatePicker
        className={Classes.DIALOG_BODY}
        onChange={handleOnChange}
        placeholder={"M/D/YYYY"}
        value={new Date()}
        minDate={new Date()}
        parseDate={date => moment.utc(date).format("DD-MM-YYYY")}
      />
    </Dialog>
  );
};

export default connect((state, props) => ({
  actions: state.modal.modalProps.actions,
  isOpen: state.modal.modalProps.isOpen
}))(MoveToCopyModal);
