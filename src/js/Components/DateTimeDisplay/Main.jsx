// DateDisplay -> Required by Main
// --------------------------------------
// Displays date below the login window.

import React from 'react';
import ReactDOM from 'react-dom';
import Strftime from 'strftime';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

class DateDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
      formattedDate: ''
    };
  }

  componentWillMount() {
    // Wait two seconds, so that the clock can render first and they fade in sequentially rather than in parallel.
    setTimeout(() => {
      this.setDate();
    }, 2000);
  }

  setDate() {
    this.setState({
      initialized: true,
      formattedDate: this.formatDate()
    });

    setTimeout(() => {
      this.setDate();
    }, 1000);
  }

  formatDate() {
    let strftime;
    if (this.props.language === 'tr' || this.props.language.includes('tr')) {
      strftime = Strftime.localizeByIdentifier('tr_TR');
    } else {
      strftime = Strftime.localizeByIdentifier('en_US');
    }
    return strftime(this.props.settings.date_format);
  }

  render() {
    let dateClasses = ['date'];
    let dateString = this.state.formattedDate;

    if (this.state.initialized === true && this.props.settings.date_enabled === true) {
      dateClasses.push('loaded');
    } else if (this.state.date_enabled === false) {
      dateClasses.push('invisible');
    }

    return ReactDOM.createPortal(
      <div className={dateClasses.join(' ')} dangerouslySetInnerHTML={{ __html: dateString }} />,
      document.getElementById('date-display')
    );
  }
}

DateDisplay.propTypes = {
  settings: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired
};

export default connect(
  state => {
    return {
      settings: state.settings
    };
  },
  null
)(DateDisplay);
