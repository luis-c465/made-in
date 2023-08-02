<script lang="ts">
  import { type Asyncable } from 'svelte-asyncable';
  import ArraySetting from '~/components/ArraySetting.svelte';
  import LoadingSpinner from '~/components/LoadingSpinner.svelte';

  export let optionStore: Asyncable<any>;
  export let options = null as string[] | null;
  export let label = '';
</script>

<li class="flex flex-col gap-2">
  <div class="flex gap-4 items-center justify-start">
    <span class="grow">{label}</span>

    <div class="min-w-8 h-6 flex items-center min-w-fit">
      {#await $optionStore}
        <LoadingSpinner />
      {:then option}
        {#if typeof option === 'boolean'}
          <input
            class="w-4 h-4"
            type="checkbox"
            checked={option}
            on:change={() => {
              optionStore.set(!option);
            }}
          />
        {:else if typeof option === 'number'}
          <input
            class="text-right"
            type="number"
            value={option}
            on:change={(e) => {
              optionStore.set(Number(e.currentTarget.value || 0));
            }}
          />
        {:else if typeof option === 'string'}
          {#if options !== null}
            <select
              class="text-right"
              value={option}
              on:change={(e) => {
                optionStore.set(e.currentTarget.value);
              }}
            >
              {#each options as o}
                <option value={o}>{o}</option>
              {/each}
            </select>
          {:else}
            <input
              class="text-right"
              type="text"
              value={option}
              on:change={(e) => {
                optionStore.set(e.currentTarget.value);
              }}
            />
          {/if}
        {:else if Array.isArray(option)}
          <ArraySetting {option} update={optionStore.set} />
        {:else}
          <span>Unknown option type</span>
        {/if}
      {/await}
    </div>
  </div>

  <span class="text-sm text-gray-500"> <slot /> </span>
</li>
