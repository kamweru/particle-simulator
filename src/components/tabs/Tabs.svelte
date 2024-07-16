<script>
  import { createEventDispatcher } from "svelte";
  export let menuItems = ["Home", "About", "Contact"].map((title) => ({
    title,
    value: title,
  }));
  export let cssVariables = "";
  export let currentMenu = menuItems[0];
  const dispatch = createEventDispatcher(),
    toggleMenu = (menuItem) => {
      currentMenu = menuItem;
      dispatch("toggleMenu", menuItem);
    };
</script>

<nav class="tabs" style={cssVariables}>
  <slot></slot>
</nav>

<div role="tabpanel">
  <slot name="content" />
</div>
