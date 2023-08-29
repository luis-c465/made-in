<script lang="ts">
  import pMap from "p-map";
  import { onMount } from "svelte";
  import { storage } from "webextension-polyfill";
  import BasePopup from "~/components/BasePopup.svelte";
  import LoadingBar from "~/components/LoadingBar.svelte";
  import Summary from "~/components/Summary.svelte";
  import { concurrency } from "~/settings";
  import { renderProduct } from "~/util/render";
  import type { Data } from "~/util/types";

  export let getID: (product: HTMLDivElement) => string;
  export let getElements: () => HTMLDivElement[];
  export let getCountryOfOrigin: (product: HTMLDivElement, id: string) => Promise<string | null>;

  let numResolved = 0;
  let productsElms: HTMLDivElement[] = [];
  let data: Data[] = [];

  let percentLoaded = 0;

  $: percentLoaded = Math.round((numResolved / Math.max(productsElms.length, 1)) * 100);

  async function main() {
    productsElms = getElements();
    numResolved = 0;

    const productAndIDS = productsElms.map((product) => [product, getID(product)] as const);

    const defaultValues = Object.fromEntries(productAndIDS.map(([_, id]) => [id, false]));
    const cache = (await storage.local.get(defaultValues)) as Record<string, string | null | false>;

    data = Array(data.length).fill(null);
    await pMap(
      productAndIDS,
      async ([product, id], i) => {
        const country =
          cache[id] !== false
            ? (cache[id] as string | null)
            : await getCountryOfOrigin(product, id);

        renderProduct(product, country);

        numResolved = Math.min(numResolved + 1, productsElms.length);

        data[i] = { id, country: country as string, product };
        data = [...data];
      },
      { concurrency: await $concurrency }
    );
  }

  onMount(main);

  function refresh() {
    const flags = document.querySelectorAll<HTMLDivElement>(".country-flag");
    flags.forEach((flag) => flag.remove());

    main();
  }
</script>

<BasePopup title="🇺🇸 Countries of Origin 🇨🇳">
  <div class="relative flex flex-col gap-2">
    <LoadingBar width={Math.max(30, percentLoaded)}>
      {numResolved} / {productsElms.length}
      {percentLoaded}%
    </LoadingBar>

    <Summary {data} />

    <button
      class="bg-blue-400 hover:bg-blue-600 transition-colors rounded-md p-3 bg-opacity-60"
      on:click={refresh}>Refresh</button
    >
  </div>
</BasePopup>
