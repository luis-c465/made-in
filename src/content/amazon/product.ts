import { renderProduct } from "~/util/render";
import { getCountryFromDoc } from "./util";

const imgContainer = document.querySelector<HTMLDivElement>("#main-image-container")!;
const country = getCountryFromDoc(document.documentElement.innerHTML);

if (country) {
  renderProduct(imgContainer, country);
}
