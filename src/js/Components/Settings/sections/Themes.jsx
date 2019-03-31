import PropTypes from 'prop-types';
import React from 'react';

import { connect } from 'react-redux';

import * as Settings from 'Logic/Settings';
import DefaultThemes from '../DefaultThemes';

import { FormattedMessage, defineMessages } from 'react-intl';

// Define messages.
const messages = defineMessages({
  placeholderThemeName: {
    id: 'Settings.Themes.Placeholder.ThemeName',
    defaultMessage: 'Theme Name'
  },
  themeSaved: {
    id: 'Settings.Themes.Saved',
    defaultMessage: 'Your theme has been saved.'
  },
  themeDeleted: {
    id: 'Settings.Themes.Deleted',
    defaultMessage: 'Theme has been deleted!'
  },
  enterValidName: {
    id: 'Settings.Themes.EnterValidName',
    defaultMessage: 'Please enter a valid name for your theme!'
  }
});

class Theme extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getColors() {
    let colors = [];

    for (let setting of Object.keys(this.props.theme)) {
      if (setting.startsWith('style') && setting.indexOf('color') !== -1) {
        colors.push([setting, this.props.theme[setting]]);
      }
    }

    return colors;
  }

  render() {
    let colorItems = this.getColors().map(([name, color]) => (
      <li
        key={name}
        className="theme-color-block"
        style={{ backgroundColor: color }}
        alt={color}
        title={color}
      >
        &nbsp;
      </li>
    ));

    let isDefaultTheme = !(
      Object.keys(DefaultThemes).indexOf(this.props.name) !== -1
    );

    return (
      <div className="theme">
        <div className="upper">
          <h5 className="theme-name">{this.props.name}</h5>
          <button
            onClick={this.props.loadTheme.bind(
              this,
              this.props.name,
              this.props.theme
            )}
          >
            <FormattedMessage
              id="Settings.Themes.Preview"
              defaultMessage="Preview"
            />
          </button>
          <If condition={isDefaultTheme}>
            <button
              className="delete"
              onClick={this.props.deleteTheme.bind(this, this.props.name)}
            >
              <FormattedMessage
                id="Settings.Themes.Delete"
                defaultMessage="Delete"
              />
            </button>
          </If>
        </div>
        <ul>{colorItems}</ul>
      </div>
    );
  }
}

Theme.propTypes = {
  name: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  loadTheme: PropTypes.func.isRequired,
  deleteTheme: PropTypes.func.isRequired
};

export class SettingsThemes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      themes: { ...Settings.getUserThemes(), ...DefaultThemes }
    };

    this.nodes = {};
  }

  handleDeleteTheme(themeName) {
    Settings.deleteTheme(themeName);

    this.setState({
      themes: { ...Settings.getUserThemes(), ...DefaultThemes }
    });

    window.notifications.generate(
      window.formatMessage(messages.themeDeleted),
      'success'
    );
  }

  handleLoadTheme(themeName, theme) {
    this.props.dispatch({
      type: 'SETTINGS_APPLY_THEME',
      name: themeName,
      theme: theme
    });
  }

  handleSaveTheme(e) {
    e.preventDefault();
    e.stopPropagation();

    let themeName = this.nodes.themeName.value.trim();
    if (!themeName) {
      window.notifications.generate(
        window.formatMessage(messages.enterValidName),
        'error'
      );
      return;
    }

    Settings.saveTheme(themeName, this.props.settings);

    this.setState({
      themes: { ...Settings.getUserThemes(), ...DefaultThemes }
    });

    window.notifications.generate(
      window.formatMessage(messages.themeSaved),
      'success'
    );
  }

  render() {
    let themes = this.state.themes;
    let themeItems = Object.keys(themes).map(themeName => (
      <Theme
        key={themeName}
        name={themeName}
        theme={themes[themeName]}
        loadTheme={this.handleLoadTheme.bind(this)}
        deleteTheme={this.handleDeleteTheme.bind(this)}
      />
    ));

    return (
      <div className="settings-themes">
        <div className="theme-saver">
          <p>
            <FormattedMessage
              id="Settings.Themes.SaveAsTheme"
              defaultMessage="Save current settings as a theme?"
            />
          </p>
          <input
            type="text"
            name="theme-name"
            defaultValue=""
            placeholder={window.formatMessage(messages.placeholderThemeName)}
            ref={node => (this.nodes.themeName = node)}
          />
          <button
            className="save-theme"
            onClick={this.handleSaveTheme.bind(this)}
          >
            <FormattedMessage
              id="Settings.Themes.SaveTheme"
              defaultMessage="Save Theme"
            />
          </button>
        </div>
        <div className="theme-list">{themeItems}</div>
      </div>
    );
  }
}

SettingsThemes.propTypes = {
  settings: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings
    };
  },
  null
)(SettingsThemes);
