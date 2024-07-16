<script>
  import Icon from "@iconify/svelte";
  import Popover from "../popover/Popover.svelte";
  import "../styles/popconfirm.css";
  export let cssVariables = "";
  let open = false;
</script>

<div class="popconfirm" style={cssVariables}>
  <button class="button button-danger button-sm" on:click={() => (open = true)}
    >Delete Task</button
  >
  <Popover bind:open>
    <div class="popconfirm-inner">
      <span class="icon popconfirm-icon">
        <Icon icon="akar-icons:info-fill" />
      </span>
      <div class="popconfirm-content">
        <div class="popconfirm-head">
          <span class="popconfirm-title">Delete Task</span>
        </div>
        <div class="popconfirm-message">
          Are you sure you want to delete this task?
        </div>
        <div class="popconfirm-actions">
          <button class="button button-sm">No</button>
          <button class="button button-fill button-danger button-sm">Yes</button
          >
        </div>
      </div>
    </div>
  </Popover>
</div>
