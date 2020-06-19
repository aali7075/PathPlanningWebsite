import React from "react";
import "./App.css";
import PathfindingVisualizer from "./ppviz/PathPlannerViz";

function App() {
  return (
    // add the nav bar here
    <div className="App">
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  );
}

export default App;
