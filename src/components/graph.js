import React, { Component } from "react"
import * as d3 from "d3"
import { queue } from "d3-queue"
import { json } from "d3-request"
import _ from "lodash"
class Graph extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  renderD3 = props => {
    console.log("the props are ", props)
    var margin = { top: 10, right: 30, bottom: 30, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom
    const node = this.node
    const svg = d3
      .select(node)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    queue()
      .defer(
        json,
        "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json"
      )
      .await(function(error, data) {
        console.log("the data ", error, data)
        // Initialize the links
        var link = svg
          .selectAll("line")
          .data(data.links)
          .enter()
          .append("line")
          .style("stroke", "#aaa")
        // Initialize the nodes
        var node = svg
          .selectAll("circle")
          .data(data.nodes)
          .enter()
          .append("circle")
          .attr("r", 20)
          .style(
            "fill",
            "#" + Math.floor(Math.random() * 16777215).toString(16)
          )
        var text = svg
          .selectAll("text")
          .data(data.nodes)
          .enter()
          .append("text")
          .style("fill", "red")
          .text("samaki")
        // Let's list the force we wanna apply on the network
        var simulation = d3
          .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
          .force(
            "link",
            d3
              .forceLink() // This force provides links between nodes
              .id(function(d) {
                return d.id
              }) // This provide  the id of a node
              .links(data.links) // and this the list of links
          )
          .force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
          .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
          .on("end", ticked)
        // This function is run at each iteration of the force algorithm, updating the nodes position.
        function ticked() {
          link
            .attr("x1", function(d) {
              return d.source.x
            })
            .attr("y1", function(d) {
              return d.source.y
            })
            .attr("x2", function(d) {
              return d.target.x
            })
            .attr("y2", function(d) {
              return d.target.y
            })
          node
            .attr("cx", function(d) {
              return d.x + 6
            })
            .attr("cy", function(d) {
              return d.y - 6
            })
        }
      })
  }
  componentDidUpdate(prevProps, prevState) {
    // if (!_.isEqual(prevProps, this.props)) {
    this.renderD3(this.props)
    // }
  }

  /**
  * Warning: This lifecycle is currently deprecated, and will be removed in React version 17+
  More details here: https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
  */
  componentWillReceiveProps(nextProps) {
    console.log("the will")
    this.renderD3(nextProps)
  }
  componentDidMount() {
    this.renderD3(this.props)
  }
  render() {
    return <svg width="400" height="400" ref={node => (this.node = node)}></svg>
  }
}

export default Graph

// console.log("the props are ", props)
// var margin = { top: 10, right: 30, bottom: 30, left: 40 },
//   width = 400 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom
// const node = this.node
// const svg = d3
//   .select(node)
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// queue()
//   .defer(
//     json,
//     "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json"
//   )
//   .await(function(error, data) {
//     console.log("the data ", error, data)
//     // Initialize the links
//     var link = svg
//       .selectAll("line")
//       .data(data.links)
//       .enter()
//       .append("line")
//       .style("stroke", "#aaa")
//     // Initialize the nodes
//     var node = svg
//       .selectAll("circle")
//       .data(data.nodes)
//       .enter()
//       .append("circle")
//       .attr("r", 20)
//       .style("fill", "#69b3a2")
//     var text = svg
//       .selectAll("text")
//       .data(data.nodes)
//       .enter()
//       .append("text")
//       .style("fill", "red")
//       .text("samaki")
//     // Let's list the force we wanna apply on the network
//     var simulation = d3
//       .forceSimulation(data.nodes) // Force algorithm is applied to data.nodes
//       .force(
//         "link",
//         d3
//           .forceLink() // This force provides links between nodes
//           .id(function(d) {
//             return d.id
//           }) // This provide  the id of a node
//           .links(data.links) // and this the list of links
//       )
//       .force("charge", d3.forceManyBody().strength(-400)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
//       .force("center", d3.forceCenter(width / 2, height / 2)) // This force attracts nodes to the center of the svg area
//       .on("end", ticked)
//     // This function is run at each iteration of the force algorithm, updating the nodes position.
//     function ticked() {
//       link
//         .attr("x1", function(d) {
//           return d.source.x
//         })
//         .attr("y1", function(d) {
//           return d.source.y
//         })
//         .attr("x2", function(d) {
//           return d.target.x
//         })
//         .attr("y2", function(d) {
//           return d.target.y
//         })
//       node
//         .attr("cx", function(d) {
//           return d.x + 6
//         })
//         .attr("cy", function(d) {
//           return d.y - 6
//         })
//     }
//   })
