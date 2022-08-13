import React, { useEffect } from "react";

import {
  colors,
  backgroundColor,
  arc,
  linesIntersect,
  getLineAngle,
  getLineLength,
  getLinesBoundingBox,
} from "../utils.js";

export const handler = ({ inputs, mechanic }) => {
  const { width, height, margin } = inputs;

  useEffect(() => {
    mechanic.done();
  }, []);

  const line1 = {
    x1: Math.random() * width,
    y1: Math.random() * height,
    x2: Math.random() * width,
    y2: Math.random() * height,
  };
  const line1Color = colors[Math.floor(Math.random() * colors.length)];
  const line1IsDashed = Math.random() > 0.5;

  const line2 = {
    x1: Math.random() * width,
    y1: Math.random() * height,
    x2: Math.random() * width,
    y2: Math.random() * height,
  };
  const line2Color = colors[Math.floor(Math.random() * colors.length)];
  const line2IsDashed = Math.random() > 0.5;

  const intersection = linesIntersect(line1, line2);
  const line1Point =
    Math.random() > 0.5
      ? { x: line1.x1, y: line1.y1 }
      : { x: line1.x2, y: line1.y2 };
  const line2Point =
    Math.random() > 0.5
      ? { x: line2.x1, y: line2.y1 }
      : { x: line2.x2, y: line2.y2 };

  const angle1 =
    intersection &&
    getLineAngle({
      x1: intersection.x,
      y1: intersection.y,
      x2: line1Point.x,
      y2: line1Point.y,
    });
  const length1 =
    intersection &&
    getLineLength({
      x1: intersection.x,
      y1: intersection.y,
      x2: line1Point.x,
      y2: line1Point.y,
    });
  const angle2 =
    intersection &&
    getLineAngle({
      x1: intersection.x,
      y1: intersection.y,
      x2: line2Point.x,
      y2: line2Point.y,
    });
  const length2 =
    intersection &&
    getLineLength({
      x1: intersection.x,
      y1: intersection.y,
      x2: line2Point.x,
      y2: line2Point.y,
    });
  const arcColor =
    intersection && colors[Math.floor(Math.random() * colors.length)];

  const boundingBox = getLinesBoundingBox([line1, line2]);
  const ratio = Math.min(
    (width - margin * 2) / boundingBox.width,
    (height - margin * 2) / boundingBox.height
  );

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={backgroundColor} />
      <g transform={`translate(${margin}, ${margin})`}>
        <g
          transform={`scale(${ratio}) translate(${-boundingBox.x0}, ${-boundingBox.y0})`}
        >
          {intersection && (
            <path
              d={arc(Math.min(50, length1, length2), angle1, angle2)}
              transform={`translate(${intersection.x}, ${intersection.y})`}
              fill={arcColor}
            />
          )}
          {line1IsDashed && (
            <line
              x1={line1.x1}
              y1={line1.y1}
              x2={line1.x2}
              y2={line1.y2}
              stroke={backgroundColor}
              strokeWidth={3 / ratio}
              strokeLinecap="round"
            />
          )}
          <line
            x1={line1.x1}
            y1={line1.y1}
            x2={line1.x2}
            y2={line1.y2}
            stroke={line1Color}
            strokeWidth={3 / ratio}
            strokeLinecap="round"
            strokeDasharray={line1IsDashed ? 5 / ratio : undefined}
          />
          {line2IsDashed && (
            <line
              x1={line2.x1}
              y1={line2.y1}
              x2={line2.x2}
              y2={line2.y2}
              stroke={backgroundColor}
              strokeWidth={3 / ratio}
              strokeLinecap="round"
            />
          )}
          <line
            x1={line2.x1}
            y1={line2.y1}
            x2={line2.x2}
            y2={line2.y2}
            stroke={line2Color}
            strokeWidth={3 / ratio}
            strokeLinecap="round"
            strokeDasharray={line2IsDashed ? 5 / ratio : undefined}
          />
        </g>
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
