<script>
  import Icon from "@iconify/svelte";
  export let buttonText = "button text";
  export let cssVariables = "";
  export let type = "default";
  export let size = "default";
  export let color = "default";
  export let buttonContent = "textOnly";
  export let buttonCircle = false;
  export let disabled = false;
  let classes = {
    default: "button",
    types: {
      default: "button-default",
      dashed: "button-dashed",
      fill: "button-fill",
      text: "button-text",
      link: "button-link",
    },
    sizes: {
      sm: "button-sm",
      default: "",
      lg: "button-lg",
    },
    colors: {
      default: "",
      success: "button-success",
      warning: "button-warning",
      danger: "button-danger",
      info: "button-info",
    },
    buttonContents: {
      textOnly: "",
      iconOnly: "button-icon-only",
      iconLeft: "button-icon-left",
      iconRight: "button-icon-right",
    },
  };
  // console.log(
  //   [
  //     classes.default,
  //     classes.types[type],
  //     classes.sizes[size],
  //     classes.colors[color],
  //     classes.buttonContents[buttonContent],
  //     buttonCircle ? "button-circle" : "",
  //     disabled ? "button-disabled" : "",
  //   ]
  //     .join(" ")
  //     .trim().length
  // );
</script>

<button
  class={[
    classes.default,
    classes.types[type],
    classes.sizes[size],
    classes.colors[color],
    classes.buttonContents[buttonContent],
    buttonCircle ? "button-circle" : "",
    disabled ? "button-disabled" : "",
  ]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
  {disabled}
>
  {#if buttonContent === "iconOnly"}
    <span class="button-icon"><Icon icon="tabler:check"></Icon></span>
  {:else if buttonContent === "iconLeft"}
    <span class="button-icon"><Icon icon="tabler:check"></Icon></span>
    <span> {buttonText}</span>
  {:else if buttonContent === "iconRight"}
    <span> {buttonText}</span>
    <span class="button-icon"><Icon icon="tabler:check"></Icon></span>
  {:else}
    {buttonText}
  {/if}
</button>
