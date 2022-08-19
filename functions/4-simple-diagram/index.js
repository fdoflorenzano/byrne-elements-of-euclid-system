import React, { useEffect } from "react";

import { backgroundColor } from "../utils.js";

import { getRandomDiagram } from "../diagrams.js";

export const handler = ({ inputs, mechanic }) => {
  const { width: realWidth, height: realHeight, margin } = inputs;

  const width = realWidth - 2 * margin;
  const height = realHeight - 2 * margin;
  const diameter = Math.min(width, height);

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={realWidth} height={realHeight}>
      <rect width={realWidth} height={realHeight} fill={backgroundColor} />
      <g transform={`translate(${margin + width / 2}, ${margin + height / 2})`}>
        {getRandomDiagram(diameter)}
      </g>
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
  margin: {
    type: "number",
    default: 50,
  },
};

export const settings = {
  engine: require("@mechanic-design/engine-react"),
};
