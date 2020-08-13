import React, { PureComponent } from "react";
import Node from "./node/node";
import SidebarExampleVisible from "./Navbar";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import "./PathPlannerViz.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BrushIcon from "@material-ui/icons/Brush";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import RedoIcon from "@material-ui/icons/Redo";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

var START_NODE_ROW = 10;
var START_NODE_COL = 15;
var FINISH_NODE_ROW = 10;
var FINISH_NODE_COL = 35;

//Create an  struct object for the Node
const CreateNode = (col, row) => {
  // ES6 arrow style used to inherit from context of function
  return {
    col,
    row,
    isStart: row == START_NODE_ROW && col == START_NODE_COL,
    isEnd: row == FINISH_NODE_ROW && col == FINISH_NODE_COL,
    isWall: false, // equivalent to createNode.is_wall= false
    isVisited: false,
    previousNode: null,
    distance: Infinity,
    isDrag:
      row == (START_NODE_ROW && col == START_NODE_COL) ||
      (FINISH_NODE_ROW && col == FINISH_NODE_COL),
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

const ToggledWall = (grid, row, col) => {
  const new_grid = grid.slice();
  const node = new_grid[row][col];
  if (!node.isWall && !node.isStart && !node.isEnd) {
    const newNode = {
      ...node, // using spreads syntax to create a copy of object
      isWall: !node.isWall,
    };
    new_grid[row][col] = newNode;
  }
  return new_grid;
};



const RemoveWall = (grid, row, col) => {
  const new_grid = grid.slice();
  const node = new_grid[row][col];
  if (node.isWall) {
    const newNode = {
      ...node, // using spreads syntax to create a copy of object
      isWall: !node.isWall,
    };
    new_grid[row][col] = newNode;
  }
  return new_grid;
};

const ToggleStartEnd = (grid, origin_row, origin_col, row, col, isEnd) => {
  const new_grid = grid.slice();
  const old_dest_node = new_grid[row][col];
  const old_origin_node = new_grid[origin_row][origin_col];
  const is_end = isEnd == "true";
  console.log("ToggleStartEnd ", is_end);
  if (!old_dest_node.isStart && !old_dest_node.isEnd && !old_dest_node.isWall) {
    const dest_node = {
      ...old_dest_node,
      isStart: !is_end,
      isEnd: is_end,
    };
    new_grid[row][col] = dest_node;
    if (is_end) {
      FINISH_NODE_ROW = row;
      FINISH_NODE_COL = col;
    } else {
      START_NODE_ROW = row;
      START_NODE_COL = col;
    }
    const origin_node = {
      ...old_origin_node,
      isStart: false,
      isWall: false,
      isEnd: false,
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
      grid: [],
      mouse_is_pressed_: false, // check whether mosue is held down
      isStart: true,
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
  return (this.state.grid != nextState.grid) && (this.mouse_is_pressed_) ;
}

*/

  componentDidMount() {
    const grid = GetInitialGrid();
    this.setState({ grid }); ///following syntax of this.state
  }

  handleMouseDown(row, col) {
    if (this.props.wallToggle) {
      console.log("working???????");
      const newGrid = ToggledWall(this.state.grid, row, col);
      //const newComponent = newGrid[row][col];
      this.setState({ grid: newGrid, mouse_is_pressed_: true });
    }
    if (this.props.removeWallState) {
      const newGrid = RemoveWall(this.state.grid, row, col);
      //const newComponent = newGrid[row][col];
      this.setState({ grid: newGrid, mouse_is_pressed_: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouse_is_pressed_) return;
    let newGrid;
    if (this.props.wallToggle) {
      newGrid = ToggledWall(this.state.grid, row, col);
    }
    if (this.props.removeWallState) {
      newGrid = RemoveWall(this.state.grid, row, col);
    }
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouse_is_pressed_: false });
  }
  handleDragStart(ev, isEnd, row, col) {
    console.log("isEnd: ", isEnd, row, col);
    ev.dataTransfer.setData("isEnd", isEnd);
    ev.dataTransfer.setData("row", row);
    ev.dataTransfer.setData("col", col);
  }
  handleDragOver(ev) {
    ev.preventDefault();
  }
  handleDrop(ev, row, col) {
    let isEnd = ev.dataTransfer.getData("isEnd");
    let origin_row = ev.dataTransfer.getData("row");
    let origin_col = ev.dataTransfer.getData("col");
    console.log(isEnd, row, col);
    console.log("origin position ", origin_row, origin_col);
    const newGrid = ToggleStartEnd(
      this.state.grid,
      origin_row,
      origin_col,
      row,
      col,
      isEnd
    );
    this.setState({ grid: newGrid });
  }
  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    console.log("visitedNodesInOrder ", visitedNodesInOrder);
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        // console.log(
        //   "document ",
        //   document.getElementById(`node-${node.row}-${node.col}`)
        // );
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
    const { grid } = this.state;
    console.log(START_NODE_ROW, START_NODE_COL);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetGrid() {
    for (let row = 0; row < 20; row++) {
      for (let col = 0; col < 50; col++) {
        document.getElementById(`node-${row}-${col}`).className =
          "node node";
      }
    }
    START_NODE_ROW = 10;
    START_NODE_COL = 15;
    FINISH_NODE_ROW = 10;
    FINISH_NODE_COL = 35;
    document.getElementById(`node-${10}-${15}`).className =
      "node node-start";
    document.getElementById(`node-${10}-${35}`).className =
      "node node-end";
    console.log("Inside the resetGrid");
    let initialGrid = GetInitialGrid();
    this.setState({ grid: initialGrid });
  }

  render() {
    const { grid } = this.state;
    //grabbing attributes from this.state
    var { wallToggle, removeWallState, isStartViz, isReset } = this.props;
    if (isStartViz && this.state.isStart) {
      console.log("Inisde isStartViz");
      this.visualizeDijkstra();
    }
    // if (isReset) {
    //   this.resetGrid();
    // }
    return (
      <div className="grid">
        {grid.map((row, rowidx) => {
          //gridmap grab each row and the row index of each row
          return (
            <div key={rowidx}>
              {row.map((node, node_idx) => {
                const { row, col, isEnd, isStart, isWall, isDrag } = node;
                return (
                  <Node
                    draggable={isDrag}
                    key={node_idx}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isEnd={isEnd}
                    isWall={isWall}
                    onDragStart={(e, isEnd, row, col) =>
                      this.handleDragStart(e, isEnd, row, col)
                    }
                    onDragOver={(e) => this.handleDragOver(e)}
                    onDrop={(e, row, col) => this.handleDrop(e, row, col)}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
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
