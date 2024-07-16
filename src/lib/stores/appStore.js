import { writable } from "svelte/store";
import { getRandomFloat, getRandomFromRange } from "../utils";

const initialState = {
  forceBased: {
    colors: [
      { name: "lime", hex: "#00ff00" },
      { name: "gold", hex: "#ffd700" },
      { name: "aqua", hex: "#00ffff" },
      { name: "fuchsia", hex: "#ff00ff" },
      { name: "lightpink", hex: "#ffb6c1" },
      { name: "crimson", hex: "#e6194B" },
      { name: "green", hex: "#3cb44b" },
      { name: "blue", hex: "#4363d8" },
      { name: "magenta", hex: "#f759ab" },
      { name: "orange", hex: "#f58231" },
      { name: "purple", hex: "#911eb4" },
      { name: "teal", hex: "#469990" },
      { name: "cyan", hex: "#36cfc9" },
      { name: "beige", hex: "#fffac8" },
      { name: "maroon", hex: "#800000" },
      { name: "mint", hex: "#aaffc3" },
      { name: "olive", hex: "#808000" },
      { name: "red", hex: "#d11a1e" },
      { name: "grey", hex: "#a9a9a9" },
    ].sort((a, b) => a.name.localeCompare(b.name)),
    selectedColors: [],
    timeFactor: 0.375,
    thresholdDistance: 10,
    aggregate: false,
    forceFactor: 0.01,
    minParticles: 150,
    maxParticles: 180,
    particles: [],
    particleMap: {},
    colorRuleMap: [],
  },
};

const app = writable(initialState);

const particle = (x, y, r, c) => {
  return {
    x: x,
    y: y,
    r: r,
    vx: 0,
    vy: 0,
    color: c,
  };
};

export const createParticles = (number, color, canvasWidth, canvasHeight) => {
  let group = Array.from({ length: number }, (v, i) => i).map((item) => {
    let r = getRandomFromRange(2, 3);
    let x = getRandomFromRange(0, canvasWidth - r);
    let y = getRandomFromRange(0, canvasHeight - r);
    return particle(x, y, r, color);
  });
  // console.log(group);
  app.update((state) => {
    state.forceBased.particles = [...state.forceBased.particles, ...group];
    return state;
  });
  return group;
};

export const createParticleMap = (canvasWidth, canvasHeight) =>
  app.update((state) => {
    state.forceBased.selectedColors.map(({ name, hex }) => {
      state.forceBased.particleMap[name] = createParticles(
        getRandomFromRange(
          state.forceBased.minParticles,
          state.forceBased.maxParticles
        ),
        hex,
        canvasWidth,
        canvasHeight
      );
    });
    return state;
  });

export const createColorRuleMap = () =>
  app.update((state) => {
    state.forceBased.colorRuleMap = [
      ...state.forceBased.colorRuleMap,
      ...state.forceBased.selectedColors.flatMap((color1) =>
        state.forceBased.selectedColors.map((color2) => ({
          color1: color1.name,
          color2: color2.name,
          hex1: color1.hex,
          hex2: color2.hex,
          direction: getRandomFloat(),
        }))
      ),
    ];
    return state;
  });

export default {
  subscribe: app.subscribe,
  set: (value) => app.set(value),
  update: (fn) => app.update(fn),
};
