<script lang="ts">
  import Popup from "~/components/Popup.svelte";
  import { isVisible } from "~/util";
  import { getCountryOfOrigin } from "./util";

  function getElements() {
    return Array.from(
      document.querySelectorAll<HTMLDivElement>('.s-search-results > div[data-asin^="B"]')
    ).filter(isVisible);
  }

  function getID(product: HTMLDivElement) {
    return `amazon-${product.dataset.asin}`;
  }
</script>

<Popup {getElements} {getID} {getCountryOfOrigin} />
