<script>
  export let cssVariables = "";
  export let size = "default";
  let classes = {
    default: "collapse",
    sizes: {
      sm: "collapse-sm",
      default: "",
      lg: "collapse-lg",
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
  <slot></slot>
</div>
