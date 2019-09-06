const fs = require("fs");
const path = require("path");
/**
 * Get Command line Arguments
 */
var args = process.argv.slice(2);

const regex = / <!-- include\s(.*?)-->/gm;
const filecontent = fs.readFileSync(
  path.join(__dirname, "..", "/docs/main.html")
);

let m;
const outputContents = [];

while ((m = regex.exec(filecontent)) !== null) {
  // This is necessary to avoid infinite loops with zero-width matches
  if (m.index === regex.lastIndex) {
    regex.lastIndex++;
  }
  if (m.length == 2) {
    outputContents.push({
      name: m[0],
      content: fs
        .readFileSync(
          path.join(__dirname, "..", "/docs/", m[1].toString().trim())
        )
        .toString()
    });
  }
}

fs.copyFileSync(
  path.join(__dirname, "..", "/docs/main.html"),
  path.join(__dirname, "..", "/docs/public/index.html")
);
let content = fs
  .readFileSync(path.join(__dirname, "..", "/docs/public/index.html"))
  .toString();

outputContents.forEach(config => {
  content = content.replace(config.name.trim(), config.content);
});



fs.writeFileSync(
  path.join(__dirname, "..", "/docs/public/index.html"),
  content
);
