<script>
  import Icon from "@iconify/svelte";
  import Progress from "../progress/Progress.svelte";
  import Flex from "../flex/Flex.svelte";
  export let cssVariables = "";
  let active = false,
    status = "uploading",
    progress = 10,
    errors = ["Something went wrong"];
</script>

<Flex direction="column">
  <div class="upload" style={cssVariables}>
    <span class="upload-drag-area">
      <span
        class="upload-btn"
        tabindex="0"
        role="button"
        class:active
        aria-hidden="true"
        on:dragenter|preventDefault={() => (active = true)}
        on:dragleave|preventDefault={() => (active = false)}
      >
        <input
          type="file"
          name="file-upload"
          id="file-upload"
          accept=".jpg, .jpeg, .png, .svg, .gif, .webp"
          multiple
        />
        <span class="upload-instructions">
          <span class="upload-icon f:36"></span>
          <span class="upload-text">Drop file or click to upload</span>
          <span class="upload-hint">
            <span>allowed file types: jpg, jpeg, png, gif, svg</span>
            <span>maximum file size: 1MB</span>
          </span>
        </span>
      </span>
    </span>
  </div>
  {#if errors.length > 0}
    <span class="upload-errors">{errors.join(", ")}</span>
  {/if}
  <div class="upload-list">
    <div class="upload-list-item">
      <!-- {#if status === "uploading"}
          <span class="loader"></span>
        {:else if status === "uploaded" || status === "ready"} -->
      <Icon icon="iconoir:attachment"></Icon>
      <!-- {/if} -->
      <div class="upload-list-item-info">
        <div>file name</div>
        <div class="upload-list-item-progress">
          <Progress {progress} max={100} />
          <div class="upload-list-item-progress-value">{progress}%</div>
        </div>
      </div>
      {#if status === "uploaded"}
        <div class="upload-list-item-action">
          <button class="button button-text button-danger button-icon-only">
            <span class="button-icon">
              <span class="icon">
                <Icon icon="fluent:delete-28-regular"></Icon>
              </span>
            </span>
          </button>
        </div>
      {/if}
    </div>
  </div>
</Flex>
