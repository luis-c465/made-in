import * as cheerio from "cheerio";
import { storage } from "webextension-polyfill";

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
  const link = product.querySelector<HTMLAnchorElement>("a.a-link-normal");
  const href = link?.href as string;

  if (!href.includes("dp")) {
    return null;
  }

  const data = await fetch(href).then((res) => res.text());

  const country = getCountryFromDoc(data);
  storage.local.set({ [asin]: country });
  return country;
}

export function getCountryFromDoc(doc: string) {
  const $ = cheerio.load(doc);
  const contains = $('*:contains("Country of Origin")');
  const countryParentElm = contains.last().parent();

  const countryElm = countryParentElm?.children().last();
  const country = countryElm.text().trim();

  return countryElm ? country : null;
}
