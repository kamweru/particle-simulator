<script>
  import Canvas from "../components/particlesim/Canvas.svelte";
  import Controls from "../components/particlesim/Controls.svelte";
</script>

<div
  class="h:full flex flex:column rel background-size:10|10 background-image:repeating-linear-gradient(45deg,gray-30|0,gray-30|1px,gray-16|0,gray-16|50%) overflow:hidden"
>
  <div class="flex flex:1">
    <Controls></Controls>
    <Canvas></Canvas>
  </div>
</div>
