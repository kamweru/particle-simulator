<script>
  export let columns = [],
    data = [],
    column = {};
  const logItem = () => console.log("clicked", data),
    performSort = () => {
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

<th>
  <slot></slot>
  <!-- <button class="button button-fill button-sm" on:click={performSort}
    >click me</button
  > -->
</th>
