<script lang="ts">
  import { flag, name } from "country-emoji";
  import SummaryClickable from "~/components/SummaryClickable.svelte";
  import { cleanString } from "~/content/amazon/util";
  import type { Data } from "~/util/types";

  export let data: Data[];
  $: summary = Object.entries(
    data
      .filter(Boolean)
      .filter(({ country }) => !!country)
      .map((data) => ({
        ...data,
        country: name(flag(cleanString(data.country)) ?? data.country) ?? data.country,
      }))
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
