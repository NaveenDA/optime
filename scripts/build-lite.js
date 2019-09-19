/**
 * Build Script for produce Optime Lite version
 */
const autoprefixer = require("autoprefixer");
const postcss = require("postcss");
const postcssFocus = require("postcss-focus");
const fs = require("fs");
const postcssNormalize = require("postcss-normalize");
const path = require("path");
const sass = require("node-sass");
const CleanCSS = require("clean-css");
/**
 * @todo
 * 1. Compile all scss into css
 * 2. Apply focus Plugin
 * 3. Apply autoprefixer plugin
 * 4. Create the minify source
 */
const outputFilePath = path.join(__dirname, "../dist/css/optime-lite.css");
/**
 * Map file is reallly helpfull for debugging,
 * when you are working with css/js pre-processor
 * @link https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps
 */
const mapFilePath = path.join(__dirname, "../dist/css/optime-lite.css.map");
/**
 * Compile the scss into css
 */
sass.render(
  {
    file: path.join(__dirname, "../src/scss/optime-lite.scss"),
    outputStyle: "expanded",
    sourceMap: true,
    sourceMapContents: true,
    precision: 6,
    outFile: outputFilePath
  },
  (err, result) => {
    /**
     * If any error get, while compile the scss
     * Need to throw those error
     */
    if (err) {
      throw new Error(err);
    }
    fs.writeFileSync(outputFilePath, result.css);
    if (result.map) {
      fs.writeFileSync(mapFilePath, result.map);
    }
    /**
     * since already we compile all the scss files into css,
     * so we directly work on the dist css file
     *  */
    /**
     * Read the file dist folder
     */
    fs.readFile(outputFilePath, (err, css) => {
      /**
       * If any error get, while read the source,
       * Need to throw those error
       */
      if (err) {
        throw new Error(err);
      }
      /**
       * Process the source with post css
       * Plugin Order
       * 1. PostcssFocus - Add :focus selector where the :hover selector is used.
       * 2. Autoprefixer - Add vendorprefix based on browserist configuration
       * 3. postcssNormalize - Add default cross-browser default styling of HTML elements.
       */
      postcss([postcssFocus, autoprefixer, postcssNormalize])
        /**
         * Since the scss already complied so, use both input and output files are same.
         */
        .process(css, {
          from: outputFilePath,
          to: outputFilePath
        })
        .then(result => {
          /**
           * Need to write the output in output files
           */
          fs.writeFile(outputFilePath, result.css, () => {
            console.log("Optime Lite Version is ready ✌");
            /**
             * If it provides map, need to add map write also
             */
            if (result.map) {
              fs.writeFile(mapFilePath, result.map, () => {
                console.log("Optime Lite Version (🗺) Map file is ready ✌️");
              });
              /**
               * Minify the optime-lite.css into optime-lite.min.css
               */
              new CleanCSS({
                level: 1,
                breakWith: "lf"
              }).minify(
                [path.join(__dirname, "../dist/css/optime-lite.css")],
                (err, output) => {
                  /**
                   * If any error get, while read the source,
                   * Need to throw those error
                   */
                  if (err) {
                    throw new Error(err);
                  }

                  fs.writeFile(
                    path.join(__dirname, "../dist/css/optime-lite.min.css"),
                    output.styles,
                    err => {
                      console.log(
                        "Optime Lite version compressed successfuly 🙂"
                      );
                    }
                  );
                }
              );
            }
          });
        });
    });
  }
);
