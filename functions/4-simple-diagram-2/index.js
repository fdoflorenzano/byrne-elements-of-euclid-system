import React, { useEffect } from "react";

import { backgroundColor, getGridDimensions } from "../utils.js";

import { getRandomDiagram } from "../diagrams.js";

export const handler = ({ inputs, mechanic }) => {
  const { width: realWidth, height: realHeight, margin, size, gap } = inputs;

  const width = realWidth - 2 * margin;
  const height = realHeight - 2 * margin;
  const diameter = Math.min(width, height) * size;

  const [columns, rows, xLength, yLength] = getGridDimensions(
    width,
    height,
    diameter,
    gap
  );

  const diagrams = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      diagrams.push(
        <g
          transform={`translate(${diameter / 2 + column * (diameter + gap)}, ${
            diameter / 2 + row * (diameter + gap)
          })`}
        >
          {getRandomDiagram(diameter)}
        </g>
      );
    }
  }

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={realWidth} height={realHeight}>
      <rect width={realWidth} height={realHeight} fill={backgroundColor} />
      <g
        transform={`translate(${margin + (width - xLength) / 2}, ${
          margin + (height - yLength) / 2
        })`}
      >
        {diagrams}
      </g>
    </svg>
  );
};

export const inputs = {
  width: {
    type: "number",
    default: 1600,
  },
  height: {
    type: "number",
    default: 3200,
  },
  margin: {
    type: "number",
    default: 50,
  },
  size: {
    type: "number",
    default: 0.26,
    min: 0.01,
    max: 1,
    step: 0.01,
    slider: true,
  },
  gap: {
    type: "number",
    default: 10,
  },
};

export const settings = {
  engine: require("@mechanic-design/engine-react"),
  showMultipleExports: true,
};
