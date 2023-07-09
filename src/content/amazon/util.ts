import { flag } from 'country-emoji';
import { storage } from 'webextension-polyfill';
import { getElementByXpath } from '~/util';

/*
 * Get the country of origin from the product page
 *
 * Tries getting the information from the cache first
 *
 * @param product The product element from the amazon search page
 *
 * @returns The country of origin or null if not found
 */
export async function getCountryOfOrigin(product: HTMLDivElement, asin: string) {
  const link = product.querySelector<HTMLAnchorElement>('a.a-link-normal');
  const href = link?.href as string;

  if (!href.includes('dp')) {
    return null;
  }

  const data = await fetch(href).then((res) => res.text());

  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');

  const countryOfOriginElm = getElementByXpath(doc, "//*[contains(text(),'Country of Origin')]");
  if (!countryOfOriginElm) {
    storage.local.set({ [asin]: null });

    return null;
  }

  const parent = countryOfOriginElm.parentElement as HTMLTableRowElement;
  const countryElm = parent.children[1] as HTMLElement;
  if (!countryElm) {
    storage.local.set({ [asin]: null });

    return null;
  }

  const country = countryElm.innerText.trim();
  storage.local.set({ [asin]: country });
  return country;
}

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

  const div = document.createElement('div');
  div.innerText = emoji;
  div.id = 'country-of-origin';

  div.style.position = 'absolute';
  div.style.top = '10';
  div.style.right = '10';
  div.style.fontSize = '2.5rem';
  div.style.zIndex = '1';
  div.title = `Product Country of Origin: ${countryOfOrigin}`;

  product.style.position = 'relative';
  product.prepend(div);
}
