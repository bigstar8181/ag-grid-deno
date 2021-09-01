import React from 'react';
import { ITrades } from '../../types';
import {
  Icon,
  Intent,
  Popover,
  Classes,
  PopoverInteractionKind
} from '@blueprintjs/core';
interface IAgGridCheckBoxProps {
  value: boolean;
  data: ITrades;
  action: (data: ITrades) => void;
}
interface IAgGridCheckBoxState {
  selectedOption: boolean;
}
export function StatusRenderer({ api, data: { validationErrors: errors } }) {
  function handleOnClick() {
    api.ensureColumnVisible('additionalProperties.settlement');
    api.setFocusedCell(1, 'additionalProperties.settlement');
  }
  console.log(errors);
  return (
    <>
      {errors && Object.keys(errors).length > 0 ? (
        <Popover
          interactionKind={PopoverInteractionKind.HOVER}
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        >
          <Icon
            icon="error"
            intent={Intent.DANGER}
            iconSize={Icon.SIZE_STANDARD}
          />
          <>
            {Object.keys(errors).map(error => (
              <div key={error} onClick={handleOnClick}>
                {errors[error].message}
              </div>
            ))}
          </>
        </Popover>
      ) : null}
    </>
  );
}
