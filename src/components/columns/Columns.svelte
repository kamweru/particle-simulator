<script>
</script>

<div class="flex flex:col gap:16 w:100%">
  <div class="flex gap:8">
    <div class="col-12 bg:beryl-80 p:16|0 text:center">col 12</div>
    <div class="col-12 bg:beryl-80">col 12</div>
  </div>
  {#each [...Array(24).keys()] as col}
    <div class="flex gap:1">
      <div class="col-{col + 1} bg:beryl-88 p:16 text:center">
        {col + 1}
      </div>
      {#if 24 - (col + 1) > 0}
        <div class="col-{24 - (col + 1)} bg:beryl-88 p:16 text:center">
          {24 - (col + 1)}
        </div>
      {/if}
    </div>
  {/each}
  <div class="col bg:beryl-80">col</div>
  <div class="col-1 bg:beryl-80">col-1</div>
  <div class="col-2 bg:beryl-80">col-1</div>
  <div class="col-3 bg:beryl-80">col-1</div>
  <div class="col-4 bg:beryl-80">col-1</div>
</div>
