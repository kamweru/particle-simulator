<script>
  import { getContext } from "svelte";
  export let x, y, r, c;
  const draw = (ctx) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  };
  getContext("canvas").addItem(draw);
</script>
