export const isDev = process.env.NODE_ENV === 'development';

export function getElementByXpath(doc: Document, path: string) {
  return doc.evaluate(path, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
    .singleNodeValue as Element | null;
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
