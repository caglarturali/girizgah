// DateTimeDisplay -> Required by Main
// --------------------------------------
// Displays date below the login window.

import React from 'react';
import PropTypes from 'prop-types';

import TimeDisplay from './TimeDisplay';
import DateDisplay from './DateDisplay';

const DateTimeDisplay = ({ language }) => {
  return [
    <TimeDisplay key="time-display" language={language} />,
    <DateDisplay key="date-display" language={language} />
  ];
};

DateTimeDisplay.propTypes = {
  language: PropTypes.string.isRequired
};

export default DateTimeDisplay;
