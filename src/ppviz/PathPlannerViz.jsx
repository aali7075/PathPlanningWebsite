import React, { PureComponent } from "react";
import Node from "./node/node";
import SidebarExampleVisible from "./Navbar";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
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
    is_drag_:
      row_ == (START_NODE_ROW && col_ == START_NODE_COL) ||
      (FINISH_NODE_ROW && col_ == FINISH_NODE_COL),
  };
};

const GetInitialGrid = () => {
  const grid = []; // Initalize 2d ar<PathfindingVisualizer />ray will be size 20,50
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

const RemoveWall = (grid_, row_, col_) => {
  const new_grid = grid_.slice();
  const node = new_grid[row_][col_];
  if (node.is_wall_) {
    const new_node = {
      ...node, // using spreads syntax to create a copy of object
      is_wall_: !node.is_wall_,
    };
    new_grid[row_][col_] = new_node;
  }
  return new_grid;
};

const ToggleStartEnd = (grid_, origin_row, origin_col, row_, col_, is_end_) => {
  const new_grid = grid_.slice();
  const old_dest_node = new_grid[row_][col_];
  const old_origin_node = new_grid[origin_row][origin_col];
  const is_end = is_end_ == "true";
  console.log("ToggleStartEnd ", is_end);
  if (
    !old_dest_node.is_start_ &&
    !old_dest_node.is_end_ &&
    !old_dest_node.is_wall_
  ) {
    const dest_node = {
      ...old_dest_node,
      is_start_: !is_end,
      is_end_: is_end,
    };
    new_grid[row_][col_] = dest_node;
    const origin_node = {
      ...old_origin_node,
      is_start_: false,
      is_wall_: false,
      is_end_: false,
    };
    new_grid[origin_row][origin_col] = origin_node;
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
    if (this.props.wallToggle) {
      console.log("working???????");
      const newGrid = ToggledWall(this.state.grid_, row_, col_);
      //const newComponent = newGrid[row_][col_];
      this.setState({ grid_: newGrid, mouse_is_pressed_: true });
    }
    if (this.props.removeWallState) {
      const newGrid = RemoveWall(this.state.grid_, row_, col_);
      //const newComponent = newGrid[row_][col_];
      this.setState({ grid_: newGrid, mouse_is_pressed_: true });
    }
  }

  handleMouseEnter(row_, col_) {
    if (!this.state.mouse_is_pressed_) return;
    let newGrid;
    if (this.props.wallToggle) {
      newGrid = ToggledWall(this.state.grid_, row_, col_);
    }
    if (this.props.removeWallState) {
      newGrid = RemoveWall(this.state.grid_, row_, col_);
    }
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouse_is_pressed_: false });
  }
  handleDragStart(ev, is_end_, row_, col_) {
    console.log("is_end_: ", is_end_, row_, col_);
    ev.dataTransfer.setData("is_end_", is_end_);
    ev.dataTransfer.setData("row_", row_);
    ev.dataTransfer.setData("col_", col_);
  }
  handleDragOver(ev) {
    ev.preventDefault();
  }
  handleDrop(ev, row_, col_) {
    let is_end_ = ev.dataTransfer.getData("is_end_");
    let origin_row = ev.dataTransfer.getData("row_");
    let origin_col = ev.dataTransfer.getData("col_");
    console.log(is_end_, row_, col_);
    console.log("origin position ", origin_row, origin_col);
    const newGrid = ToggleStartEnd(
      this.state.grid_,
      origin_row,
      origin_col,
      row_,
      col_,
      is_end_
    );
    this.setState({ grid: newGrid });
  }
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid_ } = this.state;
    const startNode = grid_[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid_[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid_, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  render() {
    const { grid_ } = this.state;
    //grabbing attributes from this.state
    var { wallToggle, removeWallState, isStartViz } = this.props;
    if (isStartViz) {
      this.visualizeDijkstra();
    }
    return (
      <div className="grid">
        {grid_.map((row_, row_idx) => {
          //gridmap grab each row and the row index of each row
          return (
            <div key={row_idx}>
              {row_.map((node, node_idx) => {
                const {
                  row_,
                  col_,
                  is_end_,
                  is_start_,
                  is_wall_,
                  is_drag_,
                } = node;
                return (
                  <Node
                    draggable={is_drag_}
                    key={node_idx}
                    row_={row_}
                    col_={col_}
                    is_start_={is_start_}
                    is_end_={is_end_}
                    is_wall_={is_wall_}
                    onDragStart={(e, is_end_, row_, col_) =>
                      this.handleDragStart(e, is_end_, row_, col_)
                    }
                    onDragOver={(e) => this.handleDragOver(e)}
                    onDrop={(e, row_, col_) => this.handleDrop(e, row_, col_)}
                    onMouseDown={(row_, col_) =>
                      this.handleMouseDown(row_, col_)
                    }
                    onMouseEnter={(row_, col_) =>
                      this.handleMouseEnter(row_, col_)
                    }
                    onMouseUp={() => this.handleMouseUp()}
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
