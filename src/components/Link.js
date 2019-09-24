import React from "react";
import {FORCE} from "../lib/d3.helpers"
import * as d3 from "d3"
import ReactDOM from "react-dom"
export default class Link extends React.Component {

  componentDidMount() {
    this.d3Link = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(FORCE.enterLink);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data)
      .call(FORCE.updateLink);
  }

  render() {
    return (
      <line className='link' />
    );
  }
}

