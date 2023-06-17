import { storage } from 'webextension-polyfill';
import { getCountryOfOrigin, renderProduct } from '~/util/index';
// import { getElementByXpath } from '~/utils/index';

// show welcome page on new install
console.log('Hello from amazon.ts');

async function main() {
  const products = [...document.querySelectorAll<HTMLDivElement>('div[data-asin^="B"]')];
  const ids = products.map((product) => product.dataset.asin as string);

  const defaultValues = Object.fromEntries(ids.map((id) => [id, null]));
  const cache = await storage.local.get(defaultValues);

  const promises = products.map(async (product) => {
    const asin = product.dataset.asin as string;
    const country = cache[asin] !== null ? cache[asin] : await getCountryOfOrigin(product, asin);
    renderProduct(product, country);
  });

  const pagination = document.querySelector<HTMLDivElement>('.s-pagination-strip');
  pagination?.addEventListener('click', () => {
    console.log('pagination clicked');
    const interval = setInterval(() => {
      const elm = document.querySelector<HTMLDivElement>('.s-result-list-placeholder');
      if (elm?.classList.contains('aok-hidden')) {
        clearInterval(interval);

        main();
      }
    }, 300);
  });

  try {
    await Promise.allSettled(promises);
  } catch (e) {
    console.log('something went wrong');
    console.error(e);
  }
}

main();
