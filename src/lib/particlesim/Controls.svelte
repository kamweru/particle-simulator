<script>
  import Button from "../../components/button/Button.svelte";
  import Field from "../../components/field/Field.svelte";
  import Flex from "../../components/flex/Flex.svelte";
  import Input from "../../components/input/Input.svelte";
  import Range from "../../components/range/Range.svelte";
  import { rectStore } from "../stores/rectStore";
  import { getRandomFromRange, uuid } from "../utils";
  let canvas = { width: 1080, height: 1920 },
    cirlces = 50;
  const addRect = () => {
      if ($rectStore.rects && $rectStore.rects.length > 0) {
        $rectStore.rects = [
          ...$rectStore.rects,
          {
            x: getRandomFromRange(0, canvas.width),
            y: getRandomFromRange(0, canvas.height),
            width: 100,
            height: 100,
            vx: getRandomFromRange(-5, 5),
            vy: getRandomFromRange(-5, 5),
            id: uuid(8),
            c: `rgb(${getRandomFromRange(0, 255)},${getRandomFromRange(
              0,
              255
            )},${getRandomFromRange(0, 255)})`,
          },
        ];
      } else {
        $rectStore.rects = [
          {
            x: getRandomFromRange(0, canvas.width),
            y: getRandomFromRange(0, canvas.height),
            width: 100,
            height: 100,
            vx: getRandomFromRange(-5, 5),
            vy: getRandomFromRange(-5, 5),
            id: uuid(8),
            c: `rgb(${getRandomFromRange(0, 255)},${getRandomFromRange(
              0,
              255
            )},${getRandomFromRange(0, 255)})`,
          },
        ];
      }
    },
    addCircles = () => {
      $rectStore.circles = [...Array(parseInt(cirlces)).keys()].map((i) => ({
        x: getRandomFromRange(0, canvas.width),
        y: getRandomFromRange(0, canvas.height),
        r: getRandomFromRange(5, 7),
        c: `hsl(${getRandomFromRange(0, 360)}, 100%, 50%)`,
        id: uuid(8),
      }));
    };
</script>

<div class="bg:crimson-90 padding-sm">
  <Flex direction="column">
    <Range></Range>
    <Field>
      <span slot="label">label</span>
      <Input slot="input" bind:value={cirlces}></Input>
    </Field>
    <Button buttonText="add rectangle" on:click={addRect}></Button>
    <Button buttonText="add circles" on:click={addCircles}></Button>
    <Flex direction="column">
      {#if $rectStore.circles && $rectStore.circles.length > 0}
        <div>
          Remaining: {$rectStore.circles.length}
        </div>
      {/if}
      {#if $rectStore.collisions && Object.keys($rectStore.collisions).length > 0}
        {#each Object.keys($rectStore.collisions) as key}
          <Flex>
            <div>{key}</div>
            <div>{$rectStore.collisions[key]}</div>
          </Flex>
        {/each}
      {/if}
    </Flex>
  </Flex>
</div>
