import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Grid, Header } from './containers/';
import configureStore from './store';
import { ModalRoot } from './components/Modal';
import { MessageContainer } from './components';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';

import './index.scss';
import { LicenseManager } from 'ag-grid-enterprise';

LicenseManager.setLicenseKey(
  '[TRIAL]_20_November_2019_[v2]_MTU3NDIwODAwMDAwMA==cb1b5d0f20d0a992c41a506b89b828c1'
);

render(
  <Provider store={configureStore()}>
    <>
      <Header />
      <Grid />
      <ModalRoot />
      <MessageContainer />
    </>
  </Provider>,
  document.querySelector('#root')
);
