import * as cheerio from "cheerio";
import { storage } from "webextension-polyfill";
import { mapCountryNames } from "~/util/map";

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
