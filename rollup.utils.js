const path = require("path");
const fse = require("fs-extra");

const toCamelCase = (str) => {
  let s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join("");
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

/**
 * Determine the relevant directories for a rollup build, relative to the
 * current working directory and taking LOCAL_BUILD_DIRECTORY into account
 *
 * ROOT_DIR     Root directory for the react-router repo
 * SOURCE_DIR   Source package directory we will read input files from
 * OUTPUT_DIR   Destination directory to write rollup output to
 *
 * @param {string} packageName  npm package name (i.e., @rbt-utils-hooks/useHttp)
 * @param {string} [folderName] folder name (i.e., useHttp). Defaults to package name
 */
function getBuildDirectories(packageName, folderName) {
  let ROOT_DIR = __dirname;
  let SOURCE_DIR = folderName
    ? path.join(__dirname, "packages", folderName)
    : path.join(__dirname, "packages", toCamelCase(packageName.split("/")[1]));

  // Update if we're not running from root
  if (process.cwd() !== __dirname) {
    ROOT_DIR = path.dirname(path.dirname(process.cwd()));
    SOURCE_DIR = process.cwd();
  }

  let OUTPUT_DIR = path.join(SOURCE_DIR, "dist");

  if (process.env.LOCAL_BUILD_DIRECTORY) {
    try {
      let nodeModulesDir = path.join(
        process.cwd(),
        process.env.LOCAL_BUILD_DIRECTORY,
        "node_modules"
      );
      fse.readdirSync(nodeModulesDir);
      OUTPUT_DIR = path.join(nodeModulesDir, ...packageName.split("/"), "dist");
    } catch (e) {
      console.error(
        "Oops! You pointed LOCAL_BUILD_DIRECTORY to a directory that " +
          "does not have a node_modules/ folder. Please `npm install` in that " +
          "directory and try again."
      );
      process.exit(1);
    }
  }

  return { ROOT_DIR, SOURCE_DIR, OUTPUT_DIR };
}

module.exports = {
  getBuildDirectories,
};
