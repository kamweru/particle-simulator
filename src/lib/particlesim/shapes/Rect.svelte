<script>
  import { getContext } from "svelte";
  export let x, y, width, height, c;
  const draw = (ctx) => {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, width, height);
  };
  //   console.log(x, y, width, height);
  getContext("canvas").addItem(draw);
</script>
