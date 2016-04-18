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
      endTime: 0
    }
    this.updateCounter = this.updateCounter.bind(this)
    this.getTime = this.getTime.bind(this)
    this.startTimer = this.startTimer.bind(this)
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
  getTime() {
    if (this.state.session === statuses.INACTIVE) {
      return this.state.workTime.selectedLength
    }
    else {
      return this.state.endTime
    }
  }
  startTimer() {
    let endMoment = moment().add(this.state.workTime.selectedLength, 'minutes');
    this.setState(
      { timerRunning: true,
        session: statuses.WORK,
        endTime: endMoment })
  }
  componentDidUpdate() {
    console.log(this.state.endTime)
    if (moment().isSameOrAfter(this.state.endTime)) {
      if (this.state.session === statuses.WORK) {
        this.setState({ timerRunning: false, session: statuses.BREAK })
      }
      else if (this.state.session === statuses.BREAK) {
        this.setState({ timerRunning: false, session: statuses.INACTIVE })
      }
    }
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
          session={this.state.session} />
      </div>
    )
  }
}
