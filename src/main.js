import "@master/normal.css";
import "@master/css";
import "./app.css";
import App from "./App.svelte";

const app = new App({
  target: document.body,
  // document.getElementById('app'),
});

export default app;
