import React, { useEffect } from "react";

import { colors, backgroundColor } from "../utils.js";
import { Line, Arc } from "../Shapes.js";

export const handler = ({ inputs, mechanic }) => {
  const { width, height } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={backgroundColor} />
      {[0, 1, 2, 3].map((v) => (
        <Line
          x1={25 * (v + 1)}
          y1={10}
          x2={25 * (v + 1)}
          y2={height - 10}
          stroke={colors[v]}
          dashed={false}
        />
      ))}

      {[0, 1, 2, 3].map((v) => (
        <>
          <Line
            x1={100 + 25 * (v + 1)}
            y1={10}
            x2={100 + 25 * (v + 1)}
            y2={height - 10}
            stroke={colors[v]}
            dashed
          />
        </>
      ))}

      {[0, 1, 2, 3].map((v) => (
        <Arc
          cx={250}
          cy={(height / 5) * (v + 1)}
          startAngle={Math.PI / 2}
          endAngle={Math.PI}
          radius={50}
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
