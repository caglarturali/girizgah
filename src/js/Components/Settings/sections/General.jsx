// SettingsGeneral -> Required by Components/Settings
// --------------------------------------
// Basic distro / visibility / date & time formatting settings.

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

import * as FileOperations from 'Logic/FileOperations';
import TextField from '../inputs/TextField';
import Checkbox from '../inputs/Checkbox';

const onLogoChange = (props, e) => {
  props.dispatch({
    type: 'SETTINGS_LOGO_CHANGE',
    path: e.target.value
  });
};

const LogoChooser = props => {
  let logos = FileOperations.getLogos();
  let activeLogo = props.settings.distro;

  let items = logos.map(e => {
    let [path, fileName] = e;

    return (
      <option key={fileName} value={path}>
        {fileName.split('.')[0]}
      </option>
    );
  });

  let selectedItem = logos.filter(e => e[0] === activeLogo);
  selectedItem = selectedItem[0] || [''];

  return (
    <div>
      <div className="preview-logo">
        <img src={selectedItem[0]} />
      </div>
      <select onChange={onLogoChange.bind(this, props)} value={activeLogo}>
        {items}
      </select>
    </div>
  );
};

LogoChooser.propTypes = {
  settings: PropTypes.object.isRequired
};

export const GeneralSection = props => {
  const settings = props.settings;

  return (
    <div className="settings-general">
      <div className="left">{LogoChooser(props)}</div>
      <div className="right">
        <ul>
          <h4>
            <FormattedMessage id="Settings.General.UserFunctionality" defaultMessage="User Functionality" />
          </h4>
          <hr />
          <Checkbox
            name={'Show User Switcher'}
            value={settings.user_switcher_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'user_switcher_enabled')}
            localeContent={<FormattedMessage id="Settings.General.ShowUserSwitcher" defaultMessage="Show User Switcher" />}
          />

          <h4>
            <FormattedMessage id="Settings.General.DateTime" defaultMessage="Date & Time" />
          </h4>
          <hr />
          <Checkbox
            name={'Date Enabled'}
            value={settings.date_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'date_enabled')}
            localeContent={<FormattedMessage id="Settings.General.DateEnabled" defaultMessage="Date Enabled" />}
          />
          <TextField
            name={'Date Format'}
            value={settings.date_format}
            boundFunction={props.settingsSetValue.bind(this, 'date_format')}
            localeContent={<FormattedMessage id="Settings.General.DateFormat" defaultMessage="Date Format" />}
          />
          <Checkbox
            name={'Time Enabled'}
            value={settings.time_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'time_enabled')}
            localeContent={<FormattedMessage id="Settings.General.TimeEnabled" defaultMessage="Time Enabled" />}
          />
          <TextField
            name={'Time Format'}
            value={settings.time_format}
            boundFunction={props.settingsSetValue.bind(this, 'time_format')}
            localeContent={<FormattedMessage id="Settings.General.TimeFormat" defaultMessage="Time Format" />}
          />

          <h4>
            <FormattedMessage id="Settings.General.CommandVisibility" defaultMessage="Command Visibility" />
          </h4>
          <hr />
          <Checkbox
            name={'Shutdown Enabled'}
            value={settings.command_shutdown_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'command_shutdown_enabled')}
            localeContent={<FormattedMessage id="Settings.General.ShutdownEnabled" defaultMessage="Shutdown Enabled" />}
          />
          <Checkbox
            name={'Reboot Enabled'}
            value={settings.command_reboot_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'command_reboot_enabled')}
            localeContent={<FormattedMessage id="Settings.General.RebootEnabled" defaultMessage="Reboot Enabled" />}
          />
          <Checkbox
            name={'Hibernate Enabled'}
            value={settings.command_hibernate_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'command_hibernate_enabled')}
            localeContent={<FormattedMessage id="Settings.General.HibernateEnabled" defaultMessage="Hibernate Enabled" />}
          />
          <Checkbox
            name={'Sleep Enabled'}
            value={settings.command_sleep_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'command_sleep_enabled')}
            localeContent={<FormattedMessage id="Settings.General.SleepEnabled" defaultMessage="Sleep Enabled" />}
          />

          <h4>
            <FormattedMessage id="Settings.General.AvatarVisibility" defaultMessage="Avatar Visibility" />
          </h4>
          <hr />
          <Checkbox
            name={'Avatar Enabled'}
            value={settings.avatar_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'avatar_enabled')}
            localeContent={<FormattedMessage id="Settings.General.AvatarEnabled" defaultMessage="Avatar Enabled" />}
          />

          <Checkbox
            name={'Background Enabled'}
            value={settings.avatar_background_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'avatar_background_enabled')}
            localeContent={<FormattedMessage id="Settings.General.BackgroundEnabled" defaultMessage="Background Enabled" />}
          />

          <h4>
            <FormattedMessage id="Settings.General.HostnameVisibility" defaultMessage="Hostname Visibility" />
          </h4>
          <hr />
          <Checkbox
            name={'Hostname Enabled'}
            value={settings.hostname_enabled}
            boundFunction={props.settingsToggleBinary.bind(this, 'hostname_enabled')}
            localeContent={<FormattedMessage id="Settings.General.HostnameEnabled" defaultMessage="Hostname Enabled" />}
          />
        </ul>
      </div>
    </div>
  );
};

GeneralSection.propTypes = {
  settings: PropTypes.object.isRequired,
  settingsSetValue: PropTypes.func.isRequired,
  settingsToggleBinary: PropTypes.func.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings
    };
  },
  null
)(GeneralSection);
