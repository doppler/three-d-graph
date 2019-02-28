import React, { useState, useEffect } from "react";
import "./App.css";

const graphDivs = 1;
const graphSize = 250;
const numSides = 6;
const translateLength =
  graphSize / 2 / Math.tan(((360 / numSides / 2) * Math.PI) / 180);

const App = () => {
  const [angle, setAngle] = useState(0);

  let frame;
  useEffect(() => {
    requestAnimationFrame(() =>
      setAngle(angle => (angle === 360 / numSides - 1 ? 0 : angle + 0.25))
    );
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [angle]);
  useEffect(() => {
    document
      .getElementById("Scene")
      .style.setProperty("perspective", `${translateLength * 2.5}px`);
  }, []);
  return (
    <div id="App">
      <div id="Scene">
        <div id="Cube" style={{ transform: `rotateY(${angle}deg)` }}>
          {[...Array(numSides).keys()].map(side => (
            <Face {...{ angle, side, key: side }} />
          ))}
        </div>
      </div>
      <a
        href="https://github.com/doppler/three-d-graph/blob/master/src/App.js"
        target="_blank"
        rel="noopener noreferrer"
      >
        View Source
      </a>
    </div>
  );
};
export default App;

const Face = ({ side, angle, style }) => (
  <div
    className="Face"
    style={{
      ...style,
      width: graphSize,
      height: graphSize,
      transform: `rotateY(${(360 / numSides) *
        side}deg) translateZ(${translateLength}px)`
    }}
  >
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

const SineWave = ({ angle }) => {
  const numPoints = Math.round((graphSize / numSides) * 2);
  const Origin = graphSize / 2;
  const Frequency = (Math.PI * 2) / numPoints;
  const Phase = (angle * Math.PI * numSides) / 180;
  const Amplitude = graphSize / 2;

  return [...Array(numPoints).keys()].map(i => (
    <g key={i}>
      <circle
        key={i}
        cx={(graphSize / numPoints) * i}
        cy={Origin + Math.sin(Frequency * i + Phase) * Amplitude}
        r={1}
        style={{ fill: `hsl(${(360 / numPoints) * i}, 100%, 50%)` }}
      />
      <line
        x1={(graphSize / numPoints) * i}
        x2={(graphSize / numPoints) * i}
        y1={graphSize}
        y2={Origin + Math.sin(Frequency * i + Phase) * Amplitude}
        style={{
          stroke: `hsla(${180 - (360 / numPoints) * i}, 100%, 25%, 0.15)`
        }}
      />
    </g>
  ));
};
