import React from 'react'
import { PropTypes } from 'react'
import moment from 'moment'
import classnames from 'classnames'


const TimerDisplay = (props) => {
  const displayClass = classnames(
     'display',
     { 'running': props.isRunning }
  )
  let runTimer = null;
  if (props.isRunning) {
    runTimer = setInterval(function (props) {
      console.log(props.endTime)
      props.endTime.subtract(1, 'second')
    }, 1000, props)
  }
  else if (runTimer) {
    clearInterval(runTimer)
  }
  return (
    <div>
    <div className="session-status">{this.props.session}</div>
    <div className="timer-display" onClick={props.handleOnClick}>
      <div className="display-wrapper">
        <div className={displayClass}>
          <div className="time-value">{props.getTime()}</div>
        </div>
      </div>
    </div>
    </div>
  )
}

TimerDisplay.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  endTime: PropTypes.any,
  getTime: PropTypes.func,
  isRunning: PropTypes.bool,
  session: PropTypes.string,
}

TimerDisplay.defaultProps = {
  isRunning: false
}

export default TimerDisplay
