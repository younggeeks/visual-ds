export default function BST(value) {
  var _this = this
  this.insert = function(data, callback = console.log) {
    var node = new BST(data)
    var parent = new BST(_this.value)
    if (data > _this.value) {
      if (_this.right) {
        _this.right.insert(data, callback)
      } else {
        _this.right = node
        _this.right.parent = parent
        callback(data, _this.value)
      }
    } else {
      if (_this.left) {
        _this.left.insert(data, callback)
      } else {
        _this.left = node
        _this.left.parent = parent
        callback(data, _this.value)
      }
    }
  }
  this.inOrder = function(callback) {
    if (_this.left) {
      _this.left.inOrder(callback)
    }
    callback(_this.value)
    if (_this.right) {
      _this.right.inOrder(callback)
    }
  }

  this.preOrder = function(callback) {
    callback(_this.value)

    if (_this.left) {
      _this.left.preOrder(callback)
    }

    if (_this.right) {
      _this.right.preOrder(callback)
    }
  }

  this.postOrder = function(callback) {
    if (_this.right) {
      _this.right.postOrder(callback)
    }
    if (_this.left) {
      _this.left.postOrder(callback)
    }
    callback(_this.value)
  }

  this.value = value
  this.parent = null
  this.right = null
  this.left = null
}
