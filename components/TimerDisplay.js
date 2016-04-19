import React from 'react'
import { PropTypes } from 'react'
import moment from 'moment'
import classnames from 'classnames'

class TimerDisplay extends React.Component {
  constructor() {
    super()
    this.formatDuration = this.formatDuration.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.timerId && nextProps.isRunning) {
      const countDown = function (props) {
        console.log('componentWillReceiveProps:endTime: ', props.endTime)
        let newEndTime = moment.duration(
          {
            milliseconds: props.endTime.milliseconds(),
            seconds: props.endTime.seconds(),
            minutes: props.endTime.minutes(),
          }
        )

        newEndTime.subtract(1, 'second')
        props.updateEndTime(newEndTime)
      }
      const t = setInterval(countDown, 1000, nextProps)
      nextProps.setTimerId(t)
    }
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
    const displayClass = classnames(
       'display',
       { 'running': this.props.isRunning }
    )
    let formattedTime = this.formatDuration(this.props.getTime())
    return (
      <div>
      <div className="session-status">{this.props.session}</div>
      <div className="timer-display" onClick={this.props.handleOnClick}>
        <div className="display-wrapper">
          <div className={displayClass}>
            <div className="time-value">{formattedTime}</div>
          </div>
        </div>
      </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const time = this.props.endTime
    console.log("componentDidUpdate", time)
      if (moment.isDuration(time) && time.asSeconds() === 0) {
        if (this.props.session === statuses.WORK) {
          this.props.updateSession(statuses.BREAK)
        }
        else if (this.props.session === statuses.BREAK) {
          this.props.updateSession(statuses.INACTIVE)
        }
      }
  }
}

TimerDisplay.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
  updateEndTime: PropTypes.func,
  getTime: PropTypes.func,
  isRunning: PropTypes.bool,
  session: PropTypes.string,
}

TimerDisplay.defaultProps = {
  isRunning: false
}

export default TimerDisplay
