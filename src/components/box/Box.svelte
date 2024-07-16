<script>
  export let root = undefined,
    element = undefined;
  let isHTMLElement;
  let isComponent;
  $: {
    isHTMLElement = root && typeof root === "string";
    isComponent = root && typeof root === "function";
  }
</script>

{#if isHTMLElement}
  <svelte:element
    this={root}
    bind:this={element}
    on:click
    role={$$restProps.role}
    {...$$restProps}
  >
    <slot></slot>
  </svelte:element>
{:else if isComponent && typeof root !== "string"}
  <svelte:component
    this={root}
    bind:this={element}
    on:click
    role={$$restProps.role}
    {...$$restProps}
  >
    <slot></slot>
  </svelte:component>
{:else}
  <div bind:this={element} on:click role={$$restProps.role} {...$$restProps}>
    <slot></slot>
  </div>
{/if}
