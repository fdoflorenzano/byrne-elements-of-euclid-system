import React from "react";

import {
  linesIntersect,
  randomAngle,
  getLinesBoundingBox,
  lineLength,
  rotate,
  randomColor,
  tossCoin,
} from "../utils.js";
import { Arc, Line } from "../Shapes.js";

export const getRandomCircle = (size) => {
  const radius = size / 2;

  const circleColor = randomColor();
  const lineColor = randomColor([circleColor]);

  const angle1 = randomAngle();
  const angle2 = randomAngle(angle1 + Math.PI / 5, angle1 + (4 * Math.PI) / 5);
  const adjustingAngle = -angle1 - (angle1 + angle2) / 2;

  const point1 = { x: 0, y: -radius };
  rotate(point1, -angle1);
  rotate(point1, -adjustingAngle);
  const point2 = { x: 0, y: -radius };
  rotate(point2, -angle2);
  rotate(point2, -adjustingAngle);

  const halfCircle1 = (
    <Arc
      radius={radius}
      innerRadius={radius}
      stroke
      fill={circleColor}
      startAngle={angle1 < angle2 ? angle1 : angle2}
      endAngle={angle1 < angle2 ? angle2 : angle1}
    />
  );
  const halfCircle2 = (
    <Arc
      radius={radius}
      innerRadius={radius}
      stroke
      dashed
      fill={circleColor}
      startAngle={angle1 < angle2 ? angle2 : angle1}
      endAngle={Math.PI * 2 + (angle1 < angle2 ? angle1 : angle2)}
    />
  );

  return (
    <g>
      {halfCircle1}
      {halfCircle2}
      {
        <Line
          stroke={lineColor}
          x1={point1.x}
          x2={point2.x}
          y1={point1.y}
          y2={point2.y}
        />
      }
    </g>
  );
};
