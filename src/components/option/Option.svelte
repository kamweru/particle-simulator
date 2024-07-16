<script>
  import "../styles/option.css";
  export let cssVariables = "";
  export let size = "default";
  export let value = "";
  export let optionText = "Option Text";
  export let active = false;
  let classes = {
    default: "option",
    sizes: {
      sm: "option-sm",
      default: "",
      lg: "option-lg",
    },
  };
</script>

<option
  class={[classes.default, classes.sizes[size]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  {value}
  class:active
  style={cssVariables}
>
  {optionText}
</option>
