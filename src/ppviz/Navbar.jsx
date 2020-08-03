import React, { Component } from "react";
import "./Navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import BrushIcon from "@material-ui/icons/Brush";

export default class HotBar extends Component {
  handleOnClick() {
    console.log("SLATT SLATT");
  }
  render() {
    let wallMode = "Wall Off";
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
              onClick={() => this.handleOnClick()}
              //style={{ color: green[500] }}
            >
              <BrushIcon  />
            </IconButton>
            <Typography variant="h6" color="inherit" >
              {wallMode}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
