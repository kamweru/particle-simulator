<script>
  import Icon from "@iconify/svelte";
  import "../styles/message.css";
  export let cssVariables = "";
  export let type = "info";
  let classes = {
      default: "message",
      types: {
        warning: "message-warning",
        success: "message-success",
        info: "mesage-info",
        danger: "message-danger",
      },
    },
    icons = {
      info: "raphael:info",
      warning: "ic:round-warning",
      danger: "material-symbols:error",
      success: "mdi:success-circle",
    };
</script>

<div
  class={[classes.default, classes.types[type]]
    .join(" ")
    .trim()
    .replace(/\s+/g, " ")}
  style={cssVariables}
>
  <div class="message-content">
    <span class="icon message-icon">
      <Icon icon={icons[type]} />
    </span>
    <span class="message-text">
      This is a prompt message for success, and it will disappear in 10 seconds
    </span>
  </div>
</div>
