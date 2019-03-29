// PasswordChangeButton -> Required by Components/UserPanel
// --------------------------------------
// Toggles the PasswordChanger.

import React from 'react';
import PropTypes from 'prop-types';

export const KeyboardLayoutSelector = ({ handleLayoutChange, activeUser }) => {
  let classes = ['right'];

  return (
    <div className={classes.join(' ')}>
      <div className="keyboard-sel">
        <select onChange={e => handleLayoutChange(e)}>
          {window.lightdm.layouts.map(layoutItem => (
            <option
              key={layoutItem.name}
              value={layoutItem.name}
              selected={layoutItem.name === activeUser.layout && 'selected'}
            >
              {layoutItem.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

KeyboardLayoutSelector.propTypes = {
  handleLayoutChange: PropTypes.func.isRequired,
  activeUser: PropTypes.object.isRequired
};

export default KeyboardLayoutSelector;
