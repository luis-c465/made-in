---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Made In"
  text: "Chrome Extension Documentation & Information"
  tagline: "Supporting locally made products one purchase at a time"
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: Supported Sites
      link: /supported-sites
    - theme: alt
      text: Changelog
      link: /changelog
  image:
    src: /icon.svg
    alt: Made In

features:
  - title: Amazon
    icon:
      src: /amazon.svg
    details: View the country of origin for products on Amazon
  - title: Ebay
    icon:
      src: /ebay.svg
    details: View the country of origin for products on Ebay
  - title: + Many more to come
    icon: 🚧
    details: Support for more websites coming soon. If you have a suggestion, please let us know!
    link: https://github.com/luis-c465/made-in/issues/new
    linkText: Submit a suggestion
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #99de67 30%, #2289d7);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #99de67 50%, #2289d7 50%);
  --vp-home-hero-image-filter: blur(40px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(72px);
  }
}
</style>
