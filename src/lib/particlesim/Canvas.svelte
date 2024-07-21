<script>
  import Flex from "../../components/flex/Flex.svelte";
  import { organismStore } from "../stores/EvolvingParticlesStore";
  import { onDestroy, onMount } from "svelte";
  let canvas, ctx, frameId;
  onMount(() => {
    organismStore.setCanvas(canvas);
    // Environment(canvas).step();
  });
  onDestroy(() => {
    if (frameId) cancelAnimationFrame(frameId);
  });
</script>

<Flex>
  <canvas
    width="1080"
    height="1920"
    class="bg:#121619 abs transform-origin:center|90 scale(0.4)"
    bind:this={canvas}
  >
  </canvas>
</Flex>
