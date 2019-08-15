import React from "react"
import PropTypes from "prop-types"
import "./range.scss"
const propTypes = {}

function Range({ min, max, value, onChange }) {
  return (
    <input type="range" min={min} max={max} value={value} onChange={onChange} />
  )
}

Range.propTypes = propTypes

export default Range
