const babelify = require('babelify');
const browserify = require('browserify');
const fs = require('fs');
const handlebars = require('handlebars');
const manifest = require('../src/manifest.json');
const package = require('../package.json');

const env = process.argv[2];
const config = require(`./config.${env}.json`);
const version = env === 'dev' ? package.version.split('-')[0] : package.version;

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
  return writeToFile('./build/extension/manifest.json',
    manifestTemplate(Object.assign({ version: version }, config)));
}

buildExtensionManifest().then(buildExtensionSource, err => console.error(err));
