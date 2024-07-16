<script>
  export let title = "form";
  export let height = "calc(100vh-56px)";
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>
<slot name="header" />
<main class="h:{height} overflow-y:scroll">
  <div class="h:100% w:xs mx:auto mb:20>* mb:0>*:last">
    <slot />
  </div>
</main>
