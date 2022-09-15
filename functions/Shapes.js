import React from "react";

import { backgroundColor, arc } from "./utils.js";

const getSinglePathArc = (radius, startAngle, endAngle) => {
  return `M ${radius * Math.sin(startAngle)} ${
    -radius * Math.cos(startAngle)
  } A ${radius} ${radius} ${0} ${
    endAngle - startAngle <= Math.PI ? 0 : 1
  } ${1} ${radius * Math.sin(endAngle)} ${-radius * Math.cos(endAngle)}`;
};

export const Arc = ({
  radius,
  startAngle,
  endAngle,
  innerRadius,
  cx = 0,
  cy = 0,
  fill,
  filled,
  stroke,
  dashed,
  strokeWidth = 3,
}) => (
  <path
    d={
      radius === innerRadius
        ? getSinglePathArc(radius, startAngle, endAngle)
        : arc(radius, startAngle, endAngle, innerRadius)
    }
    transform={`translate(${cx}, ${cy})`}
    fill={radius !== innerRadius || filled ? fill : "none"}
    stroke={stroke && fill}
    strokeWidth={stroke && 3}
    strokeDasharray={stroke && dashed && `${strokeWidth}`}
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
