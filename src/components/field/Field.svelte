<script>
  import "../styles/field.css";
  import { uuid } from "../../lib/utils";
  export let id = uuid();
  export let cssVariables = "";
  export let labelCol = 4;
  export let inputCol = 16;
  export let size = "default";
  export let type = "vertical";
  let classes = {
    default: "field",
    sizes: {
      sm: "field-sm",
      default: "",
      lg: "field-lg",
    },
    types: {
      horizontal: "field-horizontal",
      vertical: "field-vertical",
    },
  };
</script>

<div
  class={[classes.default, classes.sizes[size], classes.types[type]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
>
  <div class="field-label">
    <label for={id}>
      <slot name="label" />
    </label>
  </div>
  <div class="field-input">
    <slot name="input" />
  </div>
</div>
