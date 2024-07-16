function generateCirclePoints(canvasContext, centerX, centerY) {
  const radius = Math.floor(Math.random() * 26) + 25; // Random radius between 5 and 10
  const numPoints = 16; // Number of points to generate
  let points = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });
    canvasContext.fillRect(x, y, 2, 2); // Draw a small point at (x, y)
  }
  console.log(points);
}

export const Orgnism = (canvas) => {
  let ctx = canvas.getContext("2d"),
    points = [],
    numPoints = 200;
  for (let i = 0; i < numPoints; i++) {
    let point = Math.random() * numPoints;
    points.push(point);
  }
  ctx.fillStyle = "yellow";
  ctx.strokeStyle = "green";
  for (let i = 0; i < points.length; i++) {
    let x = points[i],
      y = points[i + 1];
    ctx.fillRect(x, y, 2, 2);
  }
};
