<script>
  import "../styles/rate.css";
  export let rating = 0;
  export let size = "default";
  export let cssVariables = "";
  let classes = {
    default: "rate",
    sizes: {
      sm: "rate-sm",
      default: "",
      lg: "rate-lg",
    },
  };
</script>

<div
  class={[classes.default, classes.sizes[size]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
>
  {#each Array(5) as _, i}
    <input
      type="radio"
      id="rate-{5 - i}"
      class="rate-input"
      value={5 - i}
      bind:group={rating}
    />
    <label for="rate-{5 - i}" class="rate-label"> ★ </label>
  {/each}
</div>
