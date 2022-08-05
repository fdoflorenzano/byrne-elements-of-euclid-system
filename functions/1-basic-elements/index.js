import React, { useEffect } from "react";

import { colors, backgroundColor } from "../utils.js";

export const handler = ({ inputs, mechanic }) => {
  const { width, height } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  // generate random points? lines? shapes?
  // determine all lines involved
  // check for intersections and divide lines up
  // randomize styling for each line: stroke color, stroke dasharray
  //

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={backgroundColor} />
      {[0, 1, 2, 3].map((v) => (
        <line
          x1={25 * (v + 1)}
          y1={10}
          x2={25 * (v + 1)}
          y2={height - 10}
          stroke={colors[v]}
          strokeWidth={3}
          strokeLinecap="round"
        />
      ))}

      {[0, 1, 2, 3].map((v) => (
        <>
          <line
            x1={100 + 25 * (v + 1)}
            y1={10}
            x2={100 + 25 * (v + 1)}
            y2={height - 10}
            stroke={backgroundColor}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <line
            x1={100 + 25 * (v + 1)}
            y1={10}
            x2={100 + 25 * (v + 1)}
            y2={height - 10}
            stroke={colors[v]}
            strokeWidth={3}
            strokeDasharray={5}
          />
        </>
      ))}

      {/* https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths#arcs */}
      {[0, 1, 2, 3].map((v) => (
        <path
          d={`M ${250} ${(height / 5) * (v + 1)}
            L${250} ${(height / 5) * (v + 1) + 50}
            A ${50} ${50} 0 0 0 ${300} ${(height / 5) * (v + 1)} 
            Z`}
          fill={colors[v]}
        />
      ))}
    </svg>
  );
};

export const inputs = {
  width: {
    type: "number",
    default: 400,
  },
  height: {
    type: "number",
    default: 300,
  },
};

export const settings = {
  engine: require("@mechanic-design/engine-react"),
};
