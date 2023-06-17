export const isDev = process.env.NODE_ENV === 'development';

export function getElementByXpath(doc: Document, path: string) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue as Element | null;
}
