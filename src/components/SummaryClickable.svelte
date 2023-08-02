<script lang="ts">
  import { flag } from 'country-emoji';
  import { driver, type DriveStep } from 'driver.js';
  import 'driver.js/dist/driver.css';
  import type { Data } from '~/util/types';

  export let country: string;
  export let data: Data[];
  export let count: number;

  let index = 0;

  function onClick() {
    const steps: DriveStep[] = data.map((data) => ({
      element: data.product,
      popover: {
        title: `${flag(data.country)} ${data.country}`,
        side: 'top',
        align: 'center',
      },
    }));

    const driverObj = driver({
      showProgress: true,
      animate: true,
      onNextClick() {
        if (index === data.length - 1) {
          index = 0;
        } else {
          index++;
        }

        driverObj.moveNext();
      },
      onPrevClick() {
        if (index === 0) {
          index = data.length - 1;
        } else {
          index--;
        }

        driverObj.movePrevious();
      },
      steps,
    });

    driverObj.drive(index);
  }
</script>

<div>
  <button class="flex text-lg gap-1" title={country} on:click={onClick}>
    <span style="font-family: Noto Color Emoji;">{flag(country)}</span>
    <span>{count}</span>
  </button>
</div>
