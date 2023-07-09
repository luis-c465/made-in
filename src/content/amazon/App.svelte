<script lang="ts">
  import { onMount } from 'svelte';
  import { storage } from 'webextension-polyfill';
  import { getCountryOfOrigin, renderProduct as renderProductFlag } from './util';

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

    const promises = productsElms.map(async (product) => {
      const asin = product.dataset.asin as string;
      const country = cache[asin] !== null ? cache[asin] : await getCountryOfOrigin(product, asin);
      renderProductFlag(product, country);

      numResolved = Math.min(numResolved + 1, productsElms.length);
    });

    try {
      await Promise.allSettled(promises);
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
  class="fixed z-[999] bottom-2 right-2 shadow-xl bg-black bg-opacity-40 p-4 text-white flex flex-col gap-4 rounded-lg"
>
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
</main>
