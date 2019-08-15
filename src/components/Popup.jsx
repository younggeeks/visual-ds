import React, { Component } from "react"
import PropTypes from "prop-types"
import "./popup.scss"
export default class Popup extends Component {
  state = {
    inOrder: [],
    preOrder: [],
    postOrder: [],
  }

  render() {
    const { inOrder, preOrder, postOrder, visibility, onClose } = this.props
    return (
      <div className={`popup__container `} onClick={onClose}>
        <div className="popup__section">
          <span>In-Order Traversal </span>
          <div>
            [{inOrder ? inOrder.map(item => <span>{item}, </span>) : ""}]
          </div>
        </div>
        <div className="popup__section">
          <span>Pre-Order Traversal </span>
          <div>
            [{preOrder ? preOrder.map(item => <span>{item}, </span>) : ""}]
          </div>
        </div>
        <div className="popup__section">
          <span>Post-Order Traversal </span>
          <div>
            [{postOrder ? postOrder.map(item => <span>{item}, </span>) : ""}]
          </div>
        </div>
      </div>
    )
  }
}
