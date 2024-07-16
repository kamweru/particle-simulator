<script>
  import "../styles/select.css";
  import { popover } from "../../popover";
  import { createEventDispatcher } from "svelte";
  import Icon from "@iconify/svelte";
  export let options = [...Array(10).keys()].map((i) => ({
    title: `Option ${i + 1}`,
    value: `Option ${i + 1}`,
  }));
  export let label = "Select an option";
  export let selected = "";
  export let inputSize = "md";
  export let id = null;
  export let minW = 200;
  let selectArrowIcon = "chevron-down",
    popoverOptions = {
      placement: "bottom-start",
      autoPlacement: true,
      matchWidth: true,
    },
    anchorEl = undefined,
    open = false,
    selectedObj = null,
    inputSizes = {
      sm: "input-sm",
      md: "",
      lg: "input-lg",
    },
    selectSizes = {
      sm: "select-sm",
      md: "",
      lg: "select-lg",
    },
    optionSizes = {
      sm: "option-sm",
      md: "",
      lg: "option-lg",
    };
  const dispatch = createEventDispatcher(),
    setSelected = (obj) => {
      open = false;
      selectedObj = obj;
      selected = obj.value;
      label = obj.title;
      dispatch("onChange", obj);
    };
  $: if (
    selected &&
    !open &&
    selectedObj !== options.find((o) => o.value === selected)
  ) {
    // open = false;
    label = options.find((o) => o.value === selected).title;
    selectedObj = options.find((o) => o.value === selected);
    // dispatch("onChange", { value: selected });
  }
</script>

<!-- <div class="flex flex:col gap:8"> -->
<!-- <div class="select select-multiple">
    <span class="select-selector">
      <span class="select-selector-items">
        {#each [...Array(5).keys()] as item}
          <span class="select-selector-item-wrap">
            <span class="select-selection">
              <span class="select-selection-item" class:open>Item {item}</span
              >
              <button class="select-selection-remove">
                <Icon icon="ic:baseline-close" />
              </button>
            </span>
          </span>
        {/each}
        <div class="select-selector-search">
          <div class="inline-flex rel w:80">
            <input
              type="text"
              class="m:0 p:0 appearance:none w:100% min-w:4 b:1|solid|rgb($(color-border))"
            />
          </div>
        </div>
      </span>
      <span class="select-arrow">
        <Icon icon="tabler:chevron-down" />
      </span>
    </span>
  </div> -->
<!-- <Popover options={popoverOptions} {matchWidth} bind:open> -->
<div class="flex flex:col gap:8">
  <div class="select {selectSizes[inputSize]}">
    <span class="select-selector">
      <span class="select-selection">
        <span class="select-selection-item" class:open>{label}</span>
      </span>
      <span class="icon select-arrow">
        <Icon icon="tabler:chevron-down" />
      </span>
    </span>
    <input
      type="text"
      class="select-input"
      {id}
      on:focus={() => {
        open = true;
        selectArrowIcon = "search";
      }}
      on:blur={() => {
        //   open = false;
        selectArrowIcon = "chevron-down";
      }}
    />
  </div>
  <div
    class="select-options popover"
    class:open
    use:popover={{ anchorEl, ...popoverOptions }}
    on:clickOutside={(e) => {
      e.stopPropagation();
      open = false;
    }}
  >
    <div class="wrapper">
      {#each options as option}
        <option
          value={option.value}
          on:click={() => setSelected(option)}
          class="select-option"
          class:active={option.value === selected}>{option.title}</option
        >
      {/each}
    </div>
  </div>
</div>
<!-- </Popover> -->
<!-- </div> -->
