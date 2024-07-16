<script>
  import Icon from "@iconify/svelte";
  export let open = true;
</script>

<div class="collapse-item" class:open>
  <div class="collapse-header">
    <slot name="header"></slot>
    <a
      href="#"
      class="color:inherit bg:yellow button button-icon-only button-text"
      on:click|preventDefault={() => (open = !open)}
    >
      <span class="icon"> <Icon icon="tabler:chevron-down" /></span>
    </a>
  </div>
  <div class="collapse-body" class:open>
    <slot name="content"></slot>
  </div>
</div>
