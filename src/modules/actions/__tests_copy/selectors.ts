// // @flow
// import { FINGERPRINT_TYPE_FACE } from '@addison-global/fingerprint';
// import {
//     isLoggingIn,
//     shouldPromptForBiometrics,
//     isAutologinEnabled,
//     isBiometricsEnabled,
//     hasStoredLoginCredentials,
//     getCredentialsStoreKey,
//     hasSecureStore,
//     hasFaceBiometrics,
//     hasBiometrics,
// } from '../selectors';
// import { STORE_NONE, STORE_AUTOLOGIN, STORE_BIOMETRICS } from '../../constants';
// import type { CredentialsStoreType } from '../../types';

// const getState = (credentialsStore?: CredentialsStoreType = STORE_NONE) => ({
//     session: {
//         sbtechReadySender: 'appContainer',
//         credentialsStore,
//         loggingIn: false,
//         isLoggedIn: false,
//         promptedBiometrics: false,
//         hasSecureStore: true,
//         biometricsType: FINGERPRINT_TYPE_FACE,
//     },
// });

// describe('session v2 selectors test suite', () => {
//     describe('autologin enabled', () => {
//         it('resolves true when autologin set', () => {
//             const state = getState(STORE_AUTOLOGIN);
//             expect(isAutologinEnabled(state)).toEqual(true);
//         });
//         it('resolves false when biometrics set', () => {
//             const state = getState(STORE_BIOMETRICS);
//             expect(isAutologinEnabled(state)).toEqual(false);
//         });
//         it('resolves false when none set', () => {
//             const state = getState();
//             expect(isAutologinEnabled(state)).toEqual(false);
//         });
//     });
//     describe('biometrics enabled', () => {
//         it('resolves true when biometrics set', () => {
//             const state = getState(STORE_BIOMETRICS);
//             expect(isBiometricsEnabled(state)).toEqual(true);
//         });
//         it('resolves false when autologin set', () => {
//             const state = getState(STORE_AUTOLOGIN);
//             expect(isBiometricsEnabled(state)).toEqual(false);
//         });
//         it('resolves false when none set', () => {
//             const state = getState();
//             expect(isBiometricsEnabled(state)).toEqual(false);
//         });
//     });
//     describe('has stored credentials', () => {
//         it('resolves true when autologin set', () => {
//             const state = getState(STORE_AUTOLOGIN);
//             expect(hasStoredLoginCredentials(state)).toEqual(true);
//         });
//         it('resolves true when biometrics set', () => {
//             const state = getState(STORE_BIOMETRICS);
//             expect(hasStoredLoginCredentials(state)).toEqual(true);
//         });
//         it('resolves false when none set', () => {
//             const state = getState();
//             expect(hasStoredLoginCredentials(state)).toEqual(false);
//         });
//     });
//     it('logging in', () => {
//         const state = getState();
//         expect(isLoggingIn(state)).toEqual(false);
//     });
//     describe('should prompt biometrics', () => {
//         it('resolves prompted biometrics flag if credentialsStore is unset', () => {
//             const state = getState();
//             expect(shouldPromptForBiometrics(state)).toEqual(true);
//         });
//         it('resolves false if credentials store is set', () => {
//             const state = getState(STORE_AUTOLOGIN);
//             expect(shouldPromptForBiometrics(state)).toEqual(false);
//         });
//     });
//     it('get credentials store key', () => {
//         const state = getState();
//         expect(getCredentialsStoreKey(state)).toEqual(STORE_NONE);
//     });
//     it('has secure store for credentials', () => {
//         const state = getState();
//         expect(hasSecureStore(state)).toEqual(true);
//     });
//     it('has Face Biometrics', () => {
//         const state = getState();
//         expect(hasFaceBiometrics(state)).toEqual(true);
//     });
//     it('has Biometrics', () => {
//         const state = getState();
//         expect(hasBiometrics(state)).toEqual(true);
//     });
// });
