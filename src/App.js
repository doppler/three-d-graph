import React from "react";
import "./App.css";

const App = () => {
  const graphDivs = 3;
  const graphSize = 250;

  return (
    <div id="App">
      <div id="Scene">
        <div id="Cube">
          <Face {...{ graphSize, graphDivs, id: "front" }} />
          <Face {...{ graphSize, graphDivs, id: "left" }} />
          <Face {...{ graphSize, graphDivs, id: "right" }} />
          <Face {...{ graphSize, graphDivs, id: "back" }} />
          <Face {...{ graphSize, graphDivs, id: "top" }} />
          <Face {...{ graphSize, graphDivs, id: "bottom" }} />
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
        return (
          <g key={i} id="grid">
            <line
              x1={0}
              x2={graphSize}
              y1={0 + (graphSize / graphDivs) * i}
              y2={0 + (graphSize / graphDivs) * i}
            />
            <line
              y1={0}
              y2={graphSize}
              x1={0 + (graphSize / graphDivs) * i}
              x2={0 + (graphSize / graphDivs) * i}
            />
          </g>
        );
      })}
    </svg>
  </div>
);
