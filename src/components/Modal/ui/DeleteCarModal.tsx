import React from "react";
import { connect } from "react-redux";
import { Alert, Intent } from "@blueprintjs/core";
import { hideModalAction } from "../../../modules";

interface IDeleteCarModalProps {
  isOpen: boolean;
  id: string;
  actions: { deleteCar: (id: string) => void };
  dispatch: any;
}
const DeleteCarModal = ({
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

  return (
    <Alert
      cancelButtonText="Cancel"
      confirmButtonText="Move to Trash"
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleMoveCancel}
      onConfirm={handleMoveConfirm}
    >
      <p>
        Are you sure you want to move <b>filename</b> to Trash? You will be able
        to restore it later, but it will become private to you.
      </p>
    </Alert>
  );
};

export default connect((state, props) => ({
  actions: state.modal.modalProps.actions,
  isOpen: state.modal.modalProps.isOpen
}))(DeleteCarModal);

//https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680#35641680

// differenxeBy
// const arrayOne = [
//   { value: "4a55eff3-1e0d-4a81-9105-3ddd7521d642", display: "Jamsheer" },
//   { value: "644838b3-604d-4899-8b78-09e4799f586f", display: "Muhammed" },
//   { value: "b6ee537a-375c-45bd-b9d4-4dd84a75041d", display: "Ravi" },
//   { value: "e97339e1-939d-47ab-974c-1b68c9cfb536", display: "Ajmal" },
//   { value: "a63a6f77-c637-454e-abf2-dfb9b543af6c", display: "Ryan" },
// ];

// const arrayTwo = [
//   { value: "4a55eff3-1e0d-4a81-9105-3ddd7521d642", display: "Jamsheer"},
//   { value: "644838b3-604d-4899-8b78-09e4799f586f", display: "Muhammed"},
//   { value: "b6ee537a-375c-45bd-b9d4-4dd84a75041d", display: "Ravi"},
//   { value: "e97339e1-939d-47ab-974c-1b68c9cfb536", display: "Ajmal"},
// ];

// const results = arrayOne.filter(({ value: id1 }) => !arrayTwo.some(({ value: id2 }) => id2 === id1));

// console.log(results);
