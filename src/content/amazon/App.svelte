<script lang="ts">
  import pMap from 'p-map';
  import { onMount } from 'svelte';
  import { storage } from 'webextension-polyfill';
  import LoadingBar from '~/components/LoadingBar.svelte';
  import Popup from '~/components/Popup.svelte';
  import Summary from '~/components/Summary.svelte';
  import { concurrency } from '~/settings';
  import type { Data } from '~/util/types';
  import { getCountryOfOrigin, isVisible, renderProduct as renderProductFlag } from './util';

  let numResolved = 0;
  let productsElms: HTMLDivElement[] = [];
  let data: Data[] = [];

  // let percentLoaded = percent(numResolved, productsElms.length);
  let percentLoaded = 0;

  $: percentLoaded = Math.round((numResolved / Math.max(productsElms.length, 1)) * 100);

  async function main() {
    productsElms = Array.from(
      document.querySelectorAll<HTMLDivElement>('.s-search-results > div[data-asin^="B"]')
    ).filter(isVisible);
    numResolved = 0;

    const ids = productsElms.map((product) => product.dataset.asin as string);

    const defaultValues = Object.fromEntries(ids.map((id) => [id, null]));
    const cache = (await storage.local.get(defaultValues)) as Record<string, string | null>;

    data = Array(data.length).fill(null);
    await pMap(
      productsElms,
      async (product, i) => {
        const asin = product.dataset.asin as string;
        const country =
          cache[asin] !== null ? cache[asin] : await getCountryOfOrigin(product, asin);
        renderProductFlag(product, country);

        numResolved = Math.min(numResolved + 1, productsElms.length);

        data[i] = { asin, country: country as string, product };
        data = [...data];
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

<Popup title="🇺🇸 Countries of Origin 🇨🇳">
  <div class="relative flex flex-col gap-2">
    <LoadingBar width={Math.max(30, percentLoaded)}>
      {numResolved} / {productsElms.length}
      {percentLoaded}%
    </LoadingBar>

    <!-- <div class="overflow-y-auto h-fit max-h-[50px] flex flex-wrap gap-1">
      {#each dataSummary as [country, count], i (country)}
        <div class="flex text-lg gap-1" title={country}>
          <span style="font-family: Noto Color Emoji;">{flag(country)}</span>
          <span>{count}</span>
        </div>
      {/each}
    </div> -->
    <Summary {data} />

    <button
      class="bg-blue-400 hover:bg-blue-600 transition-colors rounded-md p-3 bg-opacity-60"
      on:click={refresh}>Refresh</button
    >
  </div>
</Popup>
