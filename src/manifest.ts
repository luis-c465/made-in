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

const activateOn = [`https://${amazonSearchHost}*`, `https://${amazonSearchHost}*`, 'file:///*'];

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${env.mode === 'development' ? '[Dev] ' : ''} Made in`,
  description: 'Made in',
  version,
  content_scripts: [
    {
      matches: activateOn,
      js: ['content/amazon/index.ts'],
    },
  ],
  host_permissions: activateOn,
  options_ui: {
    page: 'options/options.html',
    open_in_tab: true,
  },
  action: {
    default_popup: 'popup/popup.html',
    default_icon: icons,
  },
  icons,
  permissions: ['storage'],
}));

export default manifest;
