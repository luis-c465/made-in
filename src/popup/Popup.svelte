<script lang="ts">
  import { runtime } from 'webextension-polyfill';

  type Msg = {
    type: string;
    payload: {
      numResolved: number;
      numTotal: number;
    };
  };

  let numResolved = 0;
  let numTotal = 0;

  let isOnAmazon = false;

  runtime.onMessage.addListener(({ type, payload }: Msg) => {
    if (type !== 'PRODUCTS') {
      return;
    }

    isOnAmazon = true;

    console.log('Popup received message', payload);

    numResolved = payload.numResolved;
    numTotal = payload.numTotal;
  });
</script>

<main class="flex flex-col gap-10 p-5 text-md justify-center items-center w-[300px] h-[300px]">
  {#if !isOnAmazon}
    <span
      >Go to an Amazon product search page to see the progress of getting countries of origin</span
    >
  {:else}
    <span>{numResolved} / {numTotal} Countries of origin received</span>
  {/if}
</main>
