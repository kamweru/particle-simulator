<script>
  import { fade } from "svelte/transition";
  import { popover } from "../../popover";
  export let cssVariables = "";
  export let open = false;
  export let options = { placement: "bottom-start" };
  export let matchWidth = false;
  export let anchorEl = undefined;
  const close = () => {
    if (open) open = false;
  };
</script>

<div>
  {#if $$slots.trigger}
    <slot name="trigger">
      <a
        href="#"
        class="popover-trigger"
        on:click|preventDefault={() => (open = true)}
      >
        <span>Popover</span>
      </a>
    </slot>
  {/if}
  <div
    transition:fade={{ duration: 150 }}
    class="popover"
    class:open
    style={cssVariables}
    use:popover={{ anchorEl, matchWidth, ...options }}
    on:clickOutside={(e) => {
      e.stopPropagation();
      close();
    }}
  >
    <div class="wrapper">
      <slot name="content">
        <div>Popover Content</div>
      </slot>
    </div>
  </div>
</div>
