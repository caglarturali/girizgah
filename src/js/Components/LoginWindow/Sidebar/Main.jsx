// CommandPanel -> Required by Main
// --------------------------------------
// The system management half of the greeter logic.
// Displays system info and handles Sleep, Shutdown, etc.

import cxs from 'cxs';
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import * as SystemOperations from 'Logic/SystemOperations';
import WallpaperSwitcher from './WallpaperSwitcher';
import List from './List';
import SettingsToggler from 'Components/SettingsToggler';

import { FormattedMessage } from 'react-intl';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCommand(command, disabled, event) {
    event.preventDefault();

    if (disabled !== false) {
      window.notifications.generate(`${command} is disabled on this system.`, 'error');
      return false;
    }

    SystemOperations.handleCommand(command);
  }

  getEnabledCommands() {
    let commands = {
      Shutdown: {
        command: 'Shutdown',
        isActive: window.lightdm.can_shutdown && this.props.settings.command_shutdown_enabled,
        content: <FormattedMessage key="Power.Shutdown" id="Power.Shutdown" defaultMessage="Shutdown" />
      },
      Reboot: {
        command: 'Reboot',
        isActive: window.lightdm.can_restart && this.props.settings.command_reboot_enabled,
        content: <FormattedMessage key="Power.Reboot" id="Power.Reboot" defaultMessage="Reboot" />
      },
      Hibernate: {
        command: 'Hibernate',
        isActive: window.lightdm.can_hibernate && this.props.settings.command_hibernate_enabled,
        content: <FormattedMessage key="Power.Hibernate" id="Power.Hibernate" defaultMessage="Hibernate" />
      },
      Sleep: {
        command: 'Sleep',
        isActive: window.lightdm.can_suspend && this.props.settings.command_sleep_enabled,
        content: <FormattedMessage key="Power.Sleep" id="Power.Sleep" defaultMessage="Sleep" />
      }
    };

    // Filter out commands we can't execute.
    let enabledCommands = Object.keys(commands)
      .map(key => (commands[key] ? commands[key] : false))
      .filter(command => command.isActive !== false);

    // Are both hibernation and suspend disabled?
    // Add the row back and disable it so that the user is aware of what's happening.
    if (window.lightdm.can_suspend === false && window.lightdm.can_hibernate === false) {
      enabledCommands.push('Sleep.disabled');
    }

    return enabledCommands;
  }

  render() {
    let settings = this.props.settings;

    let hostname = window.lightdm.hostname;
    let hostnameClasses = ['right', 'hostname'];
    let hostNameDisabled = settings.hostname_enabled === false;

    let commands = this.getEnabledCommands();

    if (hostNameDisabled) {
      hostnameClasses.push('invisible');
    }

    let styles = cxs({
      background: settings.style_command_background_color
    });

    return (
      <div className={`command-panel ${styles}`}>
        <WallpaperSwitcher />
        <List enabledCommands={commands} handleCommand={this.handleCommand.bind(this)} />
        <div className="bottom">
          <div className={hostnameClasses.join(' ')}>{hostname}</div>
          <SettingsToggler key="settings-button" />
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  settings: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings
    };
  },
  null
)(Sidebar);
