<script>
  import { getContext, onMount } from "svelte";
  import Canvas from "../lib/particlesim/Canvas.svelte";
  import Rect from "../lib/particlesim/shapes/Rect.svelte";
  import Controls from "../lib/particlesim/Controls.svelte";
  import { rectStore } from "../lib/stores/rectStore";
  import Circle from "../lib/particlesim/shapes/Circle.svelte";
  // let canvasContext = getContext("canvas");
  // onMount(() => {
  //   canvasContext.addItem(updateRects);
  // });
  // const updateRects = () => {
  //   $rectStore.rects = $rectStore.rects.map((rect) => {
  //     rect.x += rect.vx;
  //     rect.y += rect.vy;
  //     // if (rect.x < 0) rect.vx = Math.abs(rect.vx);
  //     // if (rect.y < 0) rect.vy = Math.abs(rect.vy);
  //     // if (rect.x > canvas.width) rect.vx = -Math.abs(rect.vx);
  //     // if (rect.y > canvas.height) rect.vy = -Math.abs(rect.vy);
  //     return rect;
  //   });
  // };
</script>

<div
  class="h:full flex flex:column rel background-size:10|10 background-image:repeating-linear-gradient(45deg,gray-30|0,gray-30|1px,gray-16|0,gray-16|50%) overflow:hidden"
>
  <div class="flex flex:1">
    <Controls></Controls>
    <Canvas>
      {#if $rectStore.rects && $rectStore.rects.length > 0}
        {#each $rectStore.rects as { x, y, width, height, c }}
          <Rect {x} {y} {width} {height} {c}></Rect>
        {/each}
      {/if}
      {#if $rectStore.circles && $rectStore.circles.length > 0}
        {#each $rectStore.circles as { x, y, r, c }}
          <Circle {x} {y} {r} {c}></Circle>
        {/each}
      {/if}
    </Canvas>
  </div>
</div>
