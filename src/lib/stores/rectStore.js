import { writable } from "svelte/store";
import { get } from "svelte/store";

import { getRandomFromRange, getRandomFloat, uuid, range } from "../utils";
const rect = (x, y, w, h) => ({
    x: x,
    y: y,
    width: w,
    height: h,
    id: uuid(8),
    c: `hsl(${getRandomFromRange(0, 360)}, 100%, 50%)`,
    vy: 0,
    vx: 5,
  }),
  canvas = { width: 1080, height: 1920 },
  yoff = 125,
  start = 25,
  width = 100,
  store = writable({});
export const collisionCount = (rectangle, particles) => {
  let collisions = 0;

  // Calculate the right edge of the rectangle
  const rectRight = rectangle.x + rectangle.width,
    bottomRight = rectRight + rectangle.height;

  let rectangleTopRight = rectangle.x + rectangle.width;
  let rectangleBottomRight = rectangle.y + rectangle.height + rectangle.width;
  //   console.log(
  //     range(rectRight, rectangle.y + rectangle.height + rectangle.width)
  //   );
  // Check each particle
  if (particles && particles.length > 0) {
    for (const particle of particles) {
      // if (
      //   particle.x + particle.radius >= rectangle.x + rectangle.width &&
      //     particle.x - particle.radius <= rectangle.x + rectangle.width
      //     &&
      //   particle.y + particle.radius >= rectangle.y &&
      //   particle.y - particle.radius <= rectangle.y + rectangle.height
      // ) {
      //   collisions++;
      // }
      let particleTop = particle.y - particle.r;
      let particleBottom = particle.y + particle.r;
      let particleLeft = particle.x - particle.r;
      let particleRight = particle.x + particle.r;
      // console.log(particle);

      if (
        particleLeft < rectangleTopRight &&
        particleRight > rectangleTopRight &&
        particleTop < rectangleBottomRight &&
        particleBottom > rectangleTopRight
      ) {
        store.update((state) => {
          state.circles = state.circles.filter((c) => c.id !== particle.id);
          return state;
        });
        collisions++;
      }
      // if (
      //   particle.x + particle.radius >= rectRight &&
      //   particle.x + particle.radius <= bottomRight
      // ) {
      //   collisions++;
      // }
      // Calculate the distance between the particle center and the right edge of the rectangle
      // const distX = Math.abs(particle.x - rectRight);
      // const distY = Math.abs(particle.y - rectangle.y);

      // // Check if the particle is within the rectangle's height
      // if (distY <= rectangle.height / 2) {
      //   // Check if the particle's center is within the rectangle's width
      //   if (distX <= rectangle.width / 2 && particle.x >= rectangle.x) {
      //     collisions++;
      //   }

      // }
    }
  }

  return collisions;
};

export const rectStore = {
  subscribe: store.subscribe,
  set: (value) => store.set(value),
  update: (fn) => store.update(fn),
};

export const addRect = () =>
  store.update((state) => {
    let x = getRandomFromRange(0, canvas.width);
    let y = getRandomFromRange(0, canvas.height);
    if (state && state.rects && state.rects.length > 0) {
      state.rects = [...state.rects, rect(x, y, width, width)];
    } else {
      state.rects = [rect(x, y, width, width)];
    }

    return state;
  });

export const updatePosition = () => {
  store.update((state) => {
    if (state && state.rects && state.rects.length > 0) {
      state.rects.forEach((rect) => {
        rect.x += rect.vx;
        rect.y += rect.vy;

        let rectangleTopRight = rect.x + rect.width;
        let rectangleBottomRight = rect.y + rect.height;
        if (state.circles && state.circles.length > 0) {
          state.circles.forEach((circle) => {
            let collisions = 0;
            let circleTop = circle.y - circle.r;
            let circleBottom = circle.y + circle.r;
            let circleLeft = circle.x - circle.r;
            let circleRight = circle.x + circle.r;

            if (
              circleLeft < rectangleTopRight &&
              circleRight > rectangleTopRight &&
              circleTop < rectangleBottomRight &&
              circleBottom > rectangleTopRight &&
              circleTop > rectangleTopRight &&
              circleTop < rectangleBottomRight &&
              circleBottom > rectangleTopRight &&
              circleBottom < rectangleBottomRight
            ) {
              //   console.log(
              //     circleTop,
              //     circleBottom,
              //     circleLeft,
              //     circleRight,
              //     rectangleTopRight,
              //     rectangleBottomRight
              //   );
              collisions++;
              // console.log(collisions);
              if (collisions > 0) {
                state.circles = state.circles.filter((c) => c.id !== circle.id);
              }
            }
            if (!state.collisions) {
              state.collisions = {
                [rect.id]: collisions,
              };
            } else {
              if (!state.collisions[rect.id]) {
                state.collisions[rect.id] = collisions;
              } else {
                state.collisions[rect.id] += collisions;
              }
            }
          });
        }
        // if (rect.x < 0) {
        //   rect.x += canvas.width;
        // } else if (rect.x > canvas.width) {
        //   rect.x -= canvas.width;
        // }

        // if (rect.y < 0) {
        //   rect.y += canvas.height;
        // } else if (rect.y > canvas.height) {
        //   rect.y -= canvas.height;
        // }
        if (rect.x < 0) {
          rect.x = canvas.width - rect.width; // Wrap to opposite side with full width
        } else if (rect.x + rect.width > canvas.width) {
          rect.x = 0; // Wrap to opposite side at x=0
        }

        if (rect.y < 0) {
          rect.y = canvas.height - rect.height; // Wrap to opposite side with full height
        } else if (rect.y + rect.height > canvas.height) {
          rect.y = 0; // Wrap to opposite side at y=0
        }
      });
    }
    return state;
  });
};

export const addCircles = () =>
  store.update((state) => {
    state.circles = [...Array(50).keys()].map((i) => ({
      x: getRandomFromRange(0, canvas.width),
      y: getRandomFromRange(0, canvas.height),
      r: getRandomFromRange(5, 7),
      c: `hsl(${getRandomFromRange(0, 360)}, 100%, 50%)`,
      id: uuid(8),
    }));
    return state;
  });
function colliding(circle, rect) {
  var distX = Math.abs(circle.x - rect.x - rect.width / 2);
  var distY = Math.abs(circle.y - rect.y - rect.height / 2);

  if (distX > rect.width / 2 + circle.r) {
    return false;
  }
  if (distY > rect.height / 2 + circle.r) {
    return false;
  }

  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.height / 2) {
    return true;
  }

  var dx = distX - rect.width / 2;
  var dy = distY - rect.height / 2;
  return dx * dx + dy * dy <= circle.r * circle.r;
}
export const updateTest = (rectangles, circles) => {
  let resultRect, resultCircle;
  if (rectangles && rectangles.length > 0) {
    // console.log("circles", circles);
    resultRect = rectangles.map((rect) => {
      rect.x += rect.vx;
      rect.y += rect.vy;
      if (circles && circles.length > 0) {
        let items = [];
        circles.map((circle) => {
          let collisions = 0;
          if (colliding(circle, rect)) {
            collisions++;
          }
          store.update((state) => {
            if (!state.collisions) {
              state.collisions = {
                [rect.id]: collisions,
              };
            } else {
              if (!state.collisions[rect.id]) {
                state.collisions[rect.id] = collisions;
              } else {
                state.collisions[rect.id] += collisions;
              }
            }
            return state;
          });
          //   return circle;
          if (collisions <= 0) {
            items.push(circle);
          }
          //   let circleTop = circle.y - circle.r;
          //   let circleBottom = circle.y + circle.r;
          //   let circleLeft = circle.x - circle.r;
          //   let circleRight = circle.x + circle.r;
          //   if (
          //     circleLeft < rectangleTopRight &&
          //     circleRight > rectangleTopRight &&
          //     circleTop < rectangleBottomRight &&
          //     circleBottom > rectangleTopRight &&
          //     circleTop > rectangleTopRight &&
          //     circleTop < rectangleBottomRight &&
          //     circleBottom > rectangleTopRight &&
          //     circleBottom < rectangleBottomRight
          //   ) {
          //     collisions++;
          //   }
          //   console.log(collisions);
        });
        resultCircle = items;
      }

      if (rect.x < 0) {
        rect.x = canvas.width - rect.width; // Wrap to opposite side with full width
      } else if (rect.x + rect.width > canvas.width) {
        rect.x = 0; // Wrap to opposite side at x=0
      }
      if (rect.y < 0) {
        rect.y = canvas.height - rect.height; // Wrap to opposite side with full height
      } else if (rect.y + rect.height > canvas.height) {
        rect.y = 0; // Wrap to opposite side at y=0
      }
      return rect;
    });
  }
  return { rects: resultRect, circles: resultCircle };
};
