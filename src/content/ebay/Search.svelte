<script lang="ts">
  import Popup from "~/components/Popup.svelte";
  import { isVisible } from "~/util";
  import { getCountryOfOrigin } from "./util";

  function getElements() {
    return Array.from(document.querySelectorAll<HTMLDivElement>(".srp-results > li.s-item")).filter(
      isVisible
    );
  }

  function getID(product: HTMLDivElement) {
    return `ebay-${product?.id?.split("item")?.at(1)}`;
  }
</script>

<Popup {getElements} {getID} {getCountryOfOrigin} />
