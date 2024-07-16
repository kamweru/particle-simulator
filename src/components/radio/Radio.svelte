<script>
  import { uuid } from "../../utils";
  import "../styles/radio.css";
  export let cssVariables = "";
  export let id = uuid(8);
  export let group;
  export let value = "";
  export let label = "radio label text";
  export let size = "default";
  export let checked = false;
  export let disabled = false;
  let classes = {
    default: "radio",
    sizes: {
      sm: "radio-sm",
      default: "",
      lg: "radio-lg",
    },
  };
</script>

<div class="flex ai:center gap:8">
  <label for={id} class="radio-wrapper">
    <input
      type="radio"
      {id}
      class={[classes.default, classes.sizes[size]]
        .join(" ")
        .trim()
        .replace(/\s+/g, " ")}
      style={cssVariables}
      {value}
      bind:group
      {checked}
      {disabled}
    />
    <span>{label}</span>
  </label>
  <!-- <label for={id} class="radio-wrapper">
    <input type="radio" {id} class="radio radio-lg" {value} bind:group />
    <span>{label}</span>
  </label>
  <label class="radio-wrapper">
    <input type="radio" class="radio radio-sm" {value} bind:group />
    <span>{label}</span>
  </label> -->
</div>
