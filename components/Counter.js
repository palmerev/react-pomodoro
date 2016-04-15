import React from 'react'
import { PropTypes } from 'react'

class Counter extends React.Component {
  constructor() {
    super()
  }
  render() {
    return  (
      <div className="counter-component">
      <span className="text-before">{this.props.textBefore}</span>
      <div>
      <button className="minus" onClick={this.props.decrement}>-</button>
      <span className="counter-value">{this.props.value}</span>
      <button className="plus" onClick={this.props.increment}>+</button>
      </div>
      <span className="text-after">{this.props.textAfter}</span>
      </div>
    )
  }
}

Counter.propTypes = {
  decrement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired,
  textBefore: PropTypes.string,
  value: PropTypes.number.isRequired,
  textAfter: PropTypes.string
}

export default Counter
