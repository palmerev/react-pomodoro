import React from 'react'

import Counter from './Counter'
import TimerDisplay from './TimerDisplay'


const statuses = {
  INACTIVE: 'INACTIVE',
  BREAK: 'BREAK',
  WORK: 'WORK'
}

export default class App extends React.Component {
  constructor() {
    super()
    const workMin = 0,
          workMax = 120,
          breakMin = 0,
          breakMax = 120;
    this.state = {
      workTime: {
        selectedLength: 25,
        minLength: workMin,
        maxLength: workMax,
        currentTime: 0
      },
      breakTime: {
        selectedLength: 5,
        minLength: breakMin,
        maxLength: breakMax,
        currentTime: 0
      },
      statuses: statuses
    }
    this.increment = this.increment.bind(this)
    this.decrement = this.decrement.bind(this)
  }
  increment(counterId) {
    if (counterId === 'workTime') {
      const length = this.state.workTime.selectedLength
      const newLength = (
        length === this.state.workTime.maxLength ? length : length + 1)
      this.setState({
        workTime: {
          selectedLength: newLength,
          minLength: this.state.workTime.minLength,
          maxLength: this.state.workTime.maxLength,
          currentTime: this.state.workTime.currentTime
        }
      })
    }
    else if (counterId === 'breakTime') {
      const length = this.state.breakTime.selectedLength
      const newLength = (length === this.state.breakTime.maxLength ? length : length + 1)
      this.setState({
        breakTime: {
          selectedLength: newLength,
          minLength: this.state.breakTime.minLength,
          maxLength: this.state.breakTime.maxLength,
          currentTime: this.state.breakTime.currentTime
        }
      })
    }
  }

  decrement(counterId) {
    if (counterId === 'workTime') {
      const length = this.state.workTime.selectedLength
      const newLength = (
        length === this.state.workTime.minLength ? length : length - 1)
      this.setState({
        workTime: {
          selectedLength: newLength,
          minLength: this.state.workTime.minLength,
          maxLength: this.state.workTime.maxLength,
          currentTime: this.state.workTime.currentTime
        }
      })
    }
    else if (counterId === 'breakTime') {
      const length = this.state.breakTime.selectedLength
      const newLength = (
        length === this.state.breakTime.minLength ? length : length - 1)
      this.setState({
        breakTime: {
          selectedLength: newLength,
          minLength: this.state.breakTime.minLength,
          maxLength: this.state.breakTime.maxLength,
          currentTime: this.state.breakTime.currentTime
        }
      })
    }
  }
  render() {
    return (
      <div>
        <h1>Pomodoro Timer</h1>
        <Counter
          min={this.state.workTime.minLength}
          max={this.state.workTime.maxLength}
          increment={() => { this.increment('workTime') }}
          decrement={() => { this.decrement('workTime') }}
          textBefore="Work for"
          value={this.state.workTime.selectedLength}
          textAfter="minutes"
        />
        <Counter
          min={this.state.breakTime.minLength}
          max={this.state.breakTime.maxLength}
          increment={() => { this.increment('breakTime') }}
          decrement={() => { this.decrement('breakTime') }}
          textBefore="Break for"
          value={this.state.breakTime.selectedLength}
          textAfter="minutes"
        />
        <TimerDisplay time={this.state.workTime.currentTime} />
      </div>
    )
  }
}
