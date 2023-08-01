<script lang="ts">
  import { IconMinus, IconPlus } from '@tabler/icons-svelte';
  import clsx from 'clsx';
  import pMap from 'p-map';
  import { onMount } from 'svelte';
  import { storage } from 'webextension-polyfill';
  import { getCountryOfOrigin, renderProduct as renderProductFlag } from './util';

  let hidden = false;
  let numResolved = 0;
  let productsElms: HTMLDivElement[] = [];

  // let percentLoaded = percent(numResolved, productsElms.length);
  let percentLoaded = '0%';

  $: percentLoaded = `${Math.round((numResolved / Math.max(productsElms.length, 1)) * 100)}%`;

  async function main() {
    productsElms = Array.from(document.querySelectorAll<HTMLDivElement>('div[data-asin^="B"]'));
    numResolved = 0;

    const ids = productsElms.map((product) => product.dataset.asin as string);

    const defaultValues = Object.fromEntries(ids.map((id) => [id, null]));
    const cache = await storage.local.get(defaultValues);

    try {
      await pMap(productsElms, async (product) => {
        const asin = product.dataset.asin as string;
        const country = cache[asin] !== null ? cache[asin] : await getCountryOfOrigin(product, asin);
        renderProductFlag(product, country);

        numResolved = Math.min(numResolved + 1, productsElms.length);
      }, { concurrency: 30 });
    } catch (e) {
      console.log('something went wrong');
      console.error(e);
    }
  }

  onMount(main);

  function refresh() {
    const flags = document.querySelectorAll<HTMLDivElement>('.country-flag');
    flags.forEach((flag) => flag.remove());

    main();
  }
</script>

<main
  class={clsx(
    'fixed z-[999] bottom-2 right-2 shadow-xl bg-black bg-opacity-40 text-white flex flex-col gap-1 rounded-lg overflow-hidden',
    hidden && 'h-[55px] w-[55px] p-1',
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

    <span class="text-lg font-bold">🇺🇸 Countries of Origin 🇨🇳</span>
  </div>

  <div class="relative flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <span>{numResolved} / {productsElms.length} Countries of origin received</span>
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style="width: {percentLoaded}"
        >
          {percentLoaded}
        </div>
      </div>
    </div>

    <button
      class="bg-blue-400 hover:bg-blue-600 transition-colors rounded-md p-3 bg-opacity-60"
      on:click={refresh}>Refresh</button
    >
  </div>
</main>
