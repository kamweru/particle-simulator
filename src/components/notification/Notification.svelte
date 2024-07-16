<script>
  import Icon from "@iconify/svelte";
  import "../styles/notification.css";
  export let cssVariables = "";
</script>

<div class="notification" style={cssVariables}>
  <span class="icon notification-icon">
    <Icon icon="akar-icons:info-fill" />
  </span>
  <div class="notification-content">
    <span class="notification-title">Notification title</span>
    <span class="notification-message"
      >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis
      dignissimos, nam culpa eius porro iusto aliquid laborum voluptatum
      architecto quae maxime molestias harum, aspernatur non! Pariatur totam
      possimus ipsum tempora.</span
    >
  </div>
  <button class=" notification-close-btn">
    <span class="icon">
      <Icon icon="ic:baseline-close"></Icon>
    </span>
  </button>
</div>
