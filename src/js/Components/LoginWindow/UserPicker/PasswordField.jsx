// PasswordField -> Required by Components/UserPanel/Form
// --------------------------------------
// Simple password input field.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PasswordField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: null
    };
  }

  onFocus() {
    this.setState({ focused: true });
    if (window.virtualKeyboard) {
      window.virtualKeyboard.onChange = input =>
        this.props.handlePasswordInput(input);
      window.virtualKeyboard.onSubmit = () => this.props.handleSubmit();
    }
  }

  onBlur() {
    this.setState({ focused: false });
    if (window.virtualKeyboard) {
      window.virtualKeyboard.onChange = null;
      window.virtualKeyboard.onSubmit = null;
      window.virtualKeyboard.keyboard.clearInput('default-virtual-keyboard');
    }
  }

  render() {
    // Manage synchronization between virtual keyboard and input.
    if (
      this.state.focused &&
      window.virtualKeyboard &&
      window.virtualKeyboard.keyboard
    ) {
      window.virtualKeyboard.keyboard.setInput(
        this.props.password,
        'default-virtual-keyboard'
      );
    }

    let classes = ['user-password'];

    if (this.props.passwordFailed === true) {
      classes.push('error');
    }
    return (
      <input
        id="password-field"
        type="password"
        placeholder="*******************"
        className={classes.join(' ')}
        value={this.props.password}
        onChange={this.props.handlePasswordInput}
        onFocus={this.onFocus.bind(this)}
        onBlur={this.onBlur.bind(this)}
      />
    );
  }
}

PasswordField.propTypes = {
  password: PropTypes.string.isRequired,
  passwordFailed: PropTypes.bool.isRequired,
  handlePasswordInput: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default PasswordField;
