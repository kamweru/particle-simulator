<script>
  export let type = "default";
  export let cssVariables = "";
  let classes = {
      default: "divider",
      types: {
        default: "",
        vertical: "divider-vertical",
        textCenter: "divider-with-text",
        textRight: "divider-with-text-right",
        textLeft: "divider-with-text-left",
      },
    },
    items = 3;
</script>

{#if type === "vertical"}
  {#each Array(items) as _, i}
    item {i + 1}{#if i < items - 1}
      <div
        class={[classes.default, classes.types[type]]
          .join(" ")
          .trim()
          .replace(/\s+/g, " ")}
        style={cssVariables}
      ></div>
    {/if}
  {/each}
{:else}
  <div
    class={[classes.default, classes.types[type]]
      .join(" ")
      .trim()
      .replace(/\s+/g, " ")}
    style={cssVariables}
  >
    {#if ["textCenter", "textRight", "textLeft"].includes(type)}
      <div class="divider-text"><slot>Divider Text</slot></div>
    {/if}
  </div>
{/if}
