<script lang="ts">
  import { IconMinus, IconPlus } from '@tabler/icons-svelte';
  import clsx from 'clsx';

  let hidden = false;
  export let title = '';
</script>

<main
  class={clsx(
    'fixed z-[999] bottom-2 right-2 shadow-xl bg-black bg-opacity-40 text-white flex flex-col gap-1 rounded-lg overflow-hidden',
    hidden && 'h-[65px] w-[55px] p-1',
    !hidden && 'p-4 h-[200px] w-[300px]'
  )}
  style="transition: width 500ms, height 500ms, padding 500ms;"
>
  <div class="relative">
    {#if hidden}
      <button
        class="hover:bg-slate-500 bg-opacity-50 transition-all rounded-md p-3"
        on:click={() => (hidden = false)}
      >
        <IconPlus />
      </button>
    {:else}
      <button
        class="hover:bg-slate-500 bg-opacity-50 transition-all rounded-md p-3"
        on:click={() => (hidden = true)}
      >
        <IconMinus />
      </button>
    {/if}

    <span class="text-lg font-bold">{title}</span>
  </div>

  <slot />
</main>
