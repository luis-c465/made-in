import { flag } from 'country-emoji';
// import { getElementByXpath } from '~/utils/index';

// show welcome page on new install
console.log('Hello from amazon.ts');
const products = [...document.querySelectorAll<HTMLDivElement>('div[data-component-type]')];

const promises = products.map(async (product) => {
  const link = product.querySelector<HTMLAnchorElement>('a.a-link-normal');
  const href = link?.href as string;

  const data = await fetch(href).then((res) => res.text());

  const parser = new DOMParser();
  const doc = parser.parseFromString(data, 'text/html');

  const countryOfOriginElm = getElementByXpath(doc, "//*[contains(text(),'Country of Origin')]");
  if (!countryOfOriginElm) {
    return null;
  }

  const parent = countryOfOriginElm.parentElement as HTMLTableRowElement;
  const country = parent.children[1] as HTMLElement;
  if (!country) {
    return;
  }

  const emoji = flag(country.innerText.trim());
  if (!emoji) {
    return;
  }

  const div = document.createElement('div');
  div.innerText = emoji;
  div.id = 'country-of-origin';

  div.style.position = 'absolute';
  div.style.top = '10';
  div.style.right = '10';
  div.style.fontSize = '2rem';

  product.style.position = 'relative';
  product.prepend(div);
});

async function main() {
  try {
    await Promise.allSettled(promises);
  } catch (e) {
    console.log('something went wrong');
    console.error(e);
  }
}

main();

function getElementByXpath(doc: Document, path: string) {
  return doc.evaluate(path, doc.body, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue as Element | null;
}
