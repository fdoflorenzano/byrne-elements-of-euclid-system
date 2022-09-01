import React from "react";

import {
  randomAngle,
  randomColor,
  closestRightAngle,
  tossCoin,
} from "./utils.js";
import { Arc, Line } from "./Shapes.js";

export const getRandomDiagram = (size) => {
  const strokeWidth = Math.floor(size / 40);

  const initialAngle = randomAngle();
  const roundedInitialAngle = closestRightAngle(initialAngle);
  const line1 = {
    x1: 0,
    y1: 0,
    x2: (size / 2) * Math.sin(initialAngle),
    y2: -(size / 2) * Math.cos(initialAngle),
  };
  const line1Color = randomColor();
  const line1IsDashed = tossCoin(0.75);
  const showLine1 = true;

  const secondAngleOffset = randomAngle(Math.PI / 8, (3 * Math.PI) / 4);
  const secondAngle = initialAngle + secondAngleOffset;
  const line2 = {
    x1: 0,
    y1: 0,
    x2: (size / 2) * Math.sin(secondAngle),
    y2: -(size / 2) * Math.cos(secondAngle),
  };
  const line2Color = randomColor([line1Color]);
  const line2IsDashed = tossCoin(0.75);
  const showLine2 = true;

  const thirdAngleOffset = randomAngle(Math.PI / 8, (3 * Math.PI) / 4);
  const isThirdAndExtensionOfFirst = tossCoin();
  const thirdAngle = isThirdAndExtensionOfFirst
    ? initialAngle + Math.PI
    : secondAngle + thirdAngleOffset;
  const line3 = {
    x1: 0,
    y1: 0,
    x2: (size / 2) * Math.sin(thirdAngle),
    y2: -(size / 2) * Math.cos(thirdAngle),
  };
  let line3Color = randomColor([line1Color, line2Color]);
  line3Color = isThirdAndExtensionOfFirst ? line1Color : line3Color;
  let line3IsDashed = tossCoin(0.75);
  line3IsDashed = isThirdAndExtensionOfFirst ? line1IsDashed : line3IsDashed;
  const showLine3 = true;

  const forthAngleOffset = randomAngle(Math.PI / 8, (1 * Math.PI) / 4);
  const isForthAndExtensionOfSecond = tossCoin();
  const isForthAndExtensionOfFirst =
    tossCoin() &&
    !isForthAndExtensionOfSecond &&
    thirdAngle < initialAngle + (7 * Math.PI) / 8;
  const forthAngle = isForthAndExtensionOfSecond
    ? secondAngle + Math.PI
    : isForthAndExtensionOfFirst
    ? initialAngle + Math.PI
    : thirdAngle + forthAngleOffset;
  const line4 = {
    x1: 0,
    y1: 0,
    x2: (size / 2) * Math.sin(forthAngle),
    y2: -(size / 2) * Math.cos(forthAngle),
  };
  let line4Color = randomColor([line1Color, line2Color, line3Color]);
  line4Color = isThirdAndExtensionOfFirst
    ? line2Color
    : isForthAndExtensionOfFirst
    ? line1Color
    : line4Color;
  let line4IsDashed = tossCoin(0.75);
  line4IsDashed = isThirdAndExtensionOfFirst
    ? line2IsDashed
    : isForthAndExtensionOfFirst
    ? line1IsDashed
    : line4IsDashed;
  const showLine4 = tossCoin();

  const arc1Color = randomColor([line1Color, line2Color]);
  const showArc1 = true;
  const arc1InnerRadius = tossCoin() ? 0 : size / 10;
  const arc2Color = randomColor([arc1Color, line3Color, line2Color]);
  const showArc2 = tossCoin();
  const arc2InnerRadius = tossCoin() ? 0 : size / 10;
  const arc3Color = randomColor([arc1Color, arc2Color, line4Color]);
  const showArc3 = tossCoin();
  const arc3InnerRadius = tossCoin() ? 0 : size / 10;
  const arc4Color = randomColor([arc1Color, arc2Color, arc3Color]);
  const showArc4 = tossCoin();
  const arc4InnerRadius = tossCoin() ? 0 : size / 10;

  return (
    <g
      transform={`rotate(${
        ((roundedInitialAngle - initialAngle) * 180) / Math.PI
      })`}
    >
      {showLine1 && showLine2 && showArc1 && (
        <Arc
          radius={size / 5}
          innerRadius={arc1InnerRadius}
          startAngle={initialAngle}
          endAngle={secondAngle}
          fill={arc1Color}
        />
      )}
      {showLine2 && showLine3 && showArc2 && (
        <Arc
          radius={size / 5}
          innerRadius={arc2InnerRadius}
          startAngle={secondAngle}
          endAngle={thirdAngle}
          fill={arc2Color}
        />
      )}
      {showLine3 && showLine4 && showArc3 && (
        <Arc
          radius={size / 5}
          innerRadius={arc3InnerRadius}
          startAngle={thirdAngle}
          endAngle={forthAngle}
          fill={arc3Color}
        />
      )}
      {showLine4 && showLine1 && showArc4 && (
        <Arc
          radius={size / 5}
          innerRadius={arc4InnerRadius}
          startAngle={forthAngle}
          endAngle={2 * Math.PI + initialAngle}
          fill={arc4Color}
        />
      )}

      {showLine1 && (
        <Line
          x1={line1.x1}
          y1={line1.y1}
          x2={line1.x2}
          y2={line1.y2}
          stroke={line1Color}
          strokeWidth={strokeWidth}
          dashed={line1IsDashed}
        />
      )}
      {showLine2 && (
        <Line
          x1={line2.x1}
          y1={line2.y1}
          x2={line2.x2}
          y2={line2.y2}
          stroke={line2Color}
          strokeWidth={strokeWidth}
          dashed={line2IsDashed}
        />
      )}
      {showLine3 && (
        <Line
          x1={line3.x1}
          y1={line3.y1}
          x2={line3.x2}
          y2={line3.y2}
          stroke={line3Color}
          strokeWidth={strokeWidth}
          dashed={line3IsDashed}
        />
      )}
      {showLine4 && (
        <Line
          x1={line4.x1}
          y1={line4.y1}
          x2={line4.x2}
          y2={line4.y2}
          stroke={line4Color}
          strokeWidth={strokeWidth}
          dashed={line4IsDashed}
        />
      )}
    </g>
  );
};
