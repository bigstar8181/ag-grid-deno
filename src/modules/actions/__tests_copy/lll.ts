// // @flow
// import { path } from 'ramda';
// import { postMessage, replyWithTimeout } from '../postMessage/webPostMessage';
// import {
//     MESSAGE_CHANNEL_STRUCTURE,
//     registerListener,
//     removeListener,
//     dispatchEvent,
//     createWebViewResponseMessage,
//     MESSAGE_CHANNEL_PROPS,
// } from '../channelUtils';
// import type { WebViewMessageType } from '../types';

// const uid = 'e34r';
// const mockPayload = { type: 'test', data: 'test' };
// const mockWebViewMessage: WebViewMessageType = {
//     ...mockPayload,
//     [MESSAGE_CHANNEL_PROPS]: { uid, type: 'request', action: 'test' },
//     value: '',
// };

// describe('WebView PostMessage Factory interface suite', () => {
//     const context = document;

//     const useChannelApp = jest.fn();

//     beforeAll(() => {
//         registerListener('message', useChannelApp, context);
//         registerListener(MESSAGE_CHANNEL_STRUCTURE.channels.WEB_APP_MSG, useChannelApp, context);
//     });
//     afterAll(() => {
//         removeListener('message', useChannelApp, context);
//         removeListener(MESSAGE_CHANNEL_STRUCTURE.channels.WEB_APP_MSG, useChannelApp, document);
//     });

//     it('WebViewPostMessage resolve a Promise with an Error-message, after the timeout is expired', async () => {
//         const message = JSON.stringify(mockPayload);
//         const promise = postMessage(message, 'sbtech', { timeout: 1000 });

//         expect(useChannelApp).toBeCalledTimes(1);
//         await promise.then((result: WebViewMessageType) => expect(path(['agInfo', 'type'], result)).toBe('error'));
//     });

//     it('Call Reply and resolve a Promise with value', async () => {
//         const mockResult = { propTest: 'test', otherProp: 11 };
//         const message: WebViewMessageType = createWebViewResponseMessage(mockWebViewMessage, mockResult);
//         const promise = replyWithTimeout(message, { context, timeout: 10000 });

//         dispatchEvent(message, 'message');
//         await promise.then((result?: *) => expect(result).toMatchObject(mockResult));
//     });
// });
