import React from "react"
import "./tree-style.scss"
import "./popup.scss"
import Link from "./Link"
import Node from "./Node"
import {FORCE} from "../lib/d3.helpers"
import { Graph } from "../lib/graph.ds"
import {isEqual} from "lodash"

let Tree = " "
class GraphDS extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      source: '',
      target: '',
      addLinkArray: [],
      name: "",
      search:'BFS',
      nodes:
        [

        ],
      links:
        [

        ]
    }
    this.handleAddNode = this.handleAddNode.bind(this);
    this.addNode = this.addNode.bind(this)
    this.graphImplementation = new Graph()
  }

  componentDidMount() {
    const data = this.state;
    FORCE.initForce(data.nodes, data.links);
    FORCE.tick(this);
    FORCE.drag();

  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(prevState, this.state)) {
      const data = this.state;
      FORCE.initForce(data.nodes, data.links);
      FORCE.tick(this, this.graphImplementation, data.search);
      FORCE.drag();
    }
  }

  handleAddNode(e) {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  }

  addNode(e) {
    e.preventDefault();
    const newNode = { name:this.state.name, id:Math.floor(Math.random()*899), }
    this.graphImplementation.addVertice(newNode.name)
    this.setState(prevState => ({
      nodes: [...prevState.nodes,newNode ], name: ''
    }));

  }
  renderOptions = (options)=>{
    return options.map(option=><option key={option.name} value={option.name} >{option.name}</option>)
  };

  edgeSelected = (e)=>{
    e.persist();
    this.setState(state=>{
      return {
        ...state,
        [e.target.name]: e.target.value
      }
    })
  };

  onAddEdgeSubmitted = (e)=>{
    e.preventDefault();
    this.setState(state=>{
      this.graphImplementation.addEdge(state.source, state.target)
      return ({
      ...state,
      links: [
        ...state.links,
        {source: state.source, target: state.target}
      ],
      source:'',
      target:''

    })})
  };
  render() {
    const {links, nodes } = this.state;
    const linksView = links.map( (link) => {
      return (
        <Link
          key={`${link.source}-${link.target}`}
          data={link}
        />);
    });
    const nodesView = nodes.map( (node) => {
      return (
        <Node
          data={node}
          name={node.name}
          key={node.id}
        />);
    });
    const {source, target } = this.state;
    return (
      <div>
        <div className="graph__page">
          <div className="graph__header">
            <div className="graph__header-left">
              <h3>DS & Algorithm Playground </h3>
            </div>
          </div>
          <div className="graph__body">
            <div className="graph__body-config">
              <h4 className="panel__header">
                Configuration <i className="icon ion-md-cog"/>
              </h4>
              <div className="config__container">
                <form className="add-panel" onSubmit={this.addNode}>
                  <p>
                    Input
                    <input
                      className="tree-input"
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleAddNode}
                      placeholder="Add Node eg 10 "
                    />
                    <button className="generate-button" disabled={this.state.name === ""}>Add Node</button>
                  </p>
                </form>

                <form  className="add-panel" onSubmit={this.onAddEdgeSubmitted}>
                  <p>
                    Add Edge
                    <select  name="source" id="source" value={source} onChange={this.edgeSelected}>
                      <option value="Source Node">Source Node</option>
                      {
                        this.renderOptions(nodes)
                      }
                    </select>
                    <select name="target" disabled={source === "Source Node" || source === ""} id="target" value={target} onChange={this.edgeSelected}>
                      <option value="Source Node">Source Node</option>
                      {
                        this.renderOptions(nodes)
                      }
                    </select>

                    <button className="generate-button" disabled={source === "Source Node" || source === ""}>Add Edge</button>
                  </p>

                </form>
                <div className="search__buttons">
                  <button className="generate-button" onClick={()=>this.setState(state=>({...state, search: 'BFS'}))}>BFS</button>
                  <button className="generate-button" onClick={()=>this.setState(state=>({...state, search: 'DFS'}))}>DFS</button>
                </div>

              </div>
            </div>
            <div className="graph__body-main">
              <h4 className="panel__header">
                Graph DS <i className="icon ion-md-funnel"/>
              </h4>
              <div
                ref={tc => (this.treeContainer = tc)}
                style={{ height: "500px" }}
              >
                <svg className="graph" width={FORCE.width} height={FORCE.height}>
                  {/*<defs>*/}
                  {/*  <marker viewBox="0 -5 24 10" id="markerArrow" markerWidth="10" markerHeight="7" refX="20.4"  orient="auto" markerUnits="strokeWidth">*/}
                  {/*    <path d="M0,-5L10,0L0,5" fill="black" />*/}
                  {/*  </marker>*/}
                  {/*</defs>*/}
                  <g>
                    {linksView}
                  </g>
                  <g>
                    {nodesView}
                  </g>
                </svg>

              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default GraphDS
