import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const graphDivs = 1;
  const graphSize = 250;

  const [angle, setAngle] = useState(45);

  let frame;
  useEffect(() => {
    cancelAnimationFrame(frame);
    requestAnimationFrame(() =>
      setAngle(angle => (angle === 89 ? 0 : angle + 1))
    );
  }, [angle]);
  return (
    <div id="App">
      <div id="Scene">
        <div id="Cube" style={{ transform: `rotateY(${angle}deg)` }}>
          {["front", "left", "right", "back"].map(side => (
            <Face key={side} {...{ graphSize, graphDivs, angle, id: side }} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default App;

const Face = ({ id, graphSize, graphDivs, angle }) => (
  <div className="Face" id={id} style={{ width: graphSize, height: graphSize }}>
    <svg width={graphSize} height={graphSize}>
      <SineWave {...{ graphSize, angle }} />
      {[...Array(graphDivs + 1).keys()].map(i => {
        let w = 0 + (graphSize / graphDivs) * i;
        return (
          <g key={i} id="grid">
            <line x1={0} x2={graphSize} y1={w} y2={w} />
            {/* <line y1={0} y2={graphSize} x1={w} x2={w} /> */}
          </g>
        );
      })}
    </svg>
  </div>
);

const SineWave = ({ graphSize, angle }) => {
  const divs = 16 - (angle % 8);
  const Zero = graphSize / 2;
  const Frequency = (Math.PI * 2) / divs;
  const Phase = (angle * Math.PI * 4) / 180;
  const Amplitude = graphSize / 2;

  return [...Array(divs).keys()].map(i => (
    <circle
      key={i}
      cx={(graphSize / divs) * i}
      cy={Zero + Math.sin(Frequency * i + Phase) * Amplitude}
      r={1}
      style={{ fill: `hsla(${(360 / divs) * i}, 100%, 50%)` }}
    />
  ));
};
