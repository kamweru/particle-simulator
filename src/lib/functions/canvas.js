import { onMount } from "svelte";

export const Rect = (canvas) => {
  let ctx;
  const draw = () => {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  };
  onMount(() => {
    ctx = canvas.getContext("2d");
    draw();
  });
};
