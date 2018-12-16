import 'sass/style.sass';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import LoginWindow from './Components/LoginWindow';
import Notifications from './Utils/Notifications';

import { getDefaultState, PrimaryReducer } from './Reducers/PrimaryReducer';
import { addAdditionalSettings } from './Reducers/SettingsReducer';

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import tr from 'react-intl/locale-data/tr';
import localeData from '../locales/data.json';

addLocaleData([...en, ...tr]);

// Define user's language. Different browsers have the user locale defined
// on different fields on the `navigator` object, so we make sure to account
// for these different by checking all of them
const language = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

// Split locales with a region code
const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

// Try full locale, try locale without region code, fallback to 'en'
const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

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
