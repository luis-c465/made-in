import { defineManifest } from "@crxjs/vite-plugin";
import { version } from "../package.json";

// NOTE: do not include src/ in paths,
// vite root folder: src, public folder: public (based on the project root)
// @see ../vite.config.ts#L16

const icons: Record<string, string> = {
  "16": "images/icon16.png",
  "32": "images/icon32.png",
  "48": "images/icon48.png",
  "128": "images/icon128.png",
};

const amazonSearch = withHttps("www.amazon.com/s*");
const amazonProduct = withHttps("www.amazon.com/*/dp*");
const ebaySearch = withHttps("www.ebay.com/sch*");

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${env.mode === "development" ? "[Dev] " : ""} Made in`,
  description: "Shows the country of origin on the products page of Amazon & Ebay",
  version,
  content_scripts: [
    {
      matches: amazonSearch,
      js: ["content/amazon/index.ts"],
    },
    {
      matches: amazonProduct,
      js: ["content/amazon/product.ts"],
    },
    {
      matches: ebaySearch,
      js: ["content/ebay/search.ts"],
    },
  ],
  host_permissions: [...amazonSearch, ...amazonProduct],
  options_ui: {
    page: "options/options.html",
    open_in_tab: true,
  },
  action: {
    default_popup: "popup/popup.html",
    default_icon: icons,
  },
  icons,
  permissions: ["storage"],
}));

function withHttps(url: string) {
  return [`https://${url}`, `http://${url}`];
}

export default manifest;
