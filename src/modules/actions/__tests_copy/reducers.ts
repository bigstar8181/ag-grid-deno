v; // @flow
import { forgetMe } from '@addison-global/session';
import reducer, { initialState } from '../reducer';
import { rememberMe, requestLoginOverlay } from '../actions';
import { FIELD_AUTOLOGIN, FIELD_PASSWORD } from '../../constants';

describe('login v2 reducer test suite', () => {
  it('initial state', () => {
    // $FlowFixMe intended test
    expect(reducer(undefined, { type: '', payload: '' })).toEqual(initialState);
  });
  it('session FORGET_ME', () => {
    expect(
      reducer(
        {
          ...initialState,
          initialValues: {
            [FIELD_AUTOLOGIN]: false
          }
        },
        forgetMe()
      )
    ).toEqual(initialState);
  });
  describe('REMEMBER_ME', () => {
    it('keeps same state when no payload', () => {
      expect(reducer(initialState, rememberMe())).toEqual(initialState);
    });
    it('updates inivialValues when payload', () => {
      const payload = {
        [FIELD_AUTOLOGIN]: false
      };
      expect(reducer(initialState, rememberMe(payload))).toEqual({
        ...initialState,
        initialValues: payload
      });
    });
    it('prevents password field to be stored', () => {
      const payload = {
        [FIELD_PASSWORD]: 'something'
      };
      expect(reducer(initialState, rememberMe(payload))).toEqual(initialState);
    });
  });
  describe('REQUEST_LOGIN_OVERLAY', () => {
    it('keeps same state when no payload', () => {
      expect(reducer(initialState, requestLoginOverlay())).toEqual({
        ...initialState,
        loginOverlayShown: true
      });
    });
    it('updates inivialValues when payload', () => {
      const payload = {
        [FIELD_AUTOLOGIN]: false
      };
      expect(reducer(initialState, requestLoginOverlay(payload))).toEqual({
        ...initialState,
        initialValues: payload,
        loginOverlayShown: true
      });
    });
    it('prevents password field to be stored', () => {
      const payload = {
        [FIELD_PASSWORD]: 'something'
      };
      expect(reducer(initialState, requestLoginOverlay(payload))).toEqual({
        ...initialState,
        loginOverlayShown: true
      });
    });
    it('does not override with undefined values', () => {
      const payload = {
        [FIELD_AUTOLOGIN]: undefined
      };
      expect(reducer(initialState, requestLoginOverlay(payload))).toEqual({
        ...initialState,
        loginOverlayShown: true
      });
    });
  });
});
