<script lang="ts">
  import Option from '~/components/Option.svelte';
  import { concurrency } from '~/settings';
  import ClearCacheBtn from './ClearCacheBtn.svelte';
</script>

<main class="flex flex-col gap-10 m-20 text-lg justify-center items-center">
  <h1>Options page</h1>

  <Option optionStore={concurrency} label="Requests concurrency">
    The number of requests that will be done concurrently
  </Option>
  <ClearCacheBtn />
</main>
