import React from 'react'
import { PropTypes } from 'react'

const TimerDisplay = (props) => (
  <div className="timer-display-component" onClick={this.props.handleOnClick}>
    <div className="display-wrapper">
      <div className="display">{props.time}</div>
    </div>
  </div>
)

TimerDisplay.propTypes = {
  handleOnClick: PropTypes.func
  time: PropTypes.number.isRequired
}

export default TimerDisplay
