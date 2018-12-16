// UserSwitchButton -> Required by Components/UserPanel
// --------------------------------------
// Toggles the UserSwitcher.

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export const UserSwitchButton = ({ handleSwitcherClick }) => {
  let classes = ['left'];

  if (window.lightdm.users.length < 2) {
    classes.push('disabled');
  }

  return (
    <div className={classes.join(' ')} onClick={handleSwitcherClick}>
      <FormattedMessage id="Login.SwitchButton" defaultMessage="SWITCH USER" />
    </div>
  );
};

UserSwitchButton.propTypes = {
  handleSwitcherClick: PropTypes.func.isRequired
};

export default UserSwitchButton;
