<script>
  export let cssVariables = "";
  export let type = "vertical";
  let classes = {
    default: "form",
    types: {
      inline: "form-inline",
      vertical: "form-vertical",
      horizontal: "form-horizontal",
    },
  };
</script>

<form
  action=""
  class={[classes.default, classes.types[type]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
>
  <div class="form-control-group">
    <div class="form-label">
      <label for="">Field A, A super long label text</label>
    </div>
    <div class="form-control">
      <div>
        <input type="text" class="input" />
      </div>
      <div class="form-control-message form-control-error">
        error message, A prime is a natural number greater than 1 that has no
        positive divisors other than 1 and itself. error message, A prime is a
        natural number greater than 1 that has no positive divisors other than 1
        and itself.
      </div>
    </div>
  </div>
  <div class="form-control-group">
    <div class="form-label">
      <label for="">Field A, A super long label text</label>
    </div>
    <div class="form-control">
      <div class="flex ai:center">
        <div class="flex:auto">
          <input type="text" class="input" />
        </div>
      </div>
      <div class="form-control-message">
        error message, A prime is a natural number greater than 1 that has no
        positive divisors other than 1 and itself. error message, A prime is a
        natural number greater than 1 that has no positive divisors other than 1
        and itself.
      </div>
    </div>
  </div>
  <div class="form-control-group">
    <div class="form-label">
      <label for="">Field A, A super long label text</label>
    </div>
    <div class="form-control">
      <div>
        <input type="text" class="input" />
      </div>
      <div class="form-control-message">
        error message, A prime is a natural number greater than 1 that has no
        positive divisors other than 1 and itself.
      </div>
    </div>
  </div>
  <div class="form-actions">
    <button class="button button-text">Cancel</button>
    <button class="button button-fill">Submit</button>
  </div>
</form>
