import { version } from "../package.json";
/* istanbul ignore if -- @preserve */
console.log(`Version: ${version}`);

export { DOM_TYPES, h, hString, hFragment } from "./h";
export * from "./utils/index";
