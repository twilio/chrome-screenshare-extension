const babelify = require('babelify');
const browserify = require('browserify');
const fs = require('fs');
const handlebars = require('handlebars');
const manifest = require('../src/manifest.json');
const package = require('../package.json');

const domain = process.argv[3];
const proto = process.argv[2];

function writeToFile(path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, 'utf8', err => err ? reject(err) : resolve());
  });
}

function buildExtensionSource() {
  browserify('./src/background/index.js')
    .transform(babelify.configure({ presets: [ 'es2015' ] }))
    .bundle()
    .pipe(fs.createWriteStream('./build/extension/background.js'));
}

function buildExtensionManifest() {
  var manifestTemplate = handlebars.compile(JSON.stringify(manifest, null, 2), { noEscape: true });
  return writeToFile('./build/extension/manifest.json', manifestTemplate({
    name: package.name,
    description: package.description,
    version: package.version,
    domain: domain,
    proto: proto
  }));
}

buildExtensionManifest().then(buildExtensionSource, err => console.error(err));
