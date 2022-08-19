import React, { useEffect } from "react";

import { colors, backgroundColor } from "../utils.js";
import { Arc } from "../Shapes.js";

export const handler = ({ inputs, mechanic }) => {
  const { width, height } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={backgroundColor} />

      {[0, 1, 2, 3].map((v) => (
        <Arc
          startAngle={(Math.PI / 4) * v}
          endAngle={(Math.PI / 4) * v + (Math.random() * Math.PI) / 2}
          radius={50}
          innerRadius={25}
          cx={250}
          cy={(height / 5) * (v + 1)}
          fill={colors[v]}
        />
      ))}
      {[0, 1, 2, 3].map((v) => (
        <Arc
          startAngle={(Math.PI / 4) * v}
          endAngle={(Math.PI / 4) * v + (Math.random() * Math.PI) / 2}
          radius={50}
          cx={50}
          cy={(height / 5) * (v + 1)}
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
