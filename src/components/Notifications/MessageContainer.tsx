import { connect } from 'react-redux';
import { Message } from './Message';
import { IAppState } from '../../types';

const mapStateToProps = (state: IAppState) => {
  return {
    ...state.message
  };
};

export const MessageContainer = connect(
  mapStateToProps,
  null
)(Message);
