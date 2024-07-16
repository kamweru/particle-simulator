<script>
  import Icon from "@iconify/svelte";
  import { alertIcons } from "../../components.config.js";
  import "../styles/alert.css";
  export let cssVariables = "";
  export let message = "message text";
  export let open = true;
  export let description = null;
  export let type = "info";
  export let closable = false;
  export let showIcon = false;
  let classes = {
    default: "alert",
    types: {
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
      danger: "alert-danger",
    },
  };
  const toggleOpen = () => {
    open = false;
    setTimeout(() => (open = true), 3000);
  };
</script>

{#if open}
  <div
    class={[
      classes.default,
      classes.types[type],
      description ? "alert-with-description" : "",
    ]
      .join(" ")
      .trim()
      .replace(/\s+/g, " ")}
    style={cssVariables}
    role="alert"
  >
    {#if showIcon}
      <span class="icon alert-icon"><Icon icon={alertIcons[type]}></Icon></span>
    {/if}
    <div class="alert-content">
      <div class="alert-message">{message}</div>
      {#if description}
        <div class="alert-description">
          {description}
        </div>
      {/if}
    </div>
    {#if closable}
      <button class="alert-close-btn" on:click={toggleOpen}>
        <span class="icon"> <Icon icon="tabler:x" /></span>
      </button>
    {/if}
  </div>
{/if}
