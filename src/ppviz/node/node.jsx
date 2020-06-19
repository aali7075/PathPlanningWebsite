import React, { Component } from "react";

import "./node.css";

export default class Node extends Component {
  //export is an include for class Node

  onDragStart(ev, node_class) {
    console.log("dragstart:", node_class);
    ev.dataTransfer.setData("class", node_class);
  }

  render() {
    //allows us to share code between react Components
    const {
      //set constant because our properties will always be 8
      row_,
      col_,
      is_wall_,
      is_end_,
      is_start_,
      onMouseDown, // certain html on event handlers need a specific syntax
      onMouseUp,
      onMouseEnter,
    } = this.props;
    let special_node_class;
    let is_drag = "false";
    if (is_start_) {
      special_node_class = "node-start";
      is_drag = "true";
    }
    if (is_end_) {
      special_node_class = "node-end";
      is_drag = "true";
    }
    if (is_wall_) {
      special_node_class = "node-wall";
    }

    return (
      <div
        draggable={is_drag}
        id={`node-${row_}-${col_}`}
        className={`node ${special_node_class}`}
        onDragStart={(e) => this.onDragStart(e, special_node_class)}
        onMouseDown={() => onMouseDown(row_, col_)}
        onMouseEnter={() => onMouseEnter(row_, col_)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
