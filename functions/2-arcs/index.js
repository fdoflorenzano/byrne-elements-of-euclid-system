import React, { useEffect } from "react";

import { colors, backgroundColor, arc } from "../utils.js";

export const handler = ({ inputs, mechanic }) => {
  const { width, height } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={backgroundColor} />

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
      {[0, 1, 2, 3].map((v) => (
        <path
          d={arc(50, (Math.PI / 4) * v, (Math.PI / 4) * v + Math.PI / 4)}
          transform={`translate(${50}, ${(height / 5) * (v + 1)})`}
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
