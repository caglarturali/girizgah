/* eslint { no-redeclare: 0 } */
import * as Settings from '../Logic/Settings';
import { setPageZoom } from '../Utils/Utils';
import SublimeLight from '../Themes/SublimeLight';

import { defineMessages } from 'react-intl';

// Define messages.
const messages = defineMessages({
  reject: {
    id: 'SettingsReducer.Notification.Reject',
    defaultMessage: 'Reverted to previous settings, no changes saved.'
  },
  applyTheme: {
    id: 'SettingsReducer.Notification.ApplyTheme',
    defaultMessage: 'Loaded {themeName} theme. Remember to save!'
  },
  save: {
    id: 'SettingsReducer.Notification.Save',
    defaultMessage: 'Settings saved.'
  }
});

export function addAdditionalSettings(state) {
  // Define our defaults
  let distroDefault =
    window.__debug === true
      ? 'src/sample/logos/pardus-01.png'
      : '/usr/share/lightdm-webkit/themes/girizgah/src/img/logos/pardus-01.png';

  let defaults = {
    active: false,
    minimized: false,
    distro: distroDefault,

    default_user: '',
    user_switcher_enabled: true,

    date_enabled: true,
    time_enabled: true,
    time_seconds_enabled: true,

    command_shutdown_enabled: true,
    command_reboot_enabled: true,
    command_hibernate_enabled: true,
    command_sleep_enabled: true,

    avatar_enabled: true,
    avatar_size: '200px',
    avatar_shape: 'circle',

    hostname_enabled: true,

    font_scale: 1.0,

    // Set default theme to Pardus
    ...SublimeLight
  };

  let settings = {};

  for (let key of Object.keys(defaults)) {
    settings[key] = Settings.requestSetting(key, defaults[key]);
  }

  return { ...state, settings: settings, cachedSettings: settings };
}

export const SettingsReducer = (state, action) => {
  switch (action.type) {
    case 'SETTINGS_LOGO_CHANGE':
      var newSettings = { ...state.settings, distro: action.path };

      return { ...state, settings: newSettings };

    case 'SETTINGS_REJECT':
      // Restore settings from the 'default' state.
      var newSettings = { ...state.cachedSettings };

      // Create a notification
      window.notifications.generate(
        window.formatMessage(messages.reject),
        'success'
      );

      // This shouldn't be here. It is, though.
      setPageZoom(newSettings.page_zoom);

      return { ...state, settings: newSettings };

    case 'SETTINGS_APPLY_THEME':
      var newSettings = { ...state.cachedSettings, ...action.theme };

      // Create a notification
      window.notifications.generate(
        window.formatMessage(messages.applyTheme, { themeName: action.name }),
        'success'
      );

      // This shouldn't be here. It is, though.
      setPageZoom(newSettings.page_zoom);

      return { ...state, settings: newSettings };

    case 'SETTINGS_SAVE':
      // Cycle to localStorage for persistence.
      for (let key of Object.keys(state.settings)) {
        Settings.saveSetting(key, state.settings[key]);
      }

      // Save our new settings as the 'default' state.
      var newCache = { ...state.settings };

      // Create a notification
      window.notifications.generate(
        window.formatMessage(messages.save),
        'success'
      );

      return { ...state, cachedSettings: newCache };

    case 'SETTINGS_SET_VALUE':
      var newSettings = { ...state.settings };

      newSettings[action.name] = action.value;

      // This shouldn't be here. It is, though.
      setPageZoom(newSettings.page_zoom);

      return { ...state, settings: newSettings };

    case 'SETTINGS_TOGGLE_ACTIVE':
      var newSettings = { ...state.settings, active: !state.settings.active };

      // This shouldn't be here. It is, though.
      var el = document.getElementById('settings');

      if (newSettings.active === true) {
        el.className = el.className.replace(' hidden', '');
      } else {
        el.className += ' hidden';
      }

      return { ...state, settings: newSettings };

    case 'SETTINGS_TOGGLE_VALUE':
      var newSettings = { ...state.settings };

      newSettings[action.name] = !newSettings[action.name];

      return { ...state, settings: newSettings };

    case 'SETTINGS_WINDOW_MINIMIZE':
      // This shouldn't be here. It is, though.
      var categories = document.querySelectorAll('.settings-categories')[0];
      var section = document.querySelectorAll('.settings-section')[0];

      // Check if the window is already minimized.
      if (categories.className.indexOf('minimize') !== -1) {
        categories.className = categories.className.replace('minimize', '');
        section.className = section.className.replace('minimize', '');
      } else {
        categories.className = categories.className + ' minimize';
        section.className = section.className + ' minimize';
      }

      return state;

    default:
      return state;
  }
};
