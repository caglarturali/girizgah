import 'sass/style.sass';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import LoginWindow from './Components/LoginWindow';
import Notifications from './Utils/Notifications';

import { getDefaultState, PrimaryReducer } from './Reducers/PrimaryReducer';
import { addAdditionalSettings } from './Reducers/SettingsReducer';

import { IntlProvider } from 'react-intl';
import { language, messages } from './Locales';

export default function Main() {
  let initialState = getDefaultState();
  initialState = addAdditionalSettings(initialState);

  let store;

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    store = createStore(
      PrimaryReducer,
      initialState,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    store = createStore(PrimaryReducer, initialState);
  }

  ReactDOM.render(
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages}>
        <LoginWindow />
      </IntlProvider>
    </Provider>,
    document.getElementById('login-window-mount')
  );
}

window.onload = e => {
  // Add notifications to the global scope for error handling
  window.notifications = new Notifications();

  let init = () => {
    Main();
    document.getElementById('password-field').focus();
  };

  // Horribly convoluted for necessity because reasons
  if (window.__debug === false) {
    if (window.lightdm === undefined) {
      document.addEventListener('GreeterReady', () => {
        init();
      });
    } else {
      init();
    }
  } else {
    init();
  }
};
