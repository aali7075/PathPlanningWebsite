import React, { Component } from "react";

import "./node.css";

export default class Node extends Component {
  //export is an include for class Node
// Try putting this into the pathplanner instead. Components can't change thier own props!
  // onDragStart(ev, node_class) {
  //   console.log("dragstart:", node_class);
  //   ev.dataTransfer.setData("class", node_class);
  // }
  //
  // onDragOver(ev){
  //   console.log("Dragging over");
  //   ev.preventDefault();
  // }
  // onDrop(ev){
  //   let node_class = ev.dataTransfer.getData("class");
  //   console.log(node_class);
  //   //console.log("This.props is", this.props);
  //   switch(node_class){
  //     case "node-start":
  //     console.log("this.state is", this.state);
  //     //this.props.is_start_=true;
  //     break;
  //     case "node-end":
  //     break;
  //     //this.props.is_end_=true;
  //     default:
  //   }
  //   //this.props.
  // }

  render() {
    //allows us to share code between react Components
    var {
      //set constant because our properties will always be 8
      row_,
      col_,
      is_wall_,
      is_end_,
      is_start_,
      onMouseDown, // certain html on event handlers need a specific syntax
      onMouseUp,
      onMouseEnter,
      onDragStart,
      onDragOver,
      onDrop,
      is_drag_,
    } = this.props;
    let special_node_class;
    is_drag_ = "false";
    if (is_start_) {
      special_node_class = "node-start";
      is_drag_ = "true";
    }
    if (is_end_) {
      special_node_class = "node-end";
      is_drag_ = "true";
    }
    if (is_wall_) {
      //special_node_class = "node-wall";
    }

    return (
      <div
        draggable={is_drag_}
        id={`node-${row_}-${col_}`}
        className={`node ${special_node_class}`}
        onDragStart={(e) => onDragStart(e, is_end_, row_,col_)}
        onDragOver={(e) => onDragOver(e)} // Creates droppable container
        onDrop={(e) => onDrop(e,row_,col_)}
        onMouseDown={() => onMouseDown(row_, col_)}
        onMouseEnter={() => onMouseEnter(row_, col_)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
