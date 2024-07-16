export const Genetic = (() => {
  let populationSize = 0,
    mutationRate = 0,
    crossoverRate = 0,
    elitism = 0,
    population = [],
    fitnessFunction = null,
    mutationFunction = null,
    crossOverFunction = null,
    afterGenerationFunction = null,
    generation = 0,
    generations = 0;

  const defaultIndividual = () => ({
      chromosome: [Math.random()],
      chromosomeLength: 1,
      fitness: 0,
      mate: () => {},
    }),
    sortFunc = (a, b) => {
      if (b.fitness < a.fitness) {
        return -1;
      }
      if (b.fitness > a.fitness) {
        return 1;
      }
      return 0;
    },
    select1 = {
      Tournament1: () => {
        let n = population.length,
          a = population[Math.floor(Math.random() * n)],
          b = population[Math.floor(Math.random() * n)];
        return a.fitness > b.fitness ? a : b;
      },
      Tournament2: () => {
        let n = population.length,
          a = population[Math.floor(Math.random() * n)],
          b = population[Math.floor(Math.random() * n)],
          c = population[Math.floor(Math.random() * n)],
          best = a.fitness > b.fitness ? a : b;
        return best.fitness > c.fitness ? best : c;
      },
      Fittest: () => (population[0] ? population[0] : null),
      Random: () => population[Math.floor(Math.random() * population.length)],
    };
  return {
    init: (config) => {
      populationSize = config.populationSize;
      mutationRate = config.mutationRate;
      crossoverRate = config.crossoverRate;
      elitism = config.elitism;
      population = [];
      fitnessFunction = config.fitnessFunction;
      mutationFunction = config.mutationFunction;
      crossOverFunction = config.crossOverFunction;
      afterGenerationFunction = config.afterGenerationFunction;
      generations = config.generations;
      generation = 0;
      // Genetic.populate();
    },
    individual: defaultIndividual,
    populate: () => {
      for (let i = 0; i < populationSize; i++) {
        let individual = Genetic.individual();
        population.push(individual);
      }
      Genetic.evaluate();
    },
    evaluate: () => {
      for (let member of population) {
        member.fitness = fitnessFunction(member);
      }
      population.sort(sortFunc);
    },
    selection: () => {
      let selections = Object.keys(select1);
      return select1[
        selections[Math.floor(Math.random() * selections.length)]
      ]();
    },
    crossover: (member1, member2) => {
      return crossOverFunction(member1, member2, crossoverRate);
    },
    mutate: (child) => {
      return mutationFunction(child, mutationRate);
    },
    evolve: () => {
      // if (elitism > 0) {
      //   let newPopulation = population.slice(
      //     0,
      //     Math.round(populationSize * elitism)
      //   );
      //   while (newPopulation.length < populationSize) {
      //     let member1 = Genetic.selection();
      //     let member2 = Genetic.selection();
      //     let child = Genetic.crossover(member1, member2);
      //     child = Genetic.mutate(child);
      //     newPopulation.push(child);
      //   }
      //   population = newPopulation;
      // }
      let breeders = Math.round(population.length / 2),
        newPopulation = population.slice(0, breeders);
      while (newPopulation.length != population.length) {
        let parent1Index = Math.floor(Math.random() * breeders),
          parent2Index = Math.floor(Math.random() * breeders);
        while (parent1Index == parent2Index) {
          parent2Index = Math.floor(Math.random() * breeders);
        }

        let parent1 = newPopulation[parent1Index];
        let parent2 = newPopulation[parent2Index];
        let child = Genetic.crossover(parent1, parent2);
        child = Genetic.mutate(child);
        newPopulation.push(child);
      }
      population = newPopulation;
      // let newPopulation = [];
      // while (newPopulation.length < populationSize) {
      //   let member1 = Genetic.selection();
      //   let member2 = Genetic.selection();
      //   let child = Genetic.crossover(member1, member2);
      //   child = Genetic.mutate(child);
      //   newPopulation.push(child);
      // }
      // population = newPopulation;
    },
    nextGeneration: () => {
      if (generation >= generations) return;
      Genetic.evolve();
      Genetic.evaluate();
      generation++;
      return afterGenerationFunction(generation);
    },
    getBest: () => {
      return population.sort((a, b) => b.fitness - a.fitness)[0];
    },
    getPopulation: () => {
      return population;
    },
    getGeneration: () => {
      return generation;
    },
    addIndividual: (individual) => {
      population.push(individual);
    },
    removeIndividual: (individual) => {
      population = population.filter((ind) => ind !== individual);
    },
  };
})();
