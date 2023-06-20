import { defineManifest } from '@crxjs/vite-plugin';
import { version } from '../package.json';

// NOTE: do not include src/ in paths,
// vite root folder: src, public folder: public (based on the project root)
// @see ../vite.config.ts#L16

const amazonSearchHost = 'www.amazon.com/s';

const icons: Record<string, string> = {
  '16': 'images/icon16.png',
  '32': 'images/icon32.png',
  '48': 'images/icon48.png',
  '128': 'images/icon128.png',
};

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${env.mode === 'development' ? '[Dev] ' : ''} Made in`,
  description: 'Made in',
  version,
  background: {
    service_worker: 'background/index.ts',
  },
  content_scripts: [
    {
      matches: [`https://${amazonSearchHost}*`, `https://${amazonSearchHost}*`, 'file:///*'],
      js: ['content/amazon.ts'],
    },
  ],
  host_permissions: ['<all_urls>'],
  options_ui: {
    page: 'options/options.html',
    open_in_tab: true,
  },
  web_accessible_resources: [
    {
      resources: [
        // this file is web accessible; it supports HMR b/c it's declared in `rollupOptions.input`
        'welcome/welcome.html',
      ],
      matches: ['<all_urls>'],
    },
  ],
  action: {
    default_popup: 'popup/popup.html',
    default_icon: icons,
  },
  icons,
  permissions: ['storage', 'tabs'],
}));

export default manifest;
