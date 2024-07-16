<script>
  import Icon from "@iconify/svelte";
  import "../styles/floatbutton.css";
  export let cssVariables = "";
</script>

<button class="floatbutton" style={cssVariables}>
  <div class="floatbutton-content">
    <span class="icon floatbutton-icon">
      <Icon icon="akar-icons:info-fill" />
    </span>
  </div>
</button>
