import { getRandomFromRange, getRandomFloat } from "./utils.js";
import Vector from "./Vector.js";
// MASS MULTIPLIERS - these values represent the relationship between the ellipse's properties and its mass
let ENERGY = 10,
  SMELL_RANGE = 400,
  MAX_SPEED = 0.5,
  LENGTH = 20,
  MAX_FORCE = 0.1;
class Ellipse {
  constructor(x, y, r, avoidance, mass, smellRange) {
    this.mass = mass > 0 ? mass : -mass;
    this.position = new Vector(x, y);
    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);
    this.wandering = new Vector(0.2, 0.2);
    this.maxForce = MAX_FORCE / (this.mass * this.mass);
    this.maxSpeed = MAX_SPEED * this.mass;
    this.length = mass * LENGTH;
    this.base = this.length * 0.5;
    this.avoidance = avoidance;
    //    > 0 ? avoidance : -avoidance;
    this.r = r;
    this.c = 52;
    this.age = 1;
    this.energy = this.mass * ENERGY;
    this.smellRange = this.mass * smellRange;
    this.dead = false; // ellipse is alive initially
    this.HALF_PI = Math.PI * 0.5;
    this.fitness = 0;
  }
  draw(ctx) {
    ctx.fillStyle = `hsl(${Math.round(this.c + this.energy)}, 100%, 50%)`;
    ctx.strokeStyle = `hsl(${this.c}, 100%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    if (this.velocity.magnitude() < 3) {
      this.velocity.setMagnitude(5);
    }
    this.position.add(this.velocity);
    this.acceleration.limit(this.maxForce);
    this.energy -=
      (this.acceleration.magnitude() * this.mass * this.velocity.magnitude()) /
      10;
    // console.log(
    //   this.acceleration.magnitude() * this.mass * this.velocity.magnitude()
    // );
    if (this.energy > 100) {
      this.energy = 100;
    }
    // this.energy -=
    //   (this.acceleration.magnitude() *
    //     this.mass *
    //     // this.age *
    //     this.velocity.magnitude()) /
    //   100;
    if (this.energy < 0) {
      this.dead = true; // ellipse dies if energy is 0 or less
    }
    // this.calculateFitness();
    // console.log(this.energy);
    // reset acceleration
    this.acceleration.multiply(0);
  }
  makeDecision(environment, canvas) {
    let nearbyFood = this.look(environment.food, this.smellRange, Math.PI * 2);
    let nearbyPoison = this.look(
      environment.poison,
      this.smellRange,
      Math.PI * 2
    );
    // console.log(environment.food.length);
    nearbyFood.forEach((food) => {
      if (food && !food.dead) {
        this.follow(food.position, food.r);
        if (this.position.dist(food.position) < food.r + this.r) {
          food.eatenBy(this);
        }
      }
    });
    // if (nearbyPoison.length > 0) {
    //   this.avoidance < 0.0001
    //     ? this.avoid(nearbyPoison, 20)
    // :
    nearbyPoison.forEach((poison) => {
      if (poison && !poison.dead) {
        this.follow(poison.position, poison.r);
        if (
          this.position.dist(poison.position) <
          poison.r + this.r + this.avoidance
        ) {
          poison.eatenBy(this);
        }
        // else {
        //   let dist = this.position.dist(poison.position);
        //   let avoidForce = poison.position
        //     .copy()
        //     .subtract(this.position)
        //     .multiply(-10);
        //   if (dist < this.avoidance * this.r) {
        //     this.applyForce(avoidForce);
        //   }
        // }
      }
    });
    // }
    // this.evolve(environment.particles);
    this.boundaries(canvas);
    // this.mutate();
    // this.limitToCanvas(canvas);
  }
  look(arr, radius, angle) {
    let neighbors = [];
    for (let i in arr) {
      if (arr[i] != null && arr[i] != this) {
        let diff = this.position.copy().subtract(arr[i].position),
          dist = this.position.dist(arr[i].position),
          a = this.velocity.angleBetween(diff);
        if (dist < radius && (a < angle / 2 || a > Math.PI - angle / 2)) {
          neighbors.push(arr[i]);
        }
      }
    }
    return neighbors;
  }
  follow(target, arrive) {
    var dest = target.copy().subtract(this.position);
    var d = dest.dist(this.position);
    if (d < arrive) dest.setMagnitude((d / arrive) * this.maxSpeed);
    else dest.setMagnitude(this.maxSpeed);
    this.applyForce(dest.limit(this.maxForce * 2));
  }
  bite(target) {
    this.follow(target.position, target.r);
    if (this.position.dist(target.position) < target.r + this.r) {
      this.energy += target.energy;
      target.energy = 0;
      target.dead = true;
    }
  }
  avoid(arr, distance) {
    for (let i in arr) {
      let dist = this.position.dist(arr[i].position);
      let avoidForce = arr[i].position
        .copy()
        .subtract(this.position)
        .multiply(-10);
      if (dist < distance) {
        this.applyForce(avoidForce);
      }
    }
  }
  calculateFitness() {
    let score = 0;
    if (this.energy > 0) {
      score = this.energy / 100;
    }
    this.fitness = score;
  }
  evolve(population) {
    this.calculateFitness();
    let sortedPopulation = [...population].sort(
        (a, b) => b.fitness - a.fitness
      ),
      breedersLength = Math.round(sortedPopulation.length / 2),
      breeders = sortedPopulation.slice(0, breedersLength),
      crossoverRate = 0.989,
      parent1Index = Math.floor(Math.random() * breeders.length),
      parent2Index = Math.floor(Math.random() * breeders.length);
    while (parent1Index == parent2Index) {
      parent2Index = Math.floor(Math.random() * breeders.length);
    }
    // console.log(
    //   "    if (getRandomFloat() > crossoverRate) {",
    //   getRandomFloat()
    // );
    // for (let i = 0; i < breeders.length; i++) {
    let parent1 = breeders[parent1Index],
      parent2 = breeders[parent2Index];
    if (this === parent1 || this === parent2) {
      //   console.log("this === parent1", this, parent1, parent2);
      if (getRandomFloat() > crossoverRate) {
        let child = this.mate(parent1, parent2);
        population.push(child);
      }
    }
    // }
  }
  mate(parent1, parent2) {
    let position = parent1.position.copy().lerp(parent2.position, 0.5),
      mass = (parent1.mass + parent2.mass) / 2,
      r = (parent1.r + parent2.r) / 2,
      avoidance = (parent1.avoidance + parent2.avoidance) / 2,
      smellRange = (parent1.smellRange + parent2.smellRange) / 2,
      mutationRate = 0.001,
      x = getRandomFloat(),
      y = getRandomFloat(),
      massIncrement = getRandomFloat(),
      comparator = getRandomFloat();
    x = x < 0 ? -x : x;
    y = y < 0 ? -y : y;
    // massIncrement = massIncrement < 0 ? -massIncrement : massIncrement;

    position =
      comparator < mutationRate ? position.add(new Vector(x, y)) : position;
    mass += comparator < mutationRate ? massIncrement : 0;
    r += comparator < mutationRate ? getRandomFromRange(1, 6) : 0;
    if (r > 12) r = 12;
    if (smellRange > 400) smellRange = 400;
    avoidance += comparator < mutationRate ? getRandomFloat() : 0;
    return new Ellipse(position.x, position.y, r, avoidance, mass, smellRange);
  }
  limitToCanvas(environment) {
    const buffer = 50;
    if (this.position.x < buffer) {
      //   this.applyForce(new Vector(this.maxForce * 3, 0));
      //   this.applyForce(new Vector(this.maxForce * 3, 0));
      this.position.x = -this.position.x;
      this.velocity.x *= -1;
    }
    if (this.position.x > environment.width - buffer) {
      //   this.applyForce(new Vector(-this.maxForce * 3, 0));
      this.position.x = 2 * environment.width - this.position.x;
      this.velocity.x *= -1;
    }
    if (this.position.y < buffer) {
      //   this.applyForce(new Vector(0, this.maxForce * 3));
      this.position.y = -this.position.y;
      this.velocity.y *= -1;
    }
    if (this.position.y > environment.height - buffer) {
      //   this.applyForce(new Vector(0, -this.maxForce * 3));
      this.position.y = 2 * environment.height - this.position.y;
      this.velocity.y *= -1;
    }
  }
  boundaries(environment) {
    const buffer = 50; // Buffer distance from the canvas edges

    if (this.position.x < buffer) {
      this.applyForce(new Vector(this.maxForce * 3, 0));
    }
    if (this.position.x > environment.width - buffer) {
      this.applyForce(new Vector(-this.maxForce * 3, 0));
    }
    if (this.position.y < buffer) {
      this.applyForce(new Vector(0, this.maxForce * 3));
    }
    if (this.position.y > environment.height - buffer) {
      this.applyForce(new Vector(0, -this.maxForce * 3));
    }
  }
  applyForce(f) {
    this.acceleration.add(f);
  }
}

class Food {
  constructor(x, y, energy) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(getRandomFloat(), getRandomFloat());
    this.energy = energy;
    this.dead = false;
    this.r = 6;
    this.c = `hsl(126, 100%, 50%)`;
  }
  draw(ctx) {
    if (this.dead) return;
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  update(environment) {
    this.position.add(this.velocity);
    if (
      this.position.x > environment.width ||
      this.position.x < 0 ||
      this.position.y > environment.height ||
      this.position.y < 0
    ) {
      this.energy = 0;
      this.dead = true;
    }
    // return environment;
  }

  eatenBy(organism) {
    organism.energy += this.energy;
    this.energy = 0;
    this.dead = true;
  }
}
class Poison {
  constructor(x, y, damage) {
    this.position = new Vector(x, y);
    this.velocity = new Vector(getRandomFloat(), getRandomFloat());
    this.damage = damage;
    this.dead = false;
    this.r = 6;
    this.c = `hsl(359, 100%, 50%)`;
  }
  draw(ctx) {
    if (this.dead) return;
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }
  update(environment) {
    this.position.add(this.velocity);
    if (
      this.position.x > environment.width ||
      this.position.x < 0 ||
      this.position.y > environment.height ||
      this.position.y < 0
    ) {
      this.energy = 0;
      this.dead = true;
    }
  }

  eatenBy(organism) {
    organism.energy -= this.damage;
    this.damage = 0;
    this.dead = true;
  }
}

export const Environment = (canvas) => {
  // POPULATION SETUP
  let POPULATION = 20,
    MIN_MASS = 0.5,
    MAX_MASS = 3.5,
    FOOD_RATIO = 1.5,
    POISON_RATIO = 1.5;
  const ctx = canvas.getContext("2d"),
    // info = document.getElementById("info"),
    environment = {
      width: canvas.width,
      height: canvas.height,
      population: [],
      food: [],
      poison: [],
    };

  // populate the environment
  environment.population = [...Array(POPULATION).keys()].map(() => {
    let x = getRandomFromRange(0, environment.width),
      y = getRandomFromRange(0, environment.height),
      r = getRandomFromRange(6, 12),
      avoidance = getRandomFloat(),
      mass =
        MIN_MASS +
        Math.random() *
          Math.random() *
          Math.random() *
          Math.random() *
          MAX_MASS,
      ellipse = new Ellipse(x, y, r, avoidance, mass);
    return ellipse;
  });
  // add food to the environment
  environment.food = [...Array(Math.floor(POPULATION * FOOD_RATIO)).keys()].map(
    () => {
      let x = getRandomFromRange(0, environment.width),
        y = getRandomFromRange(0, environment.height),
        energy = getRandomFromRange(1, 120),
        food = new Food(x, y, energy);
      return food;
    }
  );
  // add poison to the environment
  environment.poison = [
    ...Array(Math.floor(POPULATION * POISON_RATIO)).keys(),
  ].map(() => {
    let x = getRandomFromRange(0, environment.width),
      y = getRandomFromRange(0, environment.height),
      damage = getRandomFromRange(1, 60),
      poison = new Poison(x, y, damage);
    return poison;
  });

  const step = () => {
    // clear the screen (with a fade)
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "#121619";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    // info.innerHTML = `Population: ${environment.population.length} Food ${environment.food.length} Poison ${environment.poison.length}`;
    // update the food
    environment.food.forEach((food, i) => {
      if (food && !food.dead) {
        food.draw(ctx);
        food.update(environment);
      } else {
        environment.food[i] = null;
        if (Math.random() > 0.0001) {
          environment.food[i] = new Food(
            getRandomFromRange(0, environment.width),
            getRandomFromRange(0, environment.height),
            getRandomFromRange(1, 120)
          );
        }
        // } else {
        //   environment.food.splice(i, 1);
        // }
      }
    });
    // update the poison
    environment.poison.forEach((poison, i) => {
      if (!poison.dead) {
        poison.draw(ctx);
        poison.update(environment);
      } else {
        if (Math.random() > 0.0001) {
          environment.poison[i] = new Poison(
            getRandomFromRange(0, environment.width),
            getRandomFromRange(0, environment.height),
            getRandomFromRange(60, 120)
          );
        } else {
          environment.poison.splice(environment.poison.indexOf(poison), 1);
        }
      }
    });
    // update the population
    environment.population.forEach((ellipse, i) => {
      if (!ellipse.dead) {
        ellipse.makeDecision(environment);
        ellipse.update();
        ellipse.draw(ctx);
      } else {
        environment.population.splice(i, 1);
      }
    });
    // console.log("step called");
    requestAnimationFrame(step);
  };

  return {
    step,
  };
};

export { Ellipse, Food, Poison };
