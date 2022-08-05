import { arc as arcD3 } from "d3-shape";

// https://www.c82.net/euclid/book1/
export const colors = ["#000000", "#d42a20", "#fac22b", "#0e638e"];
export const backgroundColor = "#fcf3d9";

const arcGen = arcD3();

export const arc = (radius, startAngle, endAngle) =>
  arcGen({
    innerRadius: 0,
    outerRadius: radius,
    startAngle,
    endAngle,
  });

// line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
// Return FALSE if the lines don't intersect
export const linesIntersect = (line1, line2) => {
  const { x1, x2, y1, y2 } = line1;
  const { x1: x3, x2: x4, y1: y3, y2: y4 } = line2;

  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }

  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // Lines are parallel
  if (denominator === 0) {
    return false;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return false;
  }

  // Return a object with the x and y coordinates of the intersection
  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  return { x, y };
};

export const getLineAngle = (line) => {
  const { x1, x2, y1, y2 } = line;

  const x = x2 - x1;
  const y = y2 - y1;
  return Math.atan2(y, x) + Math.PI / 2;
};

export const getLineLength = (line) => {
  const { x1, x2, y1, y2 } = line;

  return Math.hypot(x1 - x2, y1 - y2);
};

export const getLinesBoundingBox = (lines) => {
  let bx0, bx1, by0, by1;
  for (let line of lines) {
    const { x1, x2, y1, y2 } = line;
    for (let point of [
      { x: x1, y: y1 },
      { x: x2, y: y2 },
    ]) {
      const { x, y } = point;
      if (bx0 === undefined || x < bx0) bx0 = x;
      if (by0 === undefined || y < by0) by0 = y;
      if (bx1 === undefined || x > bx1) bx1 = x;
      if (by1 === undefined || y > by1) by1 = y;
    }
  }
  return {
    x0: bx0,
    x1: bx1,
    y0: by0,
    y1: by1,
    width: bx1 - bx0,
    height: by1 - by0,
  };
};