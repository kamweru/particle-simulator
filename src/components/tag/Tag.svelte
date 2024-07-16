<script>
  import Icon from "@iconify/svelte";
  import "../styles/tag.css";
  export let cssVariables = "";
</script>

<div class="">
  <span class="tag" style={cssVariables}>Tag 1</span>
  <span class="tag" style={cssVariables}
    >Tag 1
    <button class="icon tag-close-btn">
      <Icon icon="ic:baseline-close"></Icon>
    </button>
  </span>

  <span class="tag" style={cssVariables}>
    <span class="icon">
      <Icon icon="tabler:plus" />
    </span>
    <span>Tag 1</span>
  </span>
</div>
