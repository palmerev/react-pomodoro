import React from 'react'
import { PropTypes } from 'react'

const Counter = (props) => (
  <div className="counter-component">
    <span className="text-before">{props.textBefore}</span>
    <div>
      <button className="minus">-</button>
      <span className="counter-value">{props.value}</span>
      <button className="plus">+</button>
    </div>
    <span className="text-after">{props.textAfter}</span>
  </div>
)

Counter.propTypes = {
  textBefore: PropTypes.string,
  value: PropTypes.number.isRequired,
  textAfter: PropTypes.string
}

export default Counter
