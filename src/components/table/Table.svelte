<script>
  export let cssVariables = "";
  export let columns = [];
  export let data = [];
  const performSort = (column) => {
    let key = column.key,
      columnIndex = columns.findIndex((c) => c.key === key);
    columns[columnIndex].sort =
      columns[columnIndex].sort === undefined
        ? "asc"
        : columns[columnIndex].sort === "asc"
          ? "desc"
          : "asc";
    if (key) {
      data = data.sort((a, b) => {
        if (columns[columnIndex].sort === "asc") {
          return a[key] < b[key] ? -1 : 1;
        }
        if (columns[columnIndex].sort === "desc") {
          return a[key] < b[key] ? 1 : -1;
        }
        return 0;
      });
    }
  };
</script>

<div class="table-wrapper" style={cssVariables}>
  <table>
    <thead>
      {#if columns && columns.length > 0}
        <tr>
          {#each columns as column}
            <th>
              <div class="flex ai:center">
                <span class="flex:1">{column.title}</span>
                <button
                  class="button button-icon-only button-sm column-sorter"
                  on:click={() => performSort(column)}
                >
                  <span
                    class="column-sorter-icon column-sorter-up {column.sort ===
                    'asc'
                      ? 'active'
                      : ''}"
                  ></span>

                  <span
                    class="column-sorter-icon column-sorter-down {column.sort ===
                    'desc'
                      ? 'active'
                      : ''}"
                  ></span>
                </button>
              </div>
            </th>
          {/each}
          {#if $$slots.actions}
            <th> </th>
          {/if}
        </tr>
      {/if}
      <slot name="thead"></slot>
    </thead>
    <tbody>
      {#if data && data.length > 0}
        {#each data as row}
          <tr>
            {#each columns as column}
              <td>{row[column.key]}</td>
            {/each}
            {#if $$slots.actions}
              <td>
                <slot name="actions" {row} />
              </td>
            {/if}
          </tr>
        {/each}
      {/if}
      <slot></slot>
    </tbody>
  </table>
</div>
