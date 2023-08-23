import * as cheerio from "cheerio";
import { storage } from "webextension-polyfill";

const font = new FontFace(
  "Noto Color Emoji",
  "url(https://raw.githack.com/googlefonts/noto-emoji/main/fonts/NotoColorEmoji.ttf)",
);
document.fonts.add(font);

/*
 * Get the country of origin from the product page
 *
 * Tries getting the information from the cache first
 *
 * @param product The product element from the amazon search page
 *
 * @returns The country of origin or null if not found
 */
export async function getCountryOfOrigin(product: HTMLDivElement, dbID: string) {
  const link = product.querySelector<HTMLAnchorElement>("a.s-item__link");
  const href = link?.href;

  if (!href) {
    return null;
  }

  const data = await fetch(href).then((res) => res.text());

  const country = getCountryFromDoc(data);
  storage.local.set({ [dbID]: country });
  return country;
}

export function getCountryFromDoc(doc: string) {
  const $ = cheerio.load(doc);
  const contains = $('.x-about-this-item *:contains("Country/Region of Manufacture")');
  const countryParentElm = contains.last().closest(".ux-layout-section-evo__col");

  const countryElm = countryParentElm?.children().last();
  const country = countryElm.text().trim();

  return countryElm ? mapCountryNames(country) : null;
}

export function mapCountryNames(name: string) {
  switch (name.toLowerCase()) {
    case "america":
      return "United States";
    case "unknown":
      return null;

    default:
      return name;
  }
}

export function getID(product: HTMLDivElement) {
  return `ebay-${product?.id?.split("item")?.at(1)}`;
}
