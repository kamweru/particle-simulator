<script>
  export let cssVariables = "";
  export let size = "default";
  let classes = {
    default: "details",
    sizes: {
      sm: "details-sm",
      default: "",
      lg: "details-lg",
    },
  };
</script>

<details
  class={[classes.default, classes.sizes[size]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
>
  <summary class="summary"> summary</summary>
  <div class="content">content</div>
</details>
