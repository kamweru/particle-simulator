let ctx,
  offscreen,
  particleMap,
  particles,
  colorRuleMap,
  timeFactor,
  canvasWidth,
  canvasHeight;
const draw = (x, y, r, c) => {
  ctx.fillStyle = c;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
};
const updatePosition = (particle) => {
  particle.x += particle.vx;
  particle.y += particle.vy;
  //   if (particle.x < 0) {
  //     particle.x = -particle.x;
  //     particle.vx *= -1;
  //   }
  //   if (particle.x >= canvasWidth) {
  //     particle.x = 2 * canvasWidth - particle.x;
  //     particle.vx *= -1;
  //   }
  //   if (particle.y < 0) {
  //     particle.y = -particle.y;
  //     particle.vy *= -1;
  //   }
  //   if (particle.y >= canvasHeight) {
  //     particle.y = 2 * canvasHeight - particle.y;
  //     particle.vy *= -1;
  //   }
  // wrap around the canvas edges
  if (particle.x < 0) particle.x += canvasWidth;
  if (particle.x > canvasWidth) particle.x -= canvasWidth;
  if (particle.y < 0) particle.y += canvasHeight;
  if (particle.y > canvasHeight) particle.y -= canvasHeight;
};
const rule = (particle1, particle2, g) => {
  particle1.forEach((a) => {
    let { x: ax, y: ay, vx, vy } = a;
    let [fx, fy] = particle2.reduce(
      ([fxAcc, fyAcc], b) => {
        let { x: bx, y: by } = b;
        let dx = ax - bx;
        let dy = ay - by;
        let d = Math.sqrt(dx * dx + dy * dy);
        let distance = Math.sqrt(
          (canvasWidth * canvasHeight) / particle1.length
        );
        if (d > 0 && d < distance) {
          let F = g * (1 / d);
          return [fxAcc + F * dx, fyAcc + F * dy];
        }
        return [fxAcc, fyAcc];
      },
      [0, 0]
    );

    a.vx = (vx + fx) * timeFactor;
    a.vy = (vy + fy) * timeFactor;
    updatePosition(a);
  });
};

const loop = () => {
  requestAnimationFrame(loop);
  colorRuleMap.map(({ color1, color2, hex1, hex2, direction }) =>
    rule(particleMap[color1], particleMap[color2], direction)
  );
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "#181818";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  particles.map((particle) =>
    draw(particle.x, particle.y, particle.r, particle.color)
  );
  const bitmap = offscreen.transferToImageBitmap();
  postMessage(bitmap);
};

const handleMessage = ({ data }) => {
  if (data.message === "load") {
    ({
      offscreen,
      particleMap,
      particles,
      colorRuleMap,
      timeFactor,
      canvasWidth,
      canvasHeight,
    } = data);
    ctx = offscreen.getContext("2d");
    loop();
  } else if (data.message === "timeFactor") {
    timeFactor = data.timeFactor;
  } else if (data.message === "addColor") {
    particles = [...particles, ...data.particles];
    particleMap = {
      ...particleMap,
      ...data.particleMap,
    };
    colorRuleMap = [...colorRuleMap, ...data.colorRuleMap];
  } else if (data.message === "adjustDirection") {
    colorRuleMap[data.index].direction = data.direction;
  }
};
addEventListener("message", handleMessage);
