<script>
  import { uuid } from "../../utils";
  import "../styles/numberinput.css";
  export let cssVariables = "";
  export let id = uuid(8);
  export let value = 3;
  export let step = 1;
  export let size = "default";
  export let type = "outline";
  let classes = {
    default: "numberinput",
    sizes: {
      sm: "numberinput-sm",
      md: "",
      lg: "numberinput-lg",
    },
    types: {
      outline: "numberinput-outline",
      fill: "numberinput-fill",
    },
  };
  const increment = () => {
      value += parseFloat(step);
    },
    decrement = () => {
      value -= parseFloat(step);
    };
</script>

<!-- <div class="flex flex:col gap:8"> -->
<div
  class={[classes.default, classes.sizes[size], classes.types[type]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
>
  <div class="numberinput-handler-wrap">
    <button
      class="numberinput-handler numberinput-handler-up"
      on:click={increment}
      ><span class="numberinput-handler-icon numberinput-handler-icon-up"
      ></span></button
    >
    <button
      class="numberinput-handler numberinput-handler-down"
      on:click={decrement}
      ><span class="numberinput-handler-icon numberinput-handler-icon-down"
      ></span></button
    >
  </div>
  <input
    type="number"
    {id}
    {value}
    {step}
    placeholder="3"
    class="numberinput-input"
    on:change={(e) => (value = parseFloat(e.target.value))}
  />
</div>

<!-- <div class="numberinput numberinput-lg numberinput-fill">
    <div class="numberinput-handler-wrap">
      <button
        class="numberinput-handler numberinput-handler-up"
        on:click={increment}
        ><span class="numberinput-handler-icon numberinput-handler-icon-up"
        ></span></button
      >
      <button
        class="numberinput-handler numberinput-handler-down"
        on:click={decrement}
        ><span class="numberinput-handler-icon numberinput-handler-icon-down"
        ></span></button
      >
    </div>
    <input
      type="number"
      {value}
      {step}
      placeholder="3"
      class="numberinput-input"
      on:change={(e) => (value = parseFloat(e.target.value))}
    />
  </div>
  <div class="numberinput numberinput-sm">
    <div class="numberinput-handler-wrap">
      <button
        class="numberinput-handler numberinput-handler-up"
        on:click={increment}
        ><span class="numberinput-handler-icon numberinput-handler-icon-up"
        ></span></button
      >
      <button
        class="numberinput-handler numberinput-handler-down"
        on:click={decrement}
        ><span class="numberinput-handler-icon numberinput-handler-icon-down"
        ></span></button
      >
    </div>
    <input
      type="number"
      {value}
      {step}
      placeholder="3"
      class="numberinput-input"
      on:change={(e) => (value = parseFloat(e.target.value))}
    />
  </div>
  <div class="numberinput numberinput-lg">
    <div class="numberinput-handler-wrap">
      <button
        class="numberinput-handler numberinput-handler-up"
        on:click={increment}
        ><span class="numberinput-handler-icon numberinput-handler-icon-up"
        ></span></button
      >
      <button
        class="numberinput-handler numberinput-handler-down"
        on:click={decrement}
        ><span class="numberinput-handler-icon numberinput-handler-icon-down"
        ></span></button
      >
    </div>
    <input
      type="number"
      {value}
      {step}
      placeholder="3"
      class="numberinput-input"
      on:change={(e) => (value = parseFloat(e.target.value))}
    />
  </div> 
</div>-->
