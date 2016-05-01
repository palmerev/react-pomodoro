import React from 'react'
import moment from 'moment'

import Counter from './Counter'
import TimerDisplay from './TimerDisplay'
import { INCREMENT, DECREMENT, statuses } from '../constants'

export default class App extends React.Component {
  constructor() {
    super()
    const workMin = 1,
          workMax = 120,
          breakMin = 1,
          breakMax = 120;
    this.state = {
      workTime: {
        selectedLength: 25,
        minLength: workMin,
        maxLength: workMax,
      },
      breakTime: {
        selectedLength: 5,
        minLength: breakMin,
        maxLength: breakMax,
      },
      // user is either working, on a break, or inactive
      session: statuses.INACTIVE,
      timerRunning: false,
      endTime: moment(),
      timerId: null,
    }
    this.updateCounter = this.updateCounter.bind(this)
    this.updateSession = this.updateSession.bind(this)
    this.updateEndTime = this.updateEndTime.bind(this)
    this.getTime = this.getTime.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.setTimerId = this.setTimerId.bind(this)
  }

  updateCounter(counterId, action) {
    const counter = this.state[counterId],
          len = counter.selectedLength
    let newLength
    switch (action) {
      case INCREMENT:
        newLength = (len < counter.maxLength ? len + 1 : len)
        break
      case DECREMENT:
        newLength = (len > counter.minLength ? len - 1 : len)
        break
      default:
        throw new Error('unknown action')
    }
    switch (counterId) {
      case 'breakTime':
        this.setState({
          breakTime: {
            selectedLength: newLength,
            minLength: this.state.breakTime.minLength,
            maxLength: this.state.breakTime.maxLength,
          }
        })
        break
      case 'workTime':
        this.setState({
          workTime: {
            selectedLength: newLength,
            minLength: this.state.workTime.minLength,
            maxLength: this.state.workTime.maxLength,
          }
        })
        break
      default:
        throw new Error('unknown counterId')
    }
  }

  updateEndTime() {
    let newEndTime = moment.duration(
      {
        milliseconds: this.state.endTime.milliseconds(),
        seconds: this.state.endTime.seconds(),
        minutes: this.state.endTime.minutes(),
      }
    )
    newEndTime.subtract(1, 'second')
    this.setState({ endTime: newEndTime })
  }

  getTime() {
    if (this.state.session === statuses.INACTIVE) {
      return this.state.workTime.selectedLength
    }
    else {
      return this.state.endTime
    }
  }
  setTimerId(timerId) {
    this.setState({ timerId: timerId })
  }
  startTimer(event) {
    // debugger
    if (!this.state.timerRunning) {
      let endMoment = moment.duration(
        this.state.workTime.selectedLength, 'minutes');
      this.setState(
        { timerRunning: true,
          session: statuses.WORK,
          endTime: endMoment })
    }
  }
  updateSession(status) {
    this.setState({ timerRunning: false, session: status })
  }
  render() {
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <Counter
          min={this.state.workTime.minLength}
          max={this.state.workTime.maxLength}
          increment={() => { this.updateCounter('workTime', INCREMENT) }}
          decrement={() => { this.updateCounter('workTime', DECREMENT) }}
          textBefore="Work for"
          value={this.state.workTime.selectedLength}
          textAfter="minutes"
        />
        <Counter
          min={this.state.breakTime.minLength}
          max={this.state.breakTime.maxLength}
          increment={() => { this.updateCounter('breakTime', INCREMENT) }}
          decrement={() => { this.updateCounter('breakTime', DECREMENT) }}
          textBefore="Break for"
          value={this.state.breakTime.selectedLength}
          textAfter="minutes"
        />
        <TimerDisplay
          handleOnClick={this.startTimer}
          isRunning={this.state.timerRunning}
          getTime={this.getTime}
          endTime={this.state.endTime}
          session={this.state.session}
          timerId={this.state.timerId}
          updateEndTime={this.updateEndTime}
          setTimerId={this.setTimerId}
          updateSession={this.updateSession}
        />
      </div>
    )
  }
}
