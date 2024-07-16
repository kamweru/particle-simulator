<script>
  import "../styles/list.css";
  export let cssVariables = "";
  export let size = "default";
  let classes = {
    default: "list",
    sizes: {
      sm: "list-sm",
      default: "",
      lg: "list-lg",
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
  <div class="list-header">
    <span class="">List title</span>
  </div>
  <ul class="list-items">
    {#each Array(5) as _, i}
      <li class="list-item">Japanese princess to wed commoner. {i + 1}</li>
    {/each}
  </ul>
  <div class="list-footer">
    <span class="">List footer</span>
  </div>
</div>
