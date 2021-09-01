import {
  reducer as app,
  reducerModal as modal,
  reducerMessage as message
} from './modules';

export default {
  ...app,
  ...modal,
  ...message
};
