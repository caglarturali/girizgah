// KeyboardLayoutSelector -> Required by Components/UserPanel
// --------------------------------------
// Shows the KeyboardLayoutSelector.

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class KeyboardLayoutSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layout: window.lightdm.layout
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ layout: e.target.value.name });
    this.props.handleLayoutChange(e.target.value);
  }

  render() {
    let classes = ['right'];

    return (
      <div className={classes.join(' ')}>
        <div className="keyboard-sel">
          <select onChange={this.handleChange}>
            {window.lightdm.layouts.map(layoutItem => (
              <option
                key={layoutItem.name}
                value={layoutItem}
                selected={layoutItem.name === this.state.layout && 'selected'}
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
  handleLayoutChange: PropTypes.func.isRequired
};

export default KeyboardLayoutSelector;
