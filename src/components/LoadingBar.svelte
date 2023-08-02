<script>
  export let width = 0;
</script>

<div class="flex flex-col gap-1">
  <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div
      class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
      style="width: {width}%"
    >
      <slot />
    </div>
  </div>
</div>
