<script>
  import "../styles/badge.css";
  export let cssVariables = "";
  export let type = "dot";
  export let size = "md";
  export let content = "box";
  export let badgeCount = 12;
  export let badgeContent = "text content";
  let classes = {
    default: "badge",
    types: {
      dot: "badge-dot",
      withNumber: "",
    },
    sizes: {
      sm: "badge-count-sm",
      md: "badge-count-md",
    },
    content: {
      box: "",
      text: "badge-with-text",
    },
  };
</script>

<div class="badge" style={cssVariables}>
  <span class="badge-content {classes.content[content]}">
    {#if content === "text"}
      {badgeContent}
    {/if}
  </span>
  <sup class="badge-count {classes.types[type]} {classes.sizes[size]}">
    {#if type === "withNumber"}
      <span> {badgeCount} </span>
    {/if}
  </sup>
</div>
