import { getCountryFromDoc, renderProduct } from './util';

const font = new FontFace(
  'Noto Color Emoji',
  'url(https://raw.githack.com/googlefonts/noto-emoji/main/fonts/NotoColorEmoji.ttf)'
);
document.fonts.add(font);

const imgContainer = document.querySelector<HTMLDivElement>('#main-image-container')!;
const country = getCountryFromDoc(document.documentElement.innerHTML);

if (country) {
  renderProduct(imgContainer, country);
}
