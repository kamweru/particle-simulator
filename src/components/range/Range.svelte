<script>
  import "../styles/range.css";
  export let value = 30;
  export let size = "default";
  export let cssVariables = "";
  let classes = {
    default: "range",
    sizes: {
      sm: "range-sm",
      default: "",
      lg: "range-lg",
    },
  };
</script>

<input
  type="range"
  min="0"
  max="100"
  step="4"
  bind:value
  class={[classes.default, classes.sizes[size]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
/>
