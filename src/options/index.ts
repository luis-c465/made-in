import "../global.css";

import Options from "./Options.svelte";

const app = new Options({
  target: document.getElementById("app")!,
});

export default app;
