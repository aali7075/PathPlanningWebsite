import React, { Component } from "react";

import "./node.css";

export default class Node extends Component {
  //export is an include for class Node

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
    if (is_start_) {
      special_node_class = "node-start";
    }
    if (is_end_) {
      special_node_class = "node-end";
    }
    if (is_wall_) {
      special_node_class = "node-wall";
    }

    return (
      <div
        id={`node-${row_}-${col_}`}
        className={`node ${special_node_class}`}
        onMouseDown={() => onMouseDown(row_, col_)}
        onMouseEnter={() => onMouseEnter(row_, col_)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
