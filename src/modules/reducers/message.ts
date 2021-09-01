import { types } from '../actions/message';
import { AnyAction } from 'redux';
import { IStateMessage } from '../../types';

const initialState = {
  messageType: undefined,
  messageProps: {
    message: false,
    type: undefined
  }
};

export default function(
  state: IStateMessage = initialState,
  { type, payload }: AnyAction
): IStateMessage {
  switch (type) {
    case types.SHOW_MESSAGE:
      return {
        messageType: payload.messageType,
        messageProps: {
          message: payload.message,
          type: payload.type
        }
      };
    case types.HIDE_MESSAGE:
      return initialState;
    default:
      return state;
  }
}
