// PasswordChangeButton -> Required by Components/UserPanel
// --------------------------------------
// Toggles the PasswordChanger.

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export const PasswordChangeButton = ({ handlePasswordChangeClick }) => {
  let classes = ['right'];

  return (
    <div className={classes.join(' ')} onClick={handlePasswordChangeClick}>
      <FormattedMessage
        id="Login.ChangePasswordButton"
        defaultMessage="CHANGE PASSWORD"
      />
    </div>
  );
};

PasswordChangeButton.propTypes = {
  handlePasswordChangeClick: PropTypes.func.isRequired
};

export default PasswordChangeButton;
