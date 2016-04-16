import React from 'react'
import { PropTypes } from 'react'
import classnames from 'classnames'

const TimerDisplay = (props) => {
  const displayClass = classnames(
     'timer-display',
     { 'running': props.isRunning }
  )
  return (
    <div className={displayClass} onClick={props.handleOnClick}>
      <div className="display-wrapper">
        <div className="display">{props.time()}</div>
      </div>
    </div>
  )
}

TimerDisplay.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  time: PropTypes.func.isRequired,
  isRunning: PropTypes.bool
}

TimerDisplay.defaultProps = {
  isRunning: false
}

export default TimerDisplay
