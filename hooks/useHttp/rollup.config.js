const path = require("path");
const { terser } = require("rollup-plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const { getBuildDirectories } = require("../../rollup.utils");
const { name } = require("./package.json");

module.exports = function rollup() {
  const { SOURCE_DIR, OUTPUT_DIR } = getBuildDirectories(name);

  // JS modules for bundlers
  const modules = [
    {
      input: `${SOURCE_DIR}/index.ts`,
      output: {
        file: `${OUTPUT_DIR}/index.js`,
        format: "esm",
      },
    },
  ];

  // JS modules for <script type=module>
  const webModules = [
    {
      input: `${SOURCE_DIR}/index.ts`,
      output: {
        file: `${OUTPUT_DIR}/index.esm.js`,
        format: "esm",
      },
      plugins: [
        typescript({
          tsconfig: path.join(__dirname, "tsconfig.json"),
          noEmitOnError: true,
        }),
        terser(),
      ],
    },
  ];

  // UMD modules for <script> tags and CommonJS (node)
  const globals = [
    {
      input: `${SOURCE_DIR}/index.ts`,
      output: {
        file: `${OUTPUT_DIR}/index.umd.js`,
        format: "umd",
        name: "RbtUseHttp",
      },
    },
  ];

  return [...modules, ...webModules, ...globals];
};
