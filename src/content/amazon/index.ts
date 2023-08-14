import { getShadowWrapper } from "../util";
import App from "./App.svelte";

const app = new App({
  target: getShadowWrapper(),
});

export default app;
