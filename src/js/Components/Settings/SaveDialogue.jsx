import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';

const rejectSettings = props => {
  props.dispatch({
    type: 'SETTINGS_REJECT'
  });
};

const saveSettings = props => {
  props.dispatch({
    type: 'SETTINGS_SAVE'
  });
};

export const SaveDialogue = props => {
  return (
    <div className="save-dialogue">
      <button
        className="settings-reject"
        onClick={rejectSettings.bind(this, props)}
      >
        <FormattedMessage id="Settings.Revert" defaultMessage="Revert" />
      </button>
      <button
        className="settings-save"
        onClick={saveSettings.bind(this, props)}
      >
        <FormattedMessage id="Settings.Save" defaultMessage="Save" />
      </button>
    </div>
  );
};

SaveDialogue.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect(
  state => {
    return {};
  },
  null
)(SaveDialogue);
