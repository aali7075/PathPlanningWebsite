import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathPlannerViz.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

//Create an  struct object for the Node
const createNode = (col_, row_) => {
  // ES6 arrow style used to inherit from context of function
  return {
    col_,
    row_,
    is_start_: row_ == START_NODE_ROW && col_ == START_NODE_COL,
    is_end_: row_ == FINISH_NODE_ROW && col_ == FINISH_NODE_COL,
    is_wall_: false, // equivalent to createNode.is_wall= false
    is_visited_: false,
    previous_node: null,
    distance_: Infinity,
  };
};

const getInitialGrid = () => {
  const grid = []; // Initalize 2d array will be size 20,50
  for (let row = 0; row < 20; row++) {
    const currentRow = [];  //Intialize row
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

export default class PathfindingVisualizer extends Component {

  
}
