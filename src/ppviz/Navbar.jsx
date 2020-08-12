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
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default class HotBar extends Component {
  constructor() {
    super();
    this.state = {
      wallMode: "Wall Off",
      fontColorAddWall: "#FFFFFF",
      fontColorRemoveWall: "#FFFFFF",
      removeWallState: false,
      isStartViz: false,
      isReset: false,
    };
  }
  handleOnClickWall() {
    if (!this.state.isStartViz) {
      let wall = this.state.wallMode === "Wall Off" ? "Wall On" : "Wall Off";
      let fcolor =
        this.state.fontColorAddWall === "#FFFFFF" ? "#FFC107" : "#FFFFFF";
      this.setState({ wallMode: wall, fontColorAddWall: fcolor });
    } else {
      this.myFunction();
    }
  }
  handleOnClickStartViz() {
    let startViz = !this.state.isStartViz;
    this.setState({ isStartViz: startViz });
  }
  handleOnClickReset() {
    let reset = !this.state.isReset;
    this.setState({isReset: reset});
  }
  handleOnClickRemoveWall() {
    let fcolor =
      this.state.fontColorRemoveWall === "#FFFFFF" ? "#FFC107" : "#FFFFFF";
    let rwallState = !this.state.removeWallState;
    this.setState({ fontColorRemoveWall: fcolor, removeWallState: rwallState });
  }

  myFunction() {
    var x = document.getElementById("text-message");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
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
            <div
              id="text-message"
              style={{ display: "none" }}
              className="text-message"
            >
              <Typography variant="h6" style={{ color: "orange" }} color="inherit">
                Click the Reset Button To Clear Grid and Modify Walls!
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <div
          id="text-message"
          style={{ display: "none" }}
          className="text-message"
        >
          testing!!!!
        </div>
        <PathfindingVisualizer
          wallToggle={this.state.wallMode === "Wall Off" ? false : true}
          removeWallState={this.state.removeWallState}
          isStartViz={this.state.isStartViz}
          isReset={this.state.isReset}
        ></PathfindingVisualizer>
      </div>
    );
  }
}
