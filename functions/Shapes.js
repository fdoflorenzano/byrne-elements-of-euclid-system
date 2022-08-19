import React from "react";

import { backgroundColor, arc } from "./utils.js";

export const Arc = ({
  radius,
  startAngle,
  endAngle,
  innerRadius,
  cx = 0,
  cy = 0,
  fill,
}) => (
  <path
    d={arc(radius, startAngle, endAngle, innerRadius)}
    transform={`translate(${cx}, ${cy})`}
    fill={fill}
  />
);

export const Line = ({
  x1,
  x2,
  y1,
  y2,
  stroke,
  dashed = false,
  strokeWidth = 3,
}) => (
  <>
    {dashed && (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={backgroundColor}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    )}
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeDasharray={
        dashed ? `${strokeWidth} ${strokeWidth / 2.5}` : undefined
      }
    />
  </>
);
