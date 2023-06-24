<script lang="ts">
  import { storage } from 'webextension-polyfill';

  let clearingCache = false;
  let clicked = false;

  async function handleClick() {
    clicked = true;
    clearingCache = true;

    await storage.local.clear();

    clearingCache = false;
  }
</script>

<div>
  <div class="bg-blue-400 hover:bg-blue-600 transition-colors p-3 rounded-md">
    {#if !clicked}
      <button on:click={handleClick} id="clearProductCache">Clear products cache</button>
    {:else if clearingCache}
      <span>Clearing cache...</span>
    {:else}
      <span>Cache cleared!</span>
    {/if}
  </div>
</div>
