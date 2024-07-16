<script>
  import { createEventDispatcher } from "svelte";
  import { uuid } from "../../utils";
  import "../styles/switch.css";
  export let cssVariables = "";
  export let id = uuid(8);
  export let label = "";
  export let value = false;
  export let size = "sm";
  let classes = {
    default: "switch",
    sizes: {
      sm: "switch-sm",
      md: "",
      lg: "switch-lg",
    },
  };
  const dispatch = createEventDispatcher(),
    onChange = (e) => dispatch("onChange", { value: e.target.checked });
</script>

<div class="flex ai:center gap:8">
  <input
    type="checkbox"
    {id}
    class={[classes.default, classes.sizes[size]]
      .join(" ")
      .trim()
      .replace(/\s+/g, " ")}
    style={cssVariables}
    bind:checked={value}
    on:change={onChange}
  />
  {#if label}
    <label for={id} class="f:$(font-size) lh:$(line-height) capitalize"
      >{label}</label
    >
  {/if}
  <!-- <input type="checkbox" {id} class="switch" bind:checked={value} {value} />
  <label for={id} class="f:$(font-size) lh:$(line-height) capitalize"
    >{label}</label
  > -->
</div>
