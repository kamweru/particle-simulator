<script>
  export let cssVariables = "";
  export let progress = 0,
    max = 100;
</script>

<progress value={progress} {max} class="progress" style={cssVariables}
></progress>
