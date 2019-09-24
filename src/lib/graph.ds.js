export var Graph = /** @class */ (function () {
  function Graph(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.list = new Map();
  }
  Graph.prototype.addVertice = function (value) {
    this.list.set(value, []);
  };
  Graph.prototype.addEdge = function (src, dest) {
    this.list.get(src).push(dest);
    this.list.get(dest).push(src);
  };
  Graph.prototype.bfs = function (node, callback) {
    var q = new Queue();
    var visited = new Set();
    q.enqueue(node);
    visited.add(node);
    while (!q.isEmpty()) {
      var element = q.dequeue();
      callback(element);
      var items = this.list.get(element);
      for (var i in items) {
        var neighbor = items[i];
        if (!visited.has(neighbor)) {
          q.enqueue(neighbor);
          visited.add(neighbor);
        }
      }
    }
  };
  Graph.prototype.dfs = function (node, callback) {
    var q = new Stack();
    var visited = new Set();
    q.push(node);
    visited.add(node);
    while (!q.isEmpty()) {
      var element = q.pop();
      callback(element);
      var items = this.list.get(element);
      for (var i in items) {
        var neighbor = items[i];
        if (!visited.has(neighbor)) {
          q.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
  };
  return Graph;
}());
var Queue = /** @class */ (function () {
  function Queue() {
    this.nodes = [];
  }
  Queue.prototype.enqueue = function (value) {
    this.nodes.push(value);
  };
  Queue.prototype.dequeue = function () {
    return this.nodes.shift();
  };
  Queue.prototype.isEmpty = function () {
    return this.nodes.length <= 0;
  };
  return Queue;
}());
var Stack = /** @class */ (function () {
  function Stack() {
    this.nodes = [];
  }
  Stack.prototype.pop = function () {
    return this.nodes.pop();
  };
  Stack.prototype.isEmpty = function () {
    return this.nodes.length <= 0;
  };
  Stack.prototype.peek = function () {
    return this.nodes[this.nodes.length];
  };
  Stack.prototype.push = function (value) {
    return this.nodes.push(value);
  };
  return Stack;
}());
