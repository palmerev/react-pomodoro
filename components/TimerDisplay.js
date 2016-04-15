import React from 'react'
import { PropTypes } from 'react'

const TimerDisplay = (props) => (
  <div className="timer-display-component">
    <div className="display-wrapper">
      <div className="display">{props.time}</div>
    </div>
  </div>
)

TimerDisplay.propTypes = {
  time: PropTypes.number.isRequired
}

export default TimerDisplay
