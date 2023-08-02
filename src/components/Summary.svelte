<script lang="ts">
  import SummaryClickable from '~/components/SummaryClickable.svelte';
  import type { Data } from '~/util/types';

  export let data: Data[];
  $: summary = Object.entries(
    data
      .filter(Boolean)
      .filter(({ country }) => !!country)
      .reduce<{
        [country: string]: {
          count: number;
          data: Data[];
        };
      }>((acc, data) => {
        if (acc[data.country] === undefined) {
          acc[data.country] = {
            count: 1,
            data: [data],
          };
        } else {
          const tmp = acc[data.country];
          tmp.count++;
          tmp.data.push(data);
        }

        return acc;
      }, {})
  ).sort(([_1, a], [_2, b]) => b.count - a.count);

  $: console.log({ data, summary });
</script>

<div class="overflow-y-auto h-fit max-h-[50px] flex flex-wrap gap-1">
  {#each summary as [country, { count, data }] (country)}
    <SummaryClickable {country} {data} {count} />
  {/each}
</div>
