import React, { Component } from "react";

import "./node.css";

export default class Node extends Component {
  //export is an include for class Node

  render() {
    //allows us to share code between react Components
    var {
      //set constant because our properties will always be 8
      row,
      col,
      isWall,
      isEnd,
      isStart,
      onMouseDown, // certain html on event handlers need a specific syntax
      onMouseUp,
      onMouseEnter,
      onDragStart,
      onDragOver,
      onDrop,
      isDrag,
    } = this.props;
    let special_node_class;
    isDrag = "false";
    if (isStart) {
      special_node_class = "node-start";
      isDrag = "true";
    }
    if (isEnd) {
      special_node_class = "node-end";
      isDrag = "true";
    }
    if (isWall) {
      special_node_class = "node-wall";
    }

    return (
      <div
        draggable={isDrag}
        id={`node-${row}-${col}`}
        className={`node ${special_node_class}`}
        onDragStart={(e) => onDragStart(e, isEnd, row,col)}
        onDragOver={(e) => onDragOver(e)} // Creates droppable container
        onDrop={(e) => onDrop(e,row,col)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
