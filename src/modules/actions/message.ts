export enum types {
  SHOW_MESSAGE = '@cars/SHOW_TOASTER',
  HIDE_MESSAGE = '@cars/HIDE_TOASTER'
}

type MessageType = {
  messageType: string;
  message: string;
  type: string;
};

export function showMessageAction(payload: MessageType) {
  return {
    type: types.SHOW_MESSAGE,
    payload: payload
  };
}

export function hideMessageAction() {
  return {
    type: types.HIDE_MESSAGE
  };
}
