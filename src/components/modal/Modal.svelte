<script>
  import { clickOutside } from "../../utils";
  export let open = false;
  export let cssVariables = "";
  import Icon from "@iconify/svelte";
</script>

{#if $$slots.trigger}
  <slot name="trigger">
    <a
      href=""
      class="modal-trigger"
      on:click|preventDefault={() => (open = true)}
    >
      <span>Open Modal</span>
    </a>
  </slot>
{/if}
<div style={cssVariables} class="modal" class:open>
  <div class="modal-overlay"></div>
  <div class="modal-wrapper" role="dialog" aria-modal="true">
    <div class="modal-inner">
      <div
        class="modal-dialog"
        use:clickOutside
        on:outsideclick={() => (open = false)}
      >
        <div class="modal-close-btn" aria-label="Close">
          <button
            class="button button-text button-sm button-icon-only"
            on:click={() => (open = false)}
          >
            <span class="button-icon">
              <span class="icon"> <Icon icon="ic:baseline-close"></Icon></span>
            </span>
          </button>
        </div>
        <slot name="content">
          <div>Modal Title</div>
        </slot>
      </div>
    </div>
  </div>
</div>
