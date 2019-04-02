// OnScreenKeyboard -> Required by LoginWindow
// --------------------------------------
// Shows virtual keyboard.

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Draggable from 'draggable';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import turkish from './layouts/turkish.js';
import english from './layouts/english.js';

// TODO: Decide layout based on language.

import { connect } from 'react-redux';

import { setPageZoom } from 'Utils/Utils';

const WINDOWS_HEIGHT = 300;
const WINDOW_WIDTH = 720;

class OnScreenKeyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layoutName: 'default'
    };
  }

  onChange(input) {
    if (window.virtualKeyboard.onChange) {
      window.virtualKeyboard.onChange(input);
    }
  }

  onKeyPress(button) {
    if (
      button === '{shift}' ||
      button === '{shiftleft}' ||
      button === '{shiftright}' ||
      button === '{lock}' ||
      button === '{capslock}'
    )
      this.handleShift();

    if (button === '{enter}') {
      if (window.virtualKeyboard.onSubmit) {
        window.virtualKeyboard.onSubmit();
      }
    }
  }

  handleShift() {
    let layoutName = this.state.layoutName;

    this.setState({
      layoutName: layoutName === 'default' ? 'shift' : 'default'
    });
  }

  componentDidMount() {
    let draggable = new Draggable(document.getElementById('virtual-keyboard'), {
      handle: this.handle
    });

    let centerX = (window.innerWidth - WINDOW_WIDTH) / 2;
    let centerY = (window.innerHeight - WINDOWS_HEIGHT) / 2;

    draggable.set(centerX, centerY);

    // Set default zoom
    let defaultZoom = this.props.settings.page_zoom;
    setPageZoom(defaultZoom);
  }

  handleSettingsClose() {
    this.props.dispatch({
      type: 'SETTINGS_VIRTUAL_KEYBOARD_ACTIVE'
    });
  }

  render() {
    return ReactDOM.createPortal(
      <div className="virtual-keyboard">
        <div
          className="virtual-keyboard-handle"
          ref={node => (this.handle = node)}
        >
          <ul>
            <li
              className="virtual-keyboard-close"
              onClick={this.handleSettingsClose.bind(this)}
            >
              &#215;
            </li>
          </ul>
        </div>
        <div className="virtual-keyboard-body">
          <Keyboard
            ref={k => (window.virtualKeyboard = k)}
            layoutName={this.state.layoutName}
            onChange={input => this.onChange(input)}
            onKeyPress={button => this.onKeyPress(button)}
            useMouseEvents={true}
            autoUseTouchEvents={true}
            inputName={'default-virtual-keyboard'}
            preventMouseDownDefault={true}
            layout={turkish}
            physicalKeyboardHighlight={true}
            physicalKeyboardHighlightTextColor={'white'}
          />
        </div>
      </div>,
      document.getElementById('virtual-keyboard')
    );
  }
}

OnScreenKeyboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings
    };
  },
  null
)(OnScreenKeyboard);
