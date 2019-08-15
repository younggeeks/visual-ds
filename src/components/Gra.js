import * as d3 from "d3"
import React, { Component } from "react"
import json from "./graphFile.json"
import { Graph } from "react-d3-graph"
import BST from "../bst"

class BarChart extends Component {
  state = {
    data: {
      nodes: [{ id: 0 }],
      links: [],
    },
  }
  async componentDidMount() {
    await this.makeData([45, 98, 5, 4, 2, 3])
  }

  makeData = (input = []) => {
    const { nodes, links } = this.state.data
    const bst = new BST(input[0])
    nodes.push({ id: input[0] })

    // console.log("teh ", input.slice(1))
    input.slice(1).map(item => {
      bst.insert(item, (data, parent) => {
        nodes.push({ id: item })
        links.push({ source: parent, target: data })
      })
    })
    this.setState(state => ({ ...state, data: { nodes, links } }))
  }

  render() {
    console.log("rh", this.state)
    // graph payload (with minimalist structure)
    const data = {
      nodes: [
        { id: "Harry" },
        { id: "Sally" },
        { id: "Sam" },
        { id: "Juma" },
        { id: "Alice" },
        { id: "Ima" },
        { id: "Alice" },
      ],
      links: [
        { source: "Harry", target: "Sally" },
        { source: "Harry", target: "Sam" },
        { source: "Harry", target: "Juma" },
        { source: "Harry", target: "Ima" },
        { source: "Harry", target: "Alice" },
      ],
    }

    // the graph configuration, you only need to pass down properties
    // that you want to override, otherwise default ones will be used
    const myConfig = {
      nodeHighlightBehavior: false,
      node: {
        color: "lightgreen",
        size: 800,
        highlightStrokeColor: "blue",
      },
      link: {
        highlightColor: "lightblue",
      },
    }

    // graph event callbacks
    const onClickGraph = function() {
      window.alert("Clicked the graph background")
    }

    const onClickNode = function(nodeId) {
      window.alert("Clicked node ${nodeId}")
    }

    const onDoubleClickNode = function(nodeId) {
      window.alert("Double clicked node ${nodeId}")
    }

    const onRightClickNode = function(event, nodeId) {
      window.alert("Right clicked node ${nodeId}")
    }

    // const onMouseOverNode = function(nodeId) {
    //   window.alert(`Mouse over node ${nodeId}`)
    // }

    // const onMouseOutNode = function(nodeId) {
    //   window.alert(`Mouse out node ${nodeId}`)
    // }

    const onClickLink = function(source, target) {
      window.alert(`Clicked link between ${source} and ${target}`)
    }

    const onRightClickLink = function(event, source, target) {
      window.alert("Right clicked link between ${source} and ${target}")
    }

    // const onMouseOverLink = function(source, target) {
    //   window.alert(`Mouse over in link between ${source} and ${target}`)
    // }

    // const onMouseOutLink = function(source, target) {
    //   window.alert(`Mouse out link between ${source} and ${target}`)
    // }

    return (
      <div>
        <form onSubmit={this.insert}>
          <input type="text" />
        </form>
        <Graph
          id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
          data={this.state.data}
          config={myConfig}
          // onClickGraph={onClickGraph}
          // onClickNode={onClickNode}
          // onDoubleClickNode={onDoubleClickNode}
          // onRightClickNode={onRightClickNode}
          // onClickLink={onClickLink}
          // onRightClickLink={onRightClickLink}
          // onMouseOverNode={onMouseOverNode}
          // onMouseOutNode={onMouseOutNode}
          // onMouseOverLink={onMouseOverLink}
          // onMouseOutLink={onMouseOutLink}
        />
      </div>
    )
  }
}

export default BarChart
