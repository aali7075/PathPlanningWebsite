import React, { Component } from "react";

import "./Node.css";

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
    let special_node_class = is_start_
      ? "node-start"
      : is_end_
      ? "node-end"
      : ""; //default case

    return (
      <div id={`node-${row}-${col}`} className={`node ${special_node_class}`}></div>
    );
  }
}
