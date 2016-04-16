import React from 'react'
import { PropTypes } from 'react'
import moment from 'moment'
import classnames from 'classnames'


const TimerDisplay = (props) => {
  const displayClass = classnames(
     'display',
     { 'running': props.isRunning }
  )
  return (
    <div className="timer-display" onClick={props.handleOnClick}>
      <div className="display-wrapper">
        <div className={displayClass}>
          <div className="time-value">{props.endTime.format('hh:mm:ss')}</div>
        </div>
      </div>
    </div>
  )
}

TimerDisplay.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  endTime: PropTypes.object,
  isRunning: PropTypes.bool
}

TimerDisplay.defaultProps = {
  isRunning: false
}

export default TimerDisplay
