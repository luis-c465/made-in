import { flag } from "country-emoji";

/**
 * Render the country of origin on the product page for the given product element
 */
export function renderProduct(product: HTMLDivElement, countryOfOrigin: string | null) {
  if (!countryOfOrigin) {
    return;
  }

  const emoji = flag(countryOfOrigin);
  if (!emoji) {
    return;
  }

  const div = document.createElement("div");
  div.innerText = emoji;
  div.id = "country-of-origin";

  div.style.position = "absolute";
  div.style.top = "10";
  div.style.right = "10";
  div.style.fontSize = "2.5rem";
  div.style.zIndex = "2";
  div.style.fontFamily = "Noto Color Emoji";

  div.title = `Product Country of Origin: ${countryOfOrigin}`;

  product.style.position = "relative";
  product.prepend(div);
}
