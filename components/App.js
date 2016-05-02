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
      timeRemaining: null, // moment.duration
      timerId: null, // number / integer
    }
    this.updateCounter = this.updateCounter.bind(this)
    this.updateSession = this.updateSession.bind(this)
    this.updateTimeRemaining = this.updateTimeRemaining.bind(this)
    this.getTime = this.getTime.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
    this.setTimerId = this.setTimerId.bind(this)
    this.handleOnClick = this.handleOnClick.bind(this)
    this.getNextSession = this.getNextSession.bind(this)
    this.getNextTimeRemaining = this.getNextTimeRemaining.bind(this)
    this.tick = this.tick.bind(this)
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
  getNextTimeRemaining() {
    if (nextSession === statuses.WORK) {
      return moment.duration(
        this.state.workTime.selectedLength, 'minutes'
      )
    }
    else if (nextSession === statuses.BREAK) {
      return moment.duration(
        this.state.breakTime.selectedLength, 'minutes'
      )
    }
    else if (nextSession === statuses.INACTIVE) {
      return null;
    }
  }
  getNextSession() {
    switch (this.state.session) {
      case statuses.WORK:
        return statuses.BREAK
      case statuses.BREAK:
        return statuses.INACTIVE
      case statuses.INACTIVE:
        return statuses.WORK
      default:
        throw new Error(`unknown session status ${this.state.session}`)
    }
  }
  updateSession(status) {
    this.setState({ session: status })
  }
  updateTimeRemaining() {
    this.tick()
    if (this.state..timeRemaining.asSeconds() === 0) {
      const nextSession = this.getNextSession()
      const timeRemaining = this.getNextTimeRemaining(nextSession)

      this.updateSession(nextSession)
      this.setState({ session: nextSession, timeRemaining: timeRemaining })
    }
  }

  getTime() {
    if (this.state.session === statuses.INACTIVE) {
      return this.state.workTime.selectedLength
    }
    else {
      return this.state.timeRemaining
    }
  }
  setTimerId(timerId) {
    this.setState({ timerId: timerId })
  }
  startTimer() {
    let workDuration = moment.duration(
        this.state.workTime.selectedLength, 'minutes')

    if (this.state.timeRemaining === null) {
      // set the timeRemaining for the first time
      if (!this.state.timeRemaining) {
        const t = setInterval(this.updateTimeRemaining, 1000)
        this.setState(
          { session: statuses.WORK,
            timeRemaining: workDuration,
            timerId: t }
        )
      }
    }
    // resume from the previous timeRemaining
    else {
      const newTimeRemaining = moment.duration(
        {
          milliseconds: this.state.timeRemaining.milliseconds(),
          seconds: this.state.timeRemaining.seconds(),
          minutes: this.state.timeRemaining.minutes(),
        }
      )
      const newTime = workDuration.asSeconds() < newTimeRemaining.asSeconds() ?
          workDuration : newTimeRemaining
      const t = setInterval(this.updateTimeRemaining, 1000)
      this.setState(
        { timerId: t,
          session: statuses.WORK,
          timeRemaining: newTime }
      )
    }
  }
  tick() {
    let newTimeRemaining = moment.duration(
      {
        milliseconds: this.state.timeRemaining.milliseconds(),
        seconds: this.state.timeRemaining.seconds(),
        minutes: this.state.timeRemaining.minutes(),
      }
    )
    if (newTimeRemaining.asSeconds() > 0) {
      newTimeRemaining.subtract(1, 'second')
      this.setState({ timeRemaining: newTimeRemaining })
    }
  }
  stopTimer() {
    if (this.state.timerId) {
        clearInterval(this.state.timerId)
        this.setState({ timerId: null })
    }
  }
  handleOnClick(event) {
    if (!this.state.timerId) {
      this.startTimer()
    }
    else {
      this.stopTimer()
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
          timerRunning={Boolean(this.state.timerId)}
        />
        <Counter
          min={this.state.breakTime.minLength}
          max={this.state.breakTime.maxLength}
          increment={() => { this.updateCounter('breakTime', INCREMENT) }}
          decrement={() => { this.updateCounter('breakTime', DECREMENT) }}
          textBefore="Break for"
          value={this.state.breakTime.selectedLength}
          textAfter="minutes"
          timerRunning={Boolean(this.state.timerId)}
        />
        <TimerDisplay
          handleOnClick={this.handleOnClick}
          getTime={this.getTime}
          timeRemaining={this.state.timeRemaining}
          session={this.state.session}
          timerId={this.state.timerId}
          setTimerId={this.setTimerId}
          updateSession={this.updateSession}
        />
      </div>
    )
  }
}
