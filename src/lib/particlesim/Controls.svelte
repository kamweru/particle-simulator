<script>
  import Button from "../../components/button/Button.svelte";
  import Field from "../../components/field/Field.svelte";
  import Flex from "../../components/flex/Flex.svelte";
  import Range from "../../components/range/Range.svelte";
  import { organismStore } from "../stores/EvolvingParticlesStore";
  const start = () => {
    organismStore.createOrganisms();
    organismStore.updateOrganisms();
  };
</script>

<div class="bg:gray-96 col-3 padding-sm">
  <Flex direction="column" gap="sm">
    <!-- <Flex gap="sm" justify="spaceBetween">
      <div class="flex:1 flex flex:1>*">
        <Range bind:value={$organismStore.numParticles}></Range>
      </div>
      <span>{$organismStore.numParticles}</span>
    </Flex> -->
    <Field>
      <span slot="label">Particles</span>
      <input
        type="number"
        slot="input"
        class="input input-outline input-sm"
        bind:value={$organismStore.numParticles}
        name=""
        id=""
      />
    </Field>
    <Field>
      <span slot="label">Particle Smell Range</span>
      <input
        type="number"
        slot="input"
        class="input input-outline input-sm"
        bind:value={$organismStore.smellRange}
        step="20"
        min="0"
        max="1000"
        name=""
        id=""
      />
    </Field>
    <Field>
      <span slot="label">Food</span>
      <input
        type="number"
        slot="input"
        class="input input-outline input-sm"
        bind:value={$organismStore.numFood}
        name=""
        id=""
      />
    </Field>
    <Field>
      <span slot="label">Poison</span>
      <input
        type="number"
        slot="input"
        class="input input-outline input-sm"
        bind:value={$organismStore.numPoison}
        name=""
        id=""
      />
    </Field>
    <!-- <Button buttonText="add organisms" on:click={organismStore.createOrganisms}
    ></Button> -->
    <Button type="fill" size="sm" buttonText="RUN" on:click={start}></Button>
    <Flex direction="column" gap="sm">
      {#if $organismStore.particles && $organismStore.particles.length >= 0}
        Organisms: {$organismStore.particles.length}
        <!-- {#each $organismStore.particles as particle, index}
          <Flex>
            <div>Particle {index + 1}</div>
            <div>{particle.smellRange.toFixed(2)}</div>
          </Flex>
        {/each} -->
      {/if}
      {#if $organismStore.food && $organismStore.food.length >= 0}
        <div>
          Food: {$organismStore.food.length}
        </div>
      {/if}
      {#if $organismStore.poison && $organismStore.poison.length >= 0}
        <div>
          Poison: {$organismStore.poison.length}
        </div>
      {/if}
      <!--    {#if $rectStore.collisions && Object.keys($rectStore.collisions).length >= 0}
        {#each Object.keys($rectStore.collisions) as key}
          <Flex>
            <div>{key}</div>
            <div>{$rectStore.collisions[key]}</div>
          </Flex>
        {/each}
      {/if} -->
    </Flex>
  </Flex>
</div>
