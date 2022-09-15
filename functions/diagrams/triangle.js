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

export const getRandomTriangle = (size) => {
  const baseLength = Math.random() * size;
  const point1 = { x: 0, y: 0 };
  const point2 = { x: baseLength, y: 0 };

  let angle1 = randomAngle((1 * Math.PI) / 10, (4 * Math.PI) / 10);
  let angle2 = randomAngle((1 * Math.PI) / 10, (4 * Math.PI) / 10);
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

  const angleAdjustOptions = [0, 1, 2, 3, 4, 5, 6, 7].map(
    (v) => (2 * Math.PI * v) / 8
  );

  const adjustAngle =
    angleAdjustOptions[Math.floor(Math.random() * angleAdjustOptions.length)];

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

  const arc1MaxLength = Math.min(length2, length3) / 2;
  const arc2MaxLength = Math.min(length1, length3) / 2;
  const arc3MaxLength = Math.min(length2, length1) / 2;

  const boundingBox = getLinesBoundingBox([line1, line2, line3]);
  const ratio = Math.min(size / boundingBox.width, size / boundingBox.height);

  const line1Color = randomColor();
  const line2Color = randomColor([line1Color]);
  const line3Color = randomColor([line1Color, line2Color]);
  const line1IsDashed = tossCoin(0.75);
  const line2IsDashed = tossCoin(0.75);
  const line3IsDashed = tossCoin(0.75);
  const arc1Color = randomColor([line2Color, line3Color]);
  const arc2Color = randomColor([line1Color, line3Color]);
  const arc3Color = randomColor([line1Color, line2Color]);
  const arc1Radius = Math.min(50 / ratio, arc1MaxLength);
  const arc1InnerRadius = tossCoin() ? 0 : (arc1Radius * 2) / 5;
  const arc2Radius = Math.min(50 / ratio, arc2MaxLength);
  const arc2InnerRadius = tossCoin() ? 0 : (arc2Radius * 2) / 5;
  const arc3Radius = Math.min(50 / ratio, arc3MaxLength);
  const arc3InnerRadius = tossCoin() ? 0 : (arc3Radius * 2) / 5;
  const showArc1 = true;
  const showArc2 = tossCoin();
  const showArc3 = tossCoin();

  return (
    <g
      transform={`translate(${(size - boundingBox.width * ratio) / 2}, ${
        (size - boundingBox.height * ratio) / 2
      })`}
    >
      <g
        transform={`scale(${ratio}) translate(${-boundingBox.x0}, ${-boundingBox.y0})`}
      >
        {showArc1 && (
          <Arc
            radius={arc1Radius}
            innerRadius={arc1InnerRadius}
            startAngle={Math.PI / 2 - angle1 + adjustAngle}
            endAngle={Math.PI / 2 + adjustAngle}
            cx={point1.x}
            cy={point1.y}
            fill={arc1Color}
          />
        )}
        {showArc2 && (
          <Arc
            radius={arc2Radius}
            innerRadius={arc2InnerRadius}
            startAngle={-Math.PI / 2 + adjustAngle}
            endAngle={-Math.PI / 2 + angle2 + adjustAngle}
            cx={point2.x}
            cy={point2.y}
            fill={arc2Color}
          />
        )}
        {showArc3 && (
          <Arc
            radius={arc3Radius}
            innerRadius={arc3InnerRadius}
            startAngle={Math.PI / 2 + angle2 + adjustAngle}
            endAngle={-Math.PI / 2 - angle1 + 2 * Math.PI + adjustAngle}
            cx={point3.x}
            cy={point3.y}
            fill={arc3Color}
          />
        )}

        <Line
          x1={point1.x}
          y1={point1.y}
          x2={point2.x}
          y2={point2.y}
          dashed={line3IsDashed}
          stroke={line3Color}
          strokeWidth={3 / ratio}
        />
        <Line
          x1={point3.x}
          y1={point3.y}
          x2={point2.x}
          y2={point2.y}
          dashed={line1IsDashed}
          stroke={line1Color}
          strokeWidth={3 / ratio}
        />
        <Line
          x1={point1.x}
          y1={point1.y}
          x2={point3.x}
          y2={point3.y}
          dashed={line2IsDashed}
          stroke={line2Color}
          strokeWidth={3 / ratio}
        />
      </g>
    </g>
  );
};
