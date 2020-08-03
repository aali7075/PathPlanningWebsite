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

export default class HotBar extends Component {
  constructor() {
    super();
    this.state = {
      wallMode: "Wall Off",
    };
  }
  handleOnClickWall() {
    let wall = this.state.wallMode === "Wall Off" ? "Wall On" : "Wall Off";
    this.setState({ wallMode: wall });
  }
  handleOnClickStartViz() {
    //calls algorithms
  }
  handleOnClickReset() {
    //calls reset function
  }
  handleOnClickRemoveWall() {
    //remove wall
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
            <Typography variant="h6" color="inherit">
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
            <Typography variant="h6" color="inherit">
              Remove Wall
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
