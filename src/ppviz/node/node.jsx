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
      on_mouse_down_,
      on_mouse_up_,
      on_mouse_enter_,
    } = this.props;
    let special_node_class;
    if (is_start_) {
      special_node_class = "node-start";
    }
    if (is_end_) {
      special_node_class = "node-end";
    }

    return (
      <div
        id={`node-${row_}-${col_}`}
        className={`node ${special_node_class}`}
      ></div>
    );
  }
}
