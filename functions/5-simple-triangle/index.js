import React, { useEffect } from "react";

import {
  backgroundColor,
  linesIntersect,
  randomAngle,
  getLinesBoundingBox,
  lineLength,
  rotate,
} from "../utils.js";

import { getRandomDiagram } from "../diagrams.js";
import { Arc, Line } from "../Shapes.js";

export const handler = ({ inputs, mechanic }) => {
  const { width: realWidth, height: realHeight, margin } = inputs;

  const width = realWidth - 2 * margin;
  const height = realHeight - 2 * margin;
  const diameter = Math.min(width, height);

  const baseLength = Math.random() * diameter;
  const point1 = { x: 0, y: 0 };
  const point2 = { x: baseLength, y: 0 };

  let angle1 = randomAngle(Math.PI / 10, Math.PI / 2);
  let angle2 = randomAngle(Math.PI / 10, Math.PI / 2);
  let angle3 = Math.PI - angle1 - angle2;

  const projectedPoint1 = {
    x: baseLength,
    y: point1.y - baseLength * Math.tan(angle1),
  };
  const projectedPoint2 = {
    x: point1.x,
    y: point2.y - baseLength * Math.tan(angle2),
  };
  const point3 = linesIntersect(
    {
      x1: point1.x,
      y1: point1.y,
      x2: projectedPoint1.x,
      y2: projectedPoint1.y,
    },
    {
      x1: point2.x,
      y1: point2.y,
      x2: projectedPoint2.x,
      y2: projectedPoint2.y,
    }
  );

  const adjustAngle = 0;

  rotate(point1, adjustAngle);
  rotate(point2, adjustAngle);
  rotate(point3, adjustAngle);

  const line1 = {
    x1: point3.x,
    y1: point3.y,
    x2: point2.x,
    y2: point2.y,
  };
  const line2 = {
    x1: point1.x,
    y1: point1.y,
    x2: point3.x,
    y2: point3.y,
  };
  const line3 = {
    x1: point1.x,
    y1: point1.y,
    x2: point2.x,
    y2: point2.y,
  };

  const length1 = lineLength(line1);
  const length2 = lineLength(line2);
  const length3 = lineLength(line3);

  const boundingBox = getLinesBoundingBox([line1, line2, line3]);
  const ratio = Math.min(
    width / boundingBox.width,
    height / boundingBox.height
  );

  useEffect(() => {
    mechanic.done();
  }, []);

  return (
    <svg width={realWidth} height={realHeight}>
      <rect width={realWidth} height={realHeight} fill={backgroundColor} />

      <g
        transform={`translate(${
          margin + (width - boundingBox.width * ratio) / 2
        }, ${margin + (height - boundingBox.height * ratio) / 2})`}
      >
        <g
          transform={`scale(${ratio}) translate(${-boundingBox.x0}, ${-boundingBox.y0})`}
        >
          <Line
            x1={point1.x}
            y1={point1.y}
            x2={point2.x}
            y2={point2.y}
            stroke="black"
            strokeWidth={3 / ratio}
          />
          <Line
            x1={point3.x}
            y1={point3.y}
            x2={point2.x}
            y2={point2.y}
            stroke="black"
            strokeWidth={3 / ratio}
          />
          <Line
            x1={point1.x}
            y1={point1.y}
            x2={point3.x}
            y2={point3.y}
            stroke="black"
            strokeWidth={3 / ratio}
          />

          <Arc
            radius={50 / ratio}
            innerRadius={20 / ratio}
            startAngle={Math.PI / 2 - angle1 - adjustAngle}
            endAngle={Math.PI / 2 - adjustAngle}
          />
          <Arc
            radius={50 / ratio}
            innerRadius={20 / ratio}
            startAngle={-Math.PI / 2 - adjustAngle}
            endAngle={-Math.PI / 2 + angle2 - adjustAngle}
            cx={point2.x}
            cy={point2.y}
          />
          <Arc
            radius={50 / ratio}
            innerRadius={20 / ratio}
            startAngle={Math.PI / 2 + angle2 - adjustAngle}
            endAngle={-Math.PI / 2 - angle1 + 2 * Math.PI - adjustAngle}
            cx={point3.x}
            cy={point3.y}
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
