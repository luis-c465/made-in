<script lang="ts">
  export let option: string[];
  export let update: (newOption: string[]) => void;
</script>

<ol class="w-full flex flex-col gap-2 grow z-10 overflow-y-visible self-start">
  {#each option as opt, i}
    <input
      value={opt}
      on:keydown={(e) => {
        e.key === 'Backspace' && opt === '' && option.splice(i, 1);
        e.key === 'Enter' && option.push('');

        update(option);
      }}
      on:change={(e) => {
        option[i] = e.currentTarget.value;
        update(option);
      }}
    />
  {/each}

  <input
    type="text"
    placeholder="Add new"
    on:keydown={(e) => {
      if (e.key === 'Enter') {
        e.currentTarget.value = '';

        update([...option, e.currentTarget.value]);
      }
    }}
  />
</ol>
