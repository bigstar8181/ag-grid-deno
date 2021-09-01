// @flow
import {
  loginSubmit,
  loginSuccess,
  loginFailure,
  rememberMe,
  requestLoginOverlay,
  discardLoginOverlay,
  navigateToWebView
} from '../actions';
import {
  FIELD_PASSWORD,
  FIELD_USERNAME,
  FIELD_AUTOLOGIN
} from '../../constants';

describe('login actions test suite', () => {
  it('Login submit', () => {
    expect(
      loginSubmit({
        [FIELD_PASSWORD]: 'pwd',
        [FIELD_USERNAME]: 'usr',
        [FIELD_AUTOLOGIN]: false
      })
    ).toMatchSnapshot();
  });
  it('Login success', () => {
    expect(loginSuccess()).toMatchSnapshot();
  });
  it('login failure', () => {
    expect(loginFailure('error')).toMatchSnapshot();
  });
  it('navigate to the desired WebView Page', () => {
    expect(navigateToWebView('mockRoute')).toMatchSnapshot();
  });
  it('discard login overlay', () => {
    expect(discardLoginOverlay()).toMatchSnapshot();
  });
  describe('request login overlay', () => {
    it('without initial values', () => {
      expect(requestLoginOverlay()).toMatchSnapshot();
    });
    it('with initial values', () => {
      expect(
        requestLoginOverlay({
          [FIELD_PASSWORD]: 'pwd',
          [FIELD_USERNAME]: 'usr',
          [FIELD_AUTOLOGIN]: false
        })
      ).toMatchSnapshot();
    });
    it('filters void payload', () => {
      expect(
        requestLoginOverlay({
          [FIELD_PASSWORD]: undefined,
          [FIELD_USERNAME]: 'usr',
          [FIELD_AUTOLOGIN]: false
        })
      ).toMatchSnapshot();
    });
  });
  describe('remember me', () => {
    it('without initial values', () => {
      expect(rememberMe()).toMatchSnapshot();
    });
    it('with initial values', () => {
      expect(
        rememberMe({
          [FIELD_PASSWORD]: 'pwd',
          [FIELD_USERNAME]: 'usr',
          [FIELD_AUTOLOGIN]: false
        })
      ).toMatchSnapshot();
    });
    it('filters void payload', () => {
      expect(
        rememberMe({
          [FIELD_PASSWORD]: undefined,
          [FIELD_USERNAME]: 'usr',
          [FIELD_AUTOLOGIN]: false
        })
      ).toMatchSnapshot();
    });
  });
});
