<script>
  import Popover from "../popover/Popover.svelte";
  import "../styles/dropdown.css";
  export let cssVariables = "";
  export let triggerAction = "click";
  let open = false;
</script>

<div class="w:min dropdown" style={cssVariables}>
  <a
    href=""
    class="dropdown-trigger"
    on:mouseover={() => {
      if (triggerAction === "hover") open = true;
    }}
    on:click|preventDefault={() => {
      if (triggerAction === "click") open = true;
    }}
  >
    <slot name="trigger">
      <div class="flex ai:center gap:8">
        <span>Dropdown</span>
        <span>∨</span>
      </div>
    </slot>
  </a>
  <Popover bind:open matchWidth={true}>
    <ul class="dropdown-menu">
      {#each [1, 2, 3] as item}
        <li class="dropdown-menu-item">
          <span class="dropdown-menu-item-content">
            <a href="" class=" color:rgb($(color-text))">item {item}</a></span
          >
        </li>
      {/each}
    </ul>
  </Popover>
</div>
