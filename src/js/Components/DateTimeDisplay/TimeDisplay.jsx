// TimeDisplay -> Required by DateTimeDisplay/Main
// --------------------------------------
// Just a clock.

import React from 'react';
import ReactDOM from 'react-dom';
import Strftime from 'strftime';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class TimeDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      formattedTime: '',
      formattedSeconds: ''
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
    const timeFormatString = '%H:%M';
    const secondsFormatString = '%S';

    this.setState(
      {
        formattedTime: Strftime(timeFormatString),
        formattedSeconds: Strftime(secondsFormatString)
      },
      () => {
        setTimeout(() => {
          this.updateClock();
        }, 1000);
      }
    );
  }

  render() {
    let classes = ['clock'];
    let secondsClasses = ['seconds'];

    let currentTime = this.state.formattedTime;
    let currentSeconds = this.state.formattedSeconds;

    // Main time
    if (this.state.initialized === true && this.props.isTimeEnabled === true) {
      classes.push('loaded');
    } else if (this.props.isTimeEnabled === false) {
      classes.push('invisible');
    }

    // Seconds counter
    if (this.state.initialized === true && this.props.isSecondsEnabled) {
      secondsClasses.push('loaded');
    } else if (this.props.isSecondsEnabled === false) {
      secondsClasses.push('invisible');
    }

    return ReactDOM.createPortal(
      <div className={classes.join(' ')}>
        {currentTime}
        <span className={secondsClasses.join(' ')}>{currentSeconds}</span>
      </div>,
      document.getElementById('time-display')
    );
  }
}

TimeDisplay.propTypes = {
  settings: PropTypes.object.isRequired,
  isTimeEnabled: PropTypes.bool.isRequired,
  isSecondsEnabled: PropTypes.bool.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings,
      isTimeEnabled: state.settings.time_enabled,
      isSecondsEnabled: state.settings.time_seconds_enabled
    };
  },
  null
)(TimeDisplay);
