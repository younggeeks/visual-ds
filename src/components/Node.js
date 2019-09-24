import React from "react"
import { FORCE } from "../lib/d3.helpers"
import * as d3 from "d3"
import "./node.scss"
import ReactDOM from "react-dom"
export default class Node extends React.Component {

  componentDidMount() {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(FORCE.enterNode)
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(FORCE.updateNode)
  }

  render() {
    return (
      <g className='node'>
        <circle />
        <text>{this.props.data.name}</text>
      </g>
    );
  }
}
