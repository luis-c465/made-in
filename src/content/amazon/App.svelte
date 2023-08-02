<script lang="ts">
  import { IconMinus, IconPlus } from '@tabler/icons-svelte';
  import clsx from 'clsx';
  import { flag } from 'country-emoji';
  import pMap from 'p-map';
  import { onMount } from 'svelte';
  import { storage } from 'webextension-polyfill';
  import { concurrency } from '~/settings';
  import { getCountryOfOrigin, renderProduct as renderProductFlag } from './util';

  type Data = {
    asin: string;
    country: string;
    product: HTMLDivElement;
  };

  let hidden = false;
  let numResolved = 0;
  let productsElms: HTMLDivElement[] = [];
  let data: Data[] = [];
  let dataSummary: [string, number][] = [];

  $: dataSummary = Object.entries(
    data
      .filter(({ country }) => !!country)
      .reduce<{ [key: string]: number }>((acc, { country }) => {
        if (acc[country] === undefined) {
          acc[country] = 1;
        } else {
          acc[country]++;
        }

        return acc;
      }, {})
  ).sort((a, b) => b[1] - a[1]);

  // let percentLoaded = percent(numResolved, productsElms.length);
  let percentLoaded = 0;

  $: percentLoaded = Math.round((numResolved / Math.max(productsElms.length, 1)) * 100);

  async function main() {
    productsElms = Array.from(
      document.querySelectorAll<HTMLDivElement>('.s-search-results > div[data-asin^="B"]')
    );
    numResolved = 0;

    const ids = productsElms.map((product) => product.dataset.asin as string);

    const defaultValues = Object.fromEntries(ids.map((id) => [id, null]));
    const cache = (await storage.local.get(defaultValues)) as Record<string, string | null>;

    data = [];
    await pMap(
      productsElms,
      async (product) => {
        const asin = product.dataset.asin as string;
        const country =
          cache[asin] !== null ? cache[asin] : await getCountryOfOrigin(product, asin);
        renderProductFlag(product, country);

        numResolved = Math.min(numResolved + 1, productsElms.length);

        data = [...data, { asin, country: country as string, product }];
      },
      { concurrency: await $concurrency }
    );
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

    <span class="text-lg font-bold">🇺🇸 Countries of Origin 🇨🇳</span>
  </div>

  <div class="relative flex flex-col gap-2">
    <div class="flex flex-col gap-1">
      <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style="width: {Math.max(30, percentLoaded)}%"
        >
          {numResolved} / {productsElms.length}
          {percentLoaded}%
        </div>
      </div>
    </div>

    <div class="overflow-y-auto h-fit max-h-[50px] flex flex-wrap gap-1">
      {#each dataSummary as [country, count] (country)}
        <div class="flex text-lg gap-1" title={country}>
          <span style="font-family: Noto Color Emoji;">{flag(country)}</span>
          <span>{count}</span>
        </div>
      {/each}
    </div>

    <button
      class="bg-blue-400 hover:bg-blue-600 transition-colors rounded-md p-3 bg-opacity-60"
      on:click={refresh}>Refresh</button
    >
  </div>
</main>
