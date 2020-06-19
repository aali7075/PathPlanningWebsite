import React, { PureComponent } from "react";
import Node from "./node/node";
import Navbar from "react-bootstrap/Navbar";

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

const ToggledWall = (grid_, row_, col_) => {
  const new_grid = grid_.slice();
  const node = new_grid[row_][col_];
  if (!node.is_wall_ && !node.is_start_ && !node.is_end_) {
    const new_node = {
      ...node, // using spreads syntax to create a copy of object
      is_wall_: !node.is_wall_,
    };
    new_grid[row_][col_] = new_node;
  }
  return new_grid;
};

//Created as a pure compoenent for render optimization
export default class PathfindingVisualizer extends PureComponent {
  constructor() {
    super(); //nochild components so no need to pass properties
    this.state = {
      grid_: [],
      mouse_is_pressed_: false, // check whether mosue is held down
    };
  }

  /*

We only want to render part of the grid
this funciton always updates as soon as the state changes. (Built in function)
It did reduce the amount of renders but did not give us the fluid change that we needed.
To properly use shouldComponentUpdate we would need to change our props so that
not all the components were encapsulated inside the grid or find a differnt structure
to allow for partial renders inside of a state array.


  shouldComponentUpdate(nextProps, nextState) {
  return (this.state.grid_ != nextState.grid_) && (this.mouse_is_pressed_) ;
}

*/

  componentDidMount() {
    const grid_ = GetInitialGrid();
    this.setState({ grid_ }); ///following syntax of this.state
  }

  handleMouseDown(row_, col_) {
    const newGrid = ToggledWall(this.state.grid_, row_, col_);
    //const newComponent = newGrid[row_][col_];
    this.setState({ grid_: newGrid, mouse_is_pressed_: true });
  }

  handleMouseEnter(row_, col_) {
    if (!this.state.mouse_is_pressed_) return;
    const newGrid = ToggledWall(this.state.grid_, row_, col_);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouse_is_pressed_: false });
  }

  handleDragOver(ev) {
    ev.preventDefault();
  }

  render() {
    const { grid_ } = this.state;
    //grabbing attributes from this.state

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
                    onMouseDown={(row_, col_) =>
                      this.handleMouseDown(row_, col_)
                    }
                    onMouseEnter={(row_, col_) =>
                      this.handleMouseEnter(row_, col_)
                    }
                    onMouseUp={() => this.handleMouseUp()}
                    onDragOver={(e) => this.handleDragOver(e)}
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
