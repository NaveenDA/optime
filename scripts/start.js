/**
 * Start Scripts
 * @todo
 *  - Compile the SCSS to CSS
 *  - Add Autoprefixer
 *  - Add Focus Function
 *  - Intialize Docs Server
 *  - Settingup  the watch for scss files and rebuild the docs
 *
 */

const sass = require("node-sass");
const shell = require('shelljs');
/**
 * Compile the SCSS to CSS
 */
sass.renderSync({
  outputStyle: "expanded",
  sourceMap: true,
  sourceMapContents: true,
  precision: 6,
  file: "src/scss/optime.scss",
  outFile: "dist/css/optime.css"
});

/**
 *  Add Autoprefixer
 */
shell.exec('npm run ')