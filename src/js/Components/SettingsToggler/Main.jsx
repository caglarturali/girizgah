// SettingsToggler -> Required by Main
// --------------------------------------
// Handles Settings toggling. Straightforward stuff.

import React from 'react';
// import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

const settingsSVG = require('img/settings-24px.svg');

const toggleSettings = props => {
  props.dispatch({
    type: 'SETTINGS_TOGGLE_ACTIVE'
  });
};

export const SettingsToggler = props => {
  let classes = ['settings-toggler'];

  return (
    <div
      className={classes.join(' ')}
      onClick={toggleSettings.bind(this, props)}
      dangerouslySetInnerHTML={{ __html: settingsSVG }}
    />
  );
};

export default connect(
  state => {
    return {};
  },
  null
)(SettingsToggler);
