import 'construct-style-sheets-polyfill';
import 'webextension-polyfill';
import { config, cssom, observe, twind } from './twind';

/**
 * Returns a shadow root with a shadow wrapper element for the content script.
 */
export function getShadowWrapper() {
  const contentRoot = document.createElement('div');
  contentRoot.id = 'made-in-extension-root';
  contentRoot.style.display = 'contents';
  document.body.append(contentRoot);

  const shadowRoot = contentRoot.attachShadow({ mode: 'open' });
  const shadowWrapper = document.createElement('div');
  shadowWrapper.id = 'root';
  shadowWrapper.style.display = 'contents';
  shadowRoot.appendChild(shadowWrapper);

  const sheet = cssom(new CSSStyleSheet());
  const tw = twind(config, sheet);
  shadowRoot.adoptedStyleSheets = [sheet.target];
  observe(tw, shadowRoot);

  return shadowRoot;
}
