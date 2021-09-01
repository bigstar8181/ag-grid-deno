import React, { useRef, useEffect } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';

const getMessageType = {
  SUCCESS_MESSAGE: { icon: 'tick', intent: Intent.SUCCESS },
  ERROR_MESSAGE: { icon: 'warning-sign', intent: Intent.DANGER },
  WARNING_MESSAGE: { icon: 'hand', intent: Intent.WARNING }
};
export function Notification({ message, type }) {
  const myRef = useRef(null);

  function showMessage() {
    myRef.current.show({
      message,
      ...getMessageType[type]
    });
  }

  useEffect(showMessage);

  return (
    <div>
      <Toaster position={Position.BOTTOM_RIGHT} ref={myRef} />
    </div>
  );
}
