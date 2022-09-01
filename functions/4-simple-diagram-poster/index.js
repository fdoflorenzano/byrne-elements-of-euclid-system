import React, { useEffect } from "react";

import { backgroundColor, getGridDimensions } from "../utils.js";

import { getRandomDiagram } from "../diagrams.js";

export const handler = ({ inputs, mechanic }) => {
  const {
    width: realWidth,
    height: realHeight,
    verticalMargin: verticalMarginRatio,
    horizontalMargin: horizontalMarginRatio,
    size,
    verticalGap: verticalGapRatio,
    horizontalGap: horizontalGapRatio,
  } = inputs;

  const horizontalMargin = (realWidth * horizontalMarginRatio) / 2;
  const verticalMargin = (realHeight * verticalMarginRatio) / 2;
  const width = realWidth - 2 * horizontalMargin;
  const height = realHeight - 2 * verticalMargin;
  const diameter = Math.min(width, height) * size;
  const verticalGap = diameter * verticalGapRatio;
  const horizontalGap = diameter * horizontalGapRatio;

  const [columns, rows, xLength, yLength] = getGridDimensions(
    width,
    height,
    diameter,
    horizontalGap,
    verticalGap
  );

  const diagrams = [];

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      diagrams.push(
        <g
          key={`${row}-${column}`}
          transform={`translate(${
            diameter / 2 + column * (diameter + horizontalGap)
          }, ${diameter / 2 + row * (diameter + verticalGap)})`}
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
        transform={`translate(${horizontalMargin + (width - xLength) / 2}, ${
          verticalMargin + (height - yLength) / 2
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
  size: {
    type: "number",
    default: 0.26,
    min: 0.01,
    max: 1,
    step: 0.01,
    slider: true,
  },
  verticalMargin: {
    type: "number",
    default: 0.2,
    min: 0,
    max: 1,
    step: 0.01,
    slider: true,
  },
  horizontalMargin: {
    type: "number",
    default: 0.2,
    min: 0,
    max: 1,
    step: 0.01,
    slider: true,
  },
  verticalGap: {
    type: "number",
    default: 0.2,
    min: 0,
    max: 4,
    step: 0.01,
    slider: true,
  },
  horizontalGap: {
    type: "number",
    default: 0.2,
    min: 0,
    max: 4,
    step: 0.01,
    slider: true,
  },
};

export const settings = {
  engine: require("@mechanic-design/engine-react"),
  showMultipleExports: true,
};
