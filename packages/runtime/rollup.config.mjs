import cleanup from "rollup-plugin-cleanup";
import filesize from "rollup-plugin-filesize";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.js",
  plugins: [cleanup(), json()],
  output: [
    {
      file: "dist/biblio.js",
      format: "esm",
      plugins: [filesize()],
    },
  ],
};
