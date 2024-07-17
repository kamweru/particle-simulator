<script>
  import Flex from "../../components/flex/Flex.svelte";
  import { onDestroy, onMount, setContext } from "svelte";
  import { rectStore, updateTest } from "../stores/rectStore";

  let canvas,
    ctx,
    frameId,
    items = new Set();
  onMount(() => {
    ctx = canvas.getContext("2d");
    frameId = requestAnimationFrame(draw);
  });
  onDestroy(() => {
    if (frameId) cancelAnimationFrame(frameId);
  });
  // const updateRects = () => {
  //   if ($rectStore.rects && $rectStore.rects.length > 0) {
  //     $rectStore.rects = $rectStore.rects.map((rect) => {
  //       rect.x += rect.vx;
  //       rect.y += rect.vy;
  //       if (rect.x < 0) rect.vx = Math.abs(rect.vx);
  //       if (rect.y < 0) rect.vy = Math.abs(rect.vy);
  //       if (rect.x > canvas.width) rect.vx = -Math.abs(rect.vx);
  //       if (rect.y > canvas.height) rect.vy = -Math.abs(rect.vy);
  //       return rect;
  //     });
  //   }
  // };
  const addItem = (fn) => {
      items.add(fn);
    },
    draw = () => {
      frameId = requestAnimationFrame(draw);
      // updatePosition();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      items.forEach((fn) => fn(ctx));
      if (
        $rectStore.rects &&
        $rectStore.rects.length > 0 &&
        $rectStore.circles &&
        $rectStore.circles.length > 0
      ) {
        let updates = updateTest($rectStore.rects, $rectStore.circles);
        $rectStore.rects = updates.rects;
        $rectStore.circles = updates.circles;
      }
    };
  setContext("canvas", {
    addItem,
  });
</script>

<Flex>
  <canvas
    width="1080"
    height="1920"
    class="bg:#121619 abs transform-origin:center|90 scale(0.4)"
    bind:this={canvas}
  >
    <slot></slot>
  </canvas>
</Flex>
