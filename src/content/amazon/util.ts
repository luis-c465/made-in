import * as cheerio from 'cheerio';
import { flag } from 'country-emoji';
import { storage } from 'webextension-polyfill';

new FontFace(
  'Noto Color Emoji',
  'https://raw.githack.com/googlefonts/noto-emoji/main/fonts/NotoColorEmoji.ttf'
);

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
  const $ = cheerio.load(data);
  const contains = $('*:contains("Country of Origin")');
  const countryParentElm = contains.last().parent();

  const countryElm = countryParentElm?.children().last();
  const country = countryElm.text().trim();

  if (!countryElm) {
    storage.local.set({ [asin]: null });

    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
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
  div.style.fontFamily = 'Noto Color Emoji';

  div.title = `Product Country of Origin: ${countryOfOrigin}`;

  product.style.position = 'relative';
  product.prepend(div);
}

export function isVisible(element: HTMLElement) {
  return element.offsetWidth > 0 || element.offsetHeight > 0 || element.getClientRects().length > 0;
}
