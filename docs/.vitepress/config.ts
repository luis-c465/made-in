import imgSize from "markdown-it-imsize";
import { defineConfig } from "vitepress";
// @ts-ignore

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Made In",
  description: "Chrome Extension Documentation & Information",
  lastUpdated: true,
  lang: "en-US",
  markdown: {
    config(md) {
      md.use(imgSize);
    },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/svg+xml",
        href: "/assets/favicon.svg",
      },
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        href: "/assets/favicon.png",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: { src: "/assets/icon.svg", width: 24, height: 24 },
    nav: [
      { text: "Home", link: "/" },
      { text: "Getting Started", link: "/getting-started" },
    ],
    editLink: {
      pattern: "https://github.com/luis-c465/made-in/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2023-present Luis Canada",
    },

    sidebar: [
      {
        text: "Chrome Extension",
        items: [
          { text: "Getting Started", link: "/getting-started" },
          { text: "Options", link: "/options" },
          { text: "Supported Sites", link: "/supported-sites" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="223" viewBox="0 0 256 223"><defs><linearGradient id="logosChromeWebStore0" x1="0%" x2="100%" y1="50%" y2="50%"><stop offset="0%" stop-color="#D93025"/><stop offset="100%" stop-color="#EA4335"/></linearGradient><linearGradient id="logosChromeWebStore1" x1="74.943%" x2="19.813%" y1="95.826%" y2="-4.161%"><stop offset="0%" stop-color="#1E8E3E"/><stop offset="100%" stop-color="#34A853"/></linearGradient><linearGradient id="logosChromeWebStore2" x1="59.898%" x2="21.416%" y1="-.134%" y2="99.86%"><stop offset="0%" stop-color="#FBBC04"/><stop offset="100%" stop-color="#FCC934"/></linearGradient><path id="logosChromeWebStore3" d="M255.983 0H0v204.837c0 9.633 7.814 17.464 17.464 17.464h221.072c9.633 0 17.464-7.814 17.464-17.464L255.983 0Z"/></defs><path fill="#F1F3F4" d="M255.983 0H0v204.837c0 9.633 7.814 17.464 17.464 17.464h221.072c9.633 0 17.464-7.814 17.464-17.464L255.983 0Z"/><path fill="#E8EAED" d="M0 0h255.983v111.74H0z"/><path fill="#FFF" d="M157.076 47.727H98.907A11.63 11.63 0 0 1 87.27 36.09a11.63 11.63 0 0 1 11.637-11.637h58.169a11.63 11.63 0 0 1 11.637 11.637c0 6.417-5.204 11.637-11.637 11.637Z"/><mask id="logosChromeWebStore4" fill="#fff"><use href="#logosChromeWebStore3"/></mask><g mask="url(#logosChromeWebStore4)"><g transform="translate(17.455 94.293)"><path fill="url(#logosChromeWebStore0)" d="m14.812 55.255l15.241 46.498l32.638 36.427l47.845-82.908l95.724-.017C187.146 22.213 151.443 0 110.536 0C69.63 0 33.926 22.213 14.812 55.255Z"/><path fill="url(#logosChromeWebStore1)" d="m110.52 221.105l32.637-36.443l15.224-46.482H62.674L14.812 55.255c-19.047 33.076-20.445 75.128.017 110.561c20.445 35.434 57.545 55.256 95.69 55.29Z"/><path fill="url(#logosChromeWebStore2)" d="M206.26 55.272h-95.724l47.862 82.908l-47.862 82.925c38.162-.033 75.263-19.855 95.708-55.289c20.461-35.433 19.064-77.468.016-110.544Z"/><ellipse cx="110.536" cy="110.544" fill="#F1F3F4" rx="55.255" ry="55.272"/><ellipse cx="110.536" cy="110.544" fill="#1A73E8" rx="44.898" ry="44.915"/></g></g><path fill="#BDC1C6" d="M0 111.74h255.983v1.448H0zm0-1.465h255.983v1.448H0z" opacity=".1"/></svg>`,
        },
        link: "https://chrome.google.com/webstore/detail/made-in/pjphllaelgmpbmhadnfffijoeijlgjpl",
      },
      { icon: "github", link: "https://github.com/luis-c465/made-in" },
    ],
  },
});
