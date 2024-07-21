import { writable } from "svelte/store";
import { getRandomFromRange, getRandomFloat } from "../utils";
import { Ellipse, Food, Poison } from "../EvolvingParticles";

let canvas, ctx, rAF;

const store = writable({
    numParticles: 5,
    numFood: 15,
    numPoison: 15,
    minMass: 1.5,
    maxMass: 4.5,
    smellRange: 300,
    particles: [],
    food: [],
    poison: [],
  }),
  createOrganisms = () => {
    store.update((state) => {
      state.particles = [...Array(state.numParticles).keys()].map(() => {
        let x = getRandomFromRange(0, canvas.width),
          y = getRandomFromRange(0, canvas.height),
          r = 6,
          avoidance = getRandomFloat(),
          mass =
            state.minMass +
            Math.random() *
              Math.random() *
              Math.random() *
              Math.random() *
              state.maxMass;
        return new Ellipse(x, y, r, avoidance, mass, state.smellRange);
      });
      state.food = [...Array(state.numFood).keys()].map(() => {
        let x = getRandomFromRange(0, canvas.width),
          y = getRandomFromRange(0, canvas.height),
          energy = getRandomFromRange(1, 50);
        return new Food(x, y, energy);
      });
      state.poison = [...Array(state.numPoison).keys()].map(() => {
        let x = getRandomFromRange(0, canvas.width),
          y = getRandomFromRange(0, canvas.height),
          damage = getRandomFromRange(1, 50);
        return new Poison(x, y, damage);
      });
      return state;
    });
  },
  setCanvas = (_canvas) => {
    canvas = _canvas;
    ctx = canvas.getContext("2d");
  },
  updateParticles = () => {
    store.update((state) => {
      state.particles.forEach((particle, i) => {
        if (particle && !particle.dead) {
          particle.makeDecision(state, canvas);
          particle.update();
          particle.draw(ctx);
          particle.evolve(state.particles);
          // if (state.particles.length < state.numParticles) {
          // }
        } else {
          state.particles.splice(i, 1);
        }
      });
      return state;
    });
  },
  updatePoison = () => {
    store.update((state) => {
      state.poison.forEach((poison, i) => {
        if (poison && !poison.dead) {
          poison.draw(ctx);
          poison.update(canvas);
        } else {
          state.poison.splice(i, 1);
        }
      });
      if (state.poison.length < state.numPoison / 2) {
        [...Array(Math.round(state.numPoison / 2) + 2).keys()].map(() => {
          let x = getRandomFromRange(0, canvas.width),
            y = getRandomFromRange(0, canvas.height),
            energy = getRandomFromRange(1, 50);
          state.poison.push(new Poison(x, y, energy));
        });
      }
      return state;
    });
  },
  updateFood = () => {
    store.update((state) => {
      state.food.forEach((food, i) => {
        if (food && !food.dead) {
          food.draw(ctx);
          food.update(canvas);
        } else {
          state.food.splice(state.food.indexOf(food), 1);
        }
      });
      if (state.food.length < state.numFood / 2) {
        [...Array(Math.round(state.numFood / 2) + 2).keys()].map(() => {
          let x = getRandomFromRange(0, canvas.width),
            y = getRandomFromRange(0, canvas.height),
            energy = getRandomFromRange(50, 100);
          state.food.push(new Food(x, y, energy));
        });
      }
      return state;
    });
  },
  updateOrganisms = () => {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#121619";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    updateParticles();
    updatePoison();
    updateFood();
    store.update((state) => {
      if (state.particles.length === 0) {
        cancelAnimationFrame(rAF);
      } else {
        rAF = requestAnimationFrame(updateOrganisms);
      }

      return state;
    });
    console.log("updateOrganisms");
  };

export const organismStore = {
  subscribe: store.subscribe,
  set: (value) => store.set(value),
  update: (fn) => store.update(fn),
  setCanvas,
  createOrganisms,
  updateOrganisms,
};
