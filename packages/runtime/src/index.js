import { version } from "../package.json";
/* istanbul ignore if -- @preserve */
console.log(`Version: ${version}`);

export { DOM_TYPES, h, hString, hFragment } from "./h";
export { mountDom, destroyDom } from "./dom/index";
export * from "./utils/index";
