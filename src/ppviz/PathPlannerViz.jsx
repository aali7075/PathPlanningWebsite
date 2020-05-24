import React, { Component } from "react";
import Node from "./node/node";

import "./PathPlannerViz.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

//Create an  struct object for the Node
const CreateNode = (col_, row_) => {
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

const GetInitialGrid = () => {
  const grid = []; // Initalize 2d array will be size 20,50
  for (let row = 0; row < 20; row++) {
    const currentRow = []; //Intialize row
    for (let col = 0; col < 50; col++) {
      currentRow.push(CreateNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

export default class PathfindingVisualizer extends Component {
  constructor() {
    super(); //nochild components so no need to pass properties
    this.state = {
      grid_: [],
    };
  }

  componentDidMount() {
    const grid_ = GetInitialGrid();
    this.setState({ grid_ }); ///following syntax of this.state
  }

  render() {
    const { grid_ } = this.state;
    //grabbing attributes from this.state

    console.log({ grid_ });
    return (
      <div className="grid">
        {grid_.map((row_, row_idx) => {
          //gridmap grab each row and the row index of each row
          return (
            <div key={row_idx}>
              {row_.map((node, node_idx) => {
                const { row_, col_, is_end_, is_start_, is_wall_ } = node;
                return (
                  <Node
                    key={node_idx}
                    row_={row_}
                    col_={col_}
                    is_start_={is_start_}
                    is_end_={is_end_}
                    is_wall_={is_wall_}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
