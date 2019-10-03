import React from "react"
import "./tree-style.scss"
import "./popup.scss"
import Edge from "./Link"
import Node from "./Node"
import {FORCE} from "../lib/d3.helpers"
import { Graph } from "../lib/graph.ds"
import {isEqual} from "lodash"
import { Link } from "gatsby"

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
      traversedString:"",
      traversedNodes:[],
      graphType:"UNDIRECTED",
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
      FORCE.tick(this, this.graphImplementation, data.search, this.printNodes);
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

  printNodes = (node)=>{
    this.setState(state=>{
      return {
        ...state,
        traversedString: `${state.traversedString}, ` + node
      }
    })
  }
  render() {
    const {links, nodes } = this.state;
    const linksView = links.map( (link) => {
      return (
        <Edge
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
    const {source, target, search , traversedString , graphType} = this.state;
    return (
      <div>
        <div className="graph__page">
          <div className="graph__header">
            <div className="graph__header-left">
              <h3>DS & Algorithm Playground </h3>
              <ul>
                <li><Link  activeClassName="active-link"to={"/"}>Binary Search Tree <i className="icon ion-analytics"/></Link></li>
                <li><Link activeClassName="active-link" to={"/graph"}>Graph</Link></li>
              </ul>
            </div>
          </div>
          <div className="graph__body">
            <div className="graph__body-config">
              <h4 className="panel__header">
                Configuration <i className="icon ion-md-cog"/>
              </h4>
              <div className="config__container">
                <form className="add-panel" onSubmit={this.addNode}>
                  <p className="field">
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
                  <p className="field ">
                    <div className="select-fields">
                        <select  name="source" id="source" value={source} onChange={this.edgeSelected}>
                      <option value="Source Node">Source Node</option>
                          {
                            this.renderOptions(nodes)
                          }
                    </select>
                    <select name="target" disabled={source === "Source Node" || source === ""} id="target" value={target} onChange={this.edgeSelected}>
                      <option value="Target Node">Target Node</option>
                      {
                        this.renderOptions(nodes)
                      }
                    </select>
                    </div>


                    <button className="generate-button" disabled={source === "Source Node" || source === ""}>Add Edge</button>
                  </p>

                </form>
                <div className="search__buttons field">

                  <button className="generate-button" onClick={()=>this.setState(state=>({...state, search: 'BFS'}))}>BFS</button>
                  <button className="generate-button" onClick={()=>this.setState(state=>({...state, search: 'DFS'}))}>DFS</button>
                </div>

              </div>
            </div>
            <div className="graph__body-main">
              <h4 className="panel__header">
                Graph DS <i className="icon ion-md-funnel"/> {search === "BFS" ? "BREADTH FIRST SEARCH ": "DEPTH FIRST SEARCH "}
              </h4>
              <div
                ref={tc => (this.treeContainer = tc)}
                style={{ height: "500px" }}
              >
                {/*<div>{traversedString}</div>*/}
                <svg className="graph" width={FORCE.width} height={FORCE.height}>
                  {
                    graphType === "DIRECTED" && ( <defs>
                      <marker viewBox="0 -5 24 10" id="markerArrow" markerWidth="10" markerHeight="7" refX="20.4"  orient="auto" markerUnits="strokeWidth">
                        <path d="M0,-5L10,0L0,5" fill="black" />
                      </marker>
                    </defs>)
                  }

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
