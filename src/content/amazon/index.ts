import { getShadowWrapper } from "../wrapper";
import App from "./Search.svelte";

const app = new App({
  target: getShadowWrapper(),
});

export default app;
