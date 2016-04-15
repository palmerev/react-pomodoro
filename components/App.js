import React from 'react'
import { PropTypes } from 'react'

import Counter from './Counter'
import TimerDisplay from './TimerDisplay'


const statuses = {
  INACTIVE: 'INACTIVE',
  BREAK_ACTIVE: 'BREAK_ACTIVE',
  WORK_ACTIVE: 'WORK_ACTIVE'
}

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <Counter textBefore="Work for" value={this.props.workLength} textAfter="minutes" />
        <Counter textBefore="Break for" value={this.props.breakLength} textAfter="minutes" />
        <TimerDisplay time={this.props.currentWorkTime} />
      </div>
    )
  }
}

App.propTypes = {
  workLength: PropTypes.number,
  breakLength: PropTypes.number,
  currentWorkTime: PropTypes.number,
  currentBreakTime: PropTypes.number
}

App.defaultProps = {
  workLength: 25,
  breakLength: 5,
  currentWorkTime: 0,
  currentBreakTime: 0
}
