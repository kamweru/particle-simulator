<script>
  import { uuid } from "../../utils";
  import Flex from "../flex/Flex.svelte";
  import "../styles/checkbox.css";
  export let cssVariables = "";
  export let checkboxes = [];
  export let label = "";
  export let checked = "";
  export let group = "";
  export let id = uuid(8);
  export let indeterminate = false;
  export let disabled = false;
  export let size = "default";
  let classes = {
    default: "checkbox",
    sizes: {
      sm: "checkbox-sm",
      default: "",
      lg: "checkbox-lg",
    },
  };
</script>

<Flex gap="sm" align="center">
  {#if checkboxes && checkboxes.length > 0}
    {#each checkboxes as checkbox}
      <label for={checkbox.id} class="checkbox-wrapper">
        <input
          type="checkbox"
          id={checkbox.id}
          bind:group
          value={checkbox.value}
          disabled={checkbox.disabled}
          indeterminate={checkbox.indeterminate}
          class={[classes.default, classes.sizes[size]]
            .join(" ")
            .replace(/\s+/g, " ")}
          style={cssVariables}
        />
        {#if checkbox.label}
          <span>{checkbox.label}</span>
        {/if}
      </label>
    {/each}
  {:else}
    <label for={id} class="checkbox-wrapper">
      <input
        type="checkbox"
        {id}
        bind:checked
        {disabled}
        bind:indeterminate
        class={[classes.default, classes.sizes[size]]
          .join(" ")
          .replace(/\s+/g, " ")}
        style={cssVariables}
      />
      {#if label}
        <span>{label}</span>
      {/if}
    </label>
  {/if}
</Flex>
