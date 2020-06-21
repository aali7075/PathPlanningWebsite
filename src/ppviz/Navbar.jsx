import React, { Component } from "react";
import "./Navbar.css";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

export default class HotBar extends Component {
  handleOnClick() {
    console.log("SLATT SLATT");
  }
  render() {
    return (
      <div className = "PureComponent">
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              className="menubutton"
              color="inherit"
              aria-label="menu"
              onClick={() => this.handleOnClick()}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
