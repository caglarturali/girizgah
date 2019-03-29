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
    const selectedLayout = JSON.parse(e.target.value);
    this.props.handleLayoutChange(selectedLayout);
  }

  render() {
    let classes = ['right'];

    return (
      <div className={classes.join(' ')}>
        <div className="keyboard-sel">
          <select onChange={this.handleChange.bind(this)}>
            {window.lightdm.layouts.map(layoutItem => (
              <option
                key={layoutItem.name}
                value={JSON.stringify(layoutItem)}
                selected={
                  layoutItem.name === this.props.activeLayout && 'selected'
                }
              >
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
