// Clock -> Required by Components/CommandPanel
// --------------------------------------
// Just a clock.

import React from 'react';
import ReactDOM from 'react-dom';
import Strftime from 'strftime';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      formattedTime: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateClock();
      this.setState({
        initialized: true
      });
    }, 1000);
  }

  updateClock() {
    let timeFormatString = this.props.settings.time_format;
    if (this.props.isSecondsEnabled) {
      timeFormatString += '<span class="seconds">%S</span>';
    }
    this.setState({
      formattedTime: Strftime(timeFormatString)
    });

    setTimeout(() => {
      this.updateClock();
    }, 1000);
  }

  render() {
    let classes = ['clock'];
    let currentTime = this.state.formattedTime;

    if (this.state.initialized === true && this.props.settings.time_enabled === true) {
      classes.push('loaded');
    } else if (this.props.settings.time_enabled === false) {
      classes.push('invisible');
    }

    return ReactDOM.createPortal(
      <div className={classes.join(' ')} dangerouslySetInnerHTML={{ __html: currentTime }} />,
      document.getElementById('time-display')
    );
  }
}

Clock.propTypes = {
  settings: PropTypes.object.isRequired,
  isSecondsEnabled: PropTypes.bool.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings,
      isSecondsEnabled: state.settings.time_seconds_enabled
    };
  },
  null
)(Clock);
