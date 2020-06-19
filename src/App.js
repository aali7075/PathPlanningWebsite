import React from "react";
import "./App.css";
import PathfindingVisualizer from "./ppviz/PathPlannerViz";
import SidebarExampleVisible from "./ppviz/Navbar";

function App() {
  return (
    // add the nav bar here

    <div className="App">
      <PathfindingVisualizer />
      <SidebarExampleVisible />
    </div>
  );
}

export default App;
