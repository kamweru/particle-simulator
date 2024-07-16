<script>
  import Box from "../box/Box.svelte";
  export let root = "a",
    element = undefined,
    active = false;
</script>

<Box
  {root}
  bind:element
  type="button"
  role="tablist"
  class="tab-item {active ? 'active' : ''}"
  on:click
  {...$$restProps}
>
  <slot name="label"></slot>
</Box>
