// LoginWindow -> Required by Main
// --------------------------------------
// Style / Composition wrapper.

import cxs from 'cxs';
import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Sidebar from './Sidebar';
import UserPicker from './UserPicker';
import Settings from 'Components/Settings';
import DateTimeDisplay from 'Components/DateTimeDisplay';
import OnScreenKeyboard from '../Addons/OnScreenKeyboard/OnScreenKeyboard';

class LoginWindow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById('preloader').className += 'loaded';
  }

  render() {
    const settings = this.props.settings;

    let style = cxs({
      'border-radius': settings.window_border_radius,
      'font-size': settings.window_font_size
    });

    let boxShadow = '';
    if (settings.window_box_shadow_enabled) {
      boxShadow = 'box-shadow';
    }

    return [
      <div className={`login-window ${style} ${boxShadow}`} key="login-window">
        <Sidebar />
        <UserPicker />
      </div>,

      <DateTimeDisplay
        key="date-time-display"
        language={this.props.language}
      />,
      <Settings key="settings-window" />,
      <OnScreenKeyboard key="virtual-keyboard" />
    ];
  }
}

LoginWindow.propTypes = {
  settings: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings
    };
  },
  null
)(LoginWindow);
