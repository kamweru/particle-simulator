import { onMount, getContext } from "svelte";

export const Rect = (ctx) => {
  //   let canvas = getContext("canvas"),
  //     ctx = canvas.getContext("2d");
  const draw = () => {
    ctx.fillRect(25, 25, 100, 100);
    ctx.clearRect(45, 45, 60, 60);
    ctx.strokeRect(50, 50, 50, 50);
  };
  //   onMount(() => {
  //   ctx = canvas.getContext("2d");
  draw();
  //   });
};
