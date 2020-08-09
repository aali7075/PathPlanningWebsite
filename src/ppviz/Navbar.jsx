import React, { Component } from "react";
import "./Navbar.css";
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
import PathfindingVisualizer from "./PathPlannerViz";

export default class HotBar extends Component {
  constructor() {
    super();
    this.state = {
      wallMode: "Wall Off",
      fontColorAddWall: "#FFFFFF",
      fontColorRemoveWall: "#FFFFFF",
      removeWallState: false,
      isStartViz :false
    };
  }
  handleOnClickWall() {
    let wall = this.state.wallMode === "Wall Off" ? "Wall On" : "Wall Off";
    let fcolor =
      this.state.fontColorAddWall === "#FFFFFF" ? "#FFC107" : "#FFFFFF";
    this.setState({ wallMode: wall, fontColorAddWall: fcolor });
  }
  handleOnClickStartViz() {
    let startViz = !this.state.isStartViz;
    this.setState({isStartViz : startViz});
  }
  handleOnClickReset() {
    //calls reset function
  }
  handleOnClickRemoveWall() {
    let fcolor =
      this.state.fontColorRemoveWall === "#FFFFFF" ? "#FFC107" : "#FFFFFF";
    let rwallState = !this.state.removeWallState;
    this.setState({ fontColorRemoveWall: fcolor, removeWallState: rwallState });
  }

  render() {
    return (
      <div className="PureComponent">
        <AppBar
          position="static"
          className="colorTest"
          style={{ background: "#2E3B55" }}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className="menubutton"
              color="inherit"
              aria-label="menu"
              onClick={() => this.handleOnClickStartViz()}
            >
              <DirectionsRunIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Start Path Visualizer
            </Typography>
            <div className="Spacer"></div>
            <IconButton
              edge="start"
              className="menubutton"
              color="inherit"
              aria-label="menu"
              onClick={() => this.handleOnClickReset()}
            >
              <HighlightOffIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Reset
            </Typography>
            <div className="Spacer"></div>
            <IconButton
              edge="start"
              className="menubutton"
              color="inherit"
              aria-label="menu"
              onClick={() => this.handleOnClickWall()}
            >
              <BrushIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              style={{ color: this.state.fontColorAddWall }}
            >
              {this.state.wallMode}
            </Typography>
            <div className="Spacer"></div>
            <IconButton
              edge="start"
              className="menubutton"
              color="inherit"
              aria-label="menu"
              onClick={() => this.handleOnClickRemoveWall()}
            >
              <RedoIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              style={{ color: this.state.fontColorRemoveWall }}
            >
              Remove Wall
            </Typography>
          </Toolbar>
        </AppBar>
        <PathfindingVisualizer
          wallToggle={this.state.wallMode === "Wall Off" ? false : true}
          removeWallState={this.state.removeWallState}
          isStartViz = {this.state.isStartViz}
        ></PathfindingVisualizer>
      </div>
    );
  }
}
