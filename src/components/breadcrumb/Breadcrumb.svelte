<script>
  import "../styles/breadcrumb.css";
  export let separator = "/";
  export let cssVariables = "";
  let breadcrumbs = [
    {
      title: "Home",
    },
    {
      title: "Application Center",
    },
    {
      title: "Application List",
    },
    {
      title: "An Application",
    },
  ];
</script>

<nav class="breadcrumb" style={cssVariables}>
  <ol>
    {#each breadcrumbs as breadcrumb}
      <li>
        <span class="breadcrumb-link">
          {#if breadcrumb.title === breadcrumbs[breadcrumbs.length - 1].title}
            {breadcrumb.title}
          {:else}
            <a href="#">{breadcrumb.title}</a>
          {/if}
        </span>
      </li>
      {#if breadcrumb.title !== breadcrumbs[breadcrumbs.length - 1].title}
        <li><span class="breadcrumb-separator">{separator}</span></li>
      {/if}
    {/each}
  </ol>
</nav>
<!-- <div class="b:1|solid|rgb($(muted-2)) p:8 grid grid-cols:10 gap:8">
  {#each [0.04, 0.08, 0.096, 0.12, 0.15, 0.18, 0.24, 0.48, 0.64, 0.88] as opacity}
    <div class="bg:rgb($(color-black)/{opacity}) w:60 h:40 flex center-content">
      b/{opacity}
    </div>
  {/each}
  {#each [0.02, 0.04, 0.08, 0.12, 0.15, 0.18, 0.24, 0.4, 0.64, 0.88] as opacity}
    <div class="bg:rgb($(color-white)/{opacity}) w:60 h:40 flex center-content">
      w/{opacity}
    </div>
  {/each}
</div>
<div class="b:1|solid|rgb($(muted-2)) p:8 grid grid-cols:8">
  {#each ["246 246 246", "238 238 238", "232 232 232", "222 222 222", "215 215 215", "201 201 201", "144 144 144", "103 103 103"] as opacity, index}
    <div
      class="bg:rgb({opacity.replaceAll(
        ' ',
        '|'
      )}) px:8 h:40 flex center-content"
    >
      --gray-{index + 1}: {opacity};
    </div>
  {/each}
  {#each ["23 24 26", "34 34 34", "44 46 51", "56 58 64", "69 71 73", "75 77 80", "83 85 87", "97 99 101"] as opacity, index}
    <div
      class="bg:rgb({opacity.replaceAll(
        ' ',
        '|'
      )}) px:8 h:40 flex center-content"
    >
      --gray-{index + 1}: {opacity};
    </div>
  {/each}
</div> -->
