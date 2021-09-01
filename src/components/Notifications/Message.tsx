import React from 'react';
import { Notification } from './Notification';

const MESSAGE_COMPONENTS = {
  SUCCESS_MESSAGE: Notification
};

export const Message = ({ messageType, messageProps }) => {
  if (!messageType) {
    return <span />;
  }

  const SpecificMessage = MESSAGE_COMPONENTS[messageType];
  return <SpecificMessage {...messageProps} />;
};
