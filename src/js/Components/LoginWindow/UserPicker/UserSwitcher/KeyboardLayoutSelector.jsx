// KeyboardLayoutSelector -> Required by Components/UserPanel
// --------------------------------------
// Shows the KeyboardLayoutSelector.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class KeyboardLayoutSelector extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {
    const selectedLayoutName = e.target.value;
    // Find corresponding Layout object and pass it to the parent.
    const selectedLayoutObj = window.lightdm.layouts.filter(
      item => item.name === selectedLayoutName
    )[0];
    this.props.handleLayoutChange(selectedLayoutObj);
  }

  render() {
    let classes = ['right'];

    return (
      <div className={classes.join(' ')}>
        <div className="keyboard-sel">
          <select
            onChange={this.handleChange.bind(this)}
            value={this.props.activeLayout}
          >
            {window.lightdm.layouts.map(layoutItem => (
              <option key={layoutItem.name} value={layoutItem.name}>
                {layoutItem.description}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

KeyboardLayoutSelector.propTypes = {
  handleLayoutChange: PropTypes.func.isRequired,
  activeLayout: PropTypes.string.isRequired
};
