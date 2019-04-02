// OnScreenKeyboardToggler -> Required by UserPicker/Main
// --------------------------------------
// Handles onscreen keyboard toggling. Straightforward stuff.

import React from 'react';
import PropTypes from 'prop-types';
import cxs from 'cxs';

import { connect } from 'react-redux';

const keyboardIcon = require('img/keyboard.svg');

const toggleSettings = props => {
  props.dispatch({
    type: 'SETTINGS_VIRTUAL_KEYBOARD_ACTIVE'
  });
};

export const OnScreenKeyboardToggler = props => {
  let classes = ['virtual-keyboard-toggler'];
  classes.push(
    cxs({
      'background-color': props.color
    })
  );

  return (
    <div
      className={classes.join(' ')}
      onClick={toggleSettings.bind(this, props)}
      dangerouslySetInnerHTML={{ __html: keyboardIcon }}
    />
  );
};

OnScreenKeyboardToggler.propTypes = {
  color: PropTypes.string.isRequired
};

export default connect(
  state => {
    return {};
  },
  null
)(OnScreenKeyboardToggler);
