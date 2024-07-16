<script>
  import Flex from "../flex/Flex.svelte";
  import { ParticleSimulation } from "../../lib/particleSimulation";
  import { Genetic } from "../../lib/genetic";
  import { Orgnism } from "../../lib/organism";
  import { onMount } from "svelte";

  let canvas,
    ctx,
    mapSize = 200,
    chromosomeLength = 100,
    populationSize = 200,
    circleRadius = 50,
    circleCenter = [100, 100];
  const distance = (pointA, pointB) => {
    return Math.sqrt(
      Math.pow(pointB[0] - pointA[0], 2) + Math.pow(pointB[1] - pointA[1], 2)
    );
  };
  onMount(() => {
    ctx = canvas.getContext("2d");
    Genetic.init({
      mutationRate: 0.02,
      elitism: 0.5,
      crossOverRate: 0.02,
      populationSize,
      generations: 2000,
      fitnessFunction: (member) => {
        let fitness = 0;
        for (let i = 0; i < member.chromosomeLength; i += 2) {
          let x = member.chromosome[i],
            y = member.chromosome[i + 1],
            distanceToCenter = distance([x, y], circleCenter);
          fitness += Math.abs(circleRadius - distanceToCenter);
        }
        return -fitness;
      },
      mutationFunction: (child, mutationRate) => {
        if (!child.chromosome) {
          throw new Error("Chromosome not found in child");
        }
        while (Math.random() < mutationRate) {
          let index = Math.floor(Math.random() * chromosomeLength);
          child.chromosome[index] = Math.random() * mapSize;
        }

        return child;
      },
      crossOverFunction: (parent1, parent2, crossoverRate) => {
        if (parent1.chromosome.length !== parent2.chromosome.length) {
          throw new Error("Parent chromosomes must have the same length");
        }
        const chromosomeLength = parent1.chromosome.length;
        const child = {
          chromosome: new Array(chromosomeLength),
          fitness: 0,
          chromosomeLength,
        };

        for (let i = 0; i < chromosomeLength; i++) {
          if (i < Math.floor(chromosomeLength * crossoverRate)) {
            child.chromosome[i] = parent2.chromosome[i];
          } else {
            child.chromosome[i] = parent1.chromosome[i];
          }
        }

        return child;
      },
      afterGenerationFunction: (generation) => {
        let best = Genetic.getBest(),
          points = best.chromosome;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.font = "48px serif";
        const p = new Path2D("M10 10 h 80 v 80 h -80 Z");
        p.bezierCurveTo(100, 210, 200, 210, 200, 100);
        // ctx.fill(p);
        ctx.fillRect(250, 250, 100, 100);
        ctx.fillText(generation, 230, 220);
        for (let i = 0; i < points.length; i += 2) {
          let x = points[i],
            y = points[i + 1];
          ctx.beginPath();
          ctx.fillRect(x, y, 2, 2);
          ctx.stroke();
        }
        setTimeout(() => {
          Genetic.nextGeneration();
        }, 50);
      },
    });
    Genetic.individual = () => {
      let points = [];
      for (let i = 0; i < chromosomeLength; i++) {
        points.push(Math.random() * mapSize);
      }
      return {
        fitness: 0,
        chromosome: points,
        chromosomeLength,
        mate: () => {},
      };
    };
    Genetic.populate();
  });
</script>

<Flex>
  <button
    class="button button-fill button-info"
    on:click={() => Genetic.nextGeneration()}>start</button
  >
  <canvas
    width="1080"
    height="1920"
    class="bg:#121619 abs transform-origin:center|90 scale(0.4)"
    bind:this={canvas}
  />
</Flex>
