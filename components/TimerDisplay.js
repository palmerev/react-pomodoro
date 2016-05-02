import React from 'react'
import { PropTypes } from 'react'
import moment from 'moment'
import classnames from 'classnames'

class TimerDisplay extends React.Component {
  constructor() {
    super()
    this.formatDuration = this.formatDuration.bind(this)
  }

  formatDuration(time) {
    // debugger
    let seconds
    if (typeof time === 'object') { // moment.duration object
      // if there are minutes, format seconds with leading zero, if necessary
      if (time.minutes() > 0) {
        if (time.seconds() < 10) {
          seconds = "0" + time.seconds()
        }
        else {
          seconds = time.seconds()
        }
        return [time.minutes(), seconds].join(":")
      }
      // no minutes
      else {
        return time.seconds()
      }
    }
    else if (typeof time === 'number') {
      return time
    }
    else {
      throw new Error(
        `getTime() returned ${typeof time}, expected object or number.`)
      }
  }

  render() {
    const displayClasses = classnames(
       'display',
       { 'running': this.props.timerId }
    )
    let formattedTime = this.formatDuration(this.props.getTime())
    return (
      <div>
      <div className="session-status">{this.props.session}</div>
      <div className="timer-display" onClick={this.props.handleOnClick}>
        <div className="display-wrapper">
          <div className={displayClasses}>
            <div className="time-value">{formattedTime}</div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

TimerDisplay.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  getTime: PropTypes.func,
  timerId: PropTypes.number,
  session: PropTypes.string,
}

export default TimerDisplay
