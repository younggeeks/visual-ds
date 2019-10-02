import React from "react"
import BST from "../bst"
import "./tree-style.scss"
import Range from "./Range"
import Popup from "./Popup"
import "./popup.scss"
import toaster from "toasted-notes"
import { Link } from "gatsby"
let Tree = " "
class BSTree extends React.Component {
  state = {
    treeLoaded: false,
    zoomLevel: 0.2,
    duration: 2049,
    popupVisible: false,
    inputText: "",
    canTraverse: false,
    inOrder: [],
    preOrder: [],
    postOrder: [],
    inputArray: [],
    treeData: [
      {
        name: "",
        children: [],
      },
    ],
  }
  toast = {}
  async componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect()
    let res = await import("react-d3-tree")
    Tree = res.Tree

    this.setState({
      treeLoaded: true,
      translate: {
        x: dimensions.width / 2,
        y: 30,
      },
    })
  }

  appendChild = (data, root) => {
    if (root.left) {
      const temp = { name: root.left.value, children: [] }
      data.children.push(temp)
      this.appendChild(temp, root.left)
    }
    if (root.right) {
      const temp = { name: root.right.value, children: [] }
      data.children.push(temp)
      this.appendChild(temp, root.right)
    }
    if (!root.left && !root.right) {
      return data
    }
  }

  traverse = () => {
    const { tree, inOrder, preOrder, postOrder } = this.state
    if (inOrder.length <= 0) {
      tree.inOrder(item =>
        this.setState(state => {
          state.inOrder.push(item)
          return {
            ...state,
            inOrder: state.inOrder,
            popupVisible: true,
          }
        })
      )
    }
    if (preOrder.length <= 0) {
      tree.preOrder(item =>
        this.setState(state => {
          state.preOrder.push(item)
          return {
            ...state,
            preOrder: state.preOrder,
          }
        })
      )
    }
    if (postOrder.length <= 0) {
      tree.postOrder(item =>
        this.setState(state => {
          state.postOrder.push(item)
          return {
            ...state,
            postOrder: state.postOrder,
          }
        })
      )
    }

    this.showToast()
  }

  makeData = (input = []) => {
    const bst = new BST(input[0])
    input.slice(1).forEach(item => bst.insert(item))

    const dataObj = {
      name: bst.value,
      children: [],
    }

    this.appendChild(dataObj, bst)
    this.setState(state => {
      return {
        ...state,
        treeData: [dataObj],
        tree: bst,
        canTraverse: true,
        popupVisible: false,
        inOrder: [],
        preOrder: [],
        postOrder: [],
      }
    })
  }

  dataChanged = e => {
    e.persist()
    e.target.value.split(",")
    this.setState(state => {
      return {
        ...state,
        inputText: e.target.value,
      }
    })
  }

  updateArray = e => {
    e.preventDefault()
    const { inputText } = this.state
    let array

    console.log("type of ", typeof inputText[0])
    if (typeof inputText[0] === "number") {
      array = this.state.inputText.split(",").map(item => parseInt(item))
    } else {
      array = this.state.inputText.split(",")
    }
    this.makeData(array)
  }
  zoomChange = e => {
    this.setState({
      zoomLevel: e.target.value,
    })
  }
  durationChange = e => {
    this.setState({
      duration: e.target.value,
    })
  }

  showToast = () => {
    const { popupVisible, inOrder, preOrder, postOrder } = this.state

    if (!popupVisible) {
      this.toast = toaster.createNotification(
        ({ onClose }) => (
          <Popup
            inOrder={inOrder}
            postOrder={postOrder}
            preOrder={preOrder}
            visibility={this.state.popupVisible}
            onClose={onClose}
          />
        ),
        {
          position: "bottom",
          duration: null,
          showing: false,
        }
      )
    }
  }

  render() {
    const { canTraverse, treeLoaded } = this.state
    return (
      <div>
        <div className="graph__page">
          <div className="graph__header">
            <div className="graph__header-left">
              <h3>DS & Algorithm Playground </h3>
              <ul>
                <li><Link activeClassName="active-link" to="/">Binary Search Tree</Link></li>
                <li><Link activeClassName="active-link"  to="/graph">Graph</Link></li>
              </ul>
            </div>
          </div>
          <div className="graph__body">
            <div className="graph__body-config">
              <h4 className="panel__header">
                Configuration <i className="icon ion-md-cog"></i>
              </h4>
              <div className="config__container">
                <form className="add-panel" onSubmit={this.updateArray}>
                  <p>
                    Input
                    <input
                      className="tree-input"
                      type="text"
                      onChange={this.dataChanged}
                      placeholder="Tree Nodes i.e 23,43,60,30"
                    />
                    <button className="generate-button">Generate</button>
                  </p>
                </form>
                <p>
                  Zoom Level
                  <Range
                    min={1}
                    max={5}
                    value={this.state.zoomLevel}
                    onChange={this.zoomChange}
                  />
                </p>

                <p>
                  Duration
                  <Range
                    min={0}
                    max={3000}
                    value={this.state.duration}
                    onChange={this.durationChange}
                  />
                </p>

                {canTraverse && (
                  <button
                    disabled={!canTraverse}
                    className="generate-button"
                    onClick={this.traverse}
                  >
                    Traverse{" "}
                  </button>
                )}
              </div>
            </div>
            <div className="graph__body-main">
              <h4 className="panel__header">
                Binary Search Tree <i className="icon ion-md-funnel"></i>
              </h4>
              <div
                ref={tc => (this.treeContainer = tc)}
                style={{ height: "500px" }}
              >
                {treeLoaded && (
                  <Tree
                    pathFunc="straight"
                    data={this.state.treeData}
                    orientation="vertical"
                    translate={this.state.translate}
                    transitionDuration={this.state.duration}
                    nodeSize={{ x: 120, y: 70 }}
                    zoomable={true}
                    zoom={this.state.zoomLevel}
                    scaleExtent={{
                      min: 1,
                      max: this.state.zoomLevel,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {/* <Popup
            visibility={this.state.popupVisible}
            inOrder={inOrder}
            postOrder={postOrder}
            preOrder={preOrder}
          /> */}
        </div>
        {/* <form className="add-panel" onSubmit={this.updateArray}>
          <input
            type="text"
            onChange={this.dataChanged}
            placehoder="enter values"
            style={{ textAlign: "center" }}
          />
          <button type="submit">Create New Tree</button>
        </form>
        <button onClick={this.traverse}>Traverse</button>
        <p>
          IN0RDER - [{inOrder ? inOrder.map(item => <span>{item}, </span>) : ""}
          ]
        </p>
        <p>
          PREORDER - [
          {preOrder ? preOrder.map(item => <span>{item}, </span>) : ""}]
        </p>
        <p>
          POSTORDER - [
          {postOrder ? postOrder.map(item => <span>{item}, </span>) : ""}]
        </p>
        <Tree
          pathFunc="straight"
          data={this.state.treeData}
          orientation="vertical"
          translate={this.state.translate}
          transitionDuration={2049}
          nodeSize={{ x: 120, y: 70 }}
        /> */}
      </div>
    )
  }
}

export default BSTree
