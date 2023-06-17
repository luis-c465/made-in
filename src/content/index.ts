import 'construct-style-sheets-polyfill';
import 'webextension-polyfill';
import { config, cssom, observe, twind } from './twind';

const contentRoot = document.createElement('div');
contentRoot.id = 'my-extension-root';
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

// use the shaddow root
