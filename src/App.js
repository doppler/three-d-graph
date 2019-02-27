import React from "react";
import "./App.css";

const App = () => {
  const graphDivs = 5;
  const graphSize = 250;

  return (
    <div id="App">
      <div id="Scene">
        <div id="Cube">
          {["front", "left", "right", "back", "top", "bottom"].map(side => (
            <Face {...{ graphSize, graphDivs, id: side }} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;

const Face = ({ id, graphSize, graphDivs }) => (
  <div className="Face" id={id} style={{ width: graphSize, height: graphSize }}>
    <svg width={graphSize} height={graphSize}>
      {[...Array(graphDivs + 1).keys()].map(i => {
        let w = 0 + (graphSize / graphDivs) * i;
        return (
          <g key={i} id="grid">
            <line x1={0} x2={graphSize} y1={w} y2={w} />
            <line y1={0} y2={graphSize} x1={w} x2={w} />
          </g>
        );
      })}
    </svg>
  </div>
);
