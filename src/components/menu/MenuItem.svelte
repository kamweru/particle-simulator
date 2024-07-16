<script>
  export let active = false;
</script>

<li class="menu-item" class:active role="menuitem" {...$$restProps}>
  <a href="" on:click>
    <slot />
  </a>
</li>
