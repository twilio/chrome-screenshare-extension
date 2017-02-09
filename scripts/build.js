const babelify = require('babelify');
const browserify = require('browserify');
const fs = require('fs');
const handlebars = require('handlebars');
const manifest = require('../src/manifest.json');
const package = require('../package.json');

const env = process.env['ENV'] === 'dev' ? 'dev' : 'prod';
const target = process.env['TARGET'] === 'api' ? 'api' : 'extension';
const config = require(`./config.${env}.json`);
const version = env === 'dev' ? package.version.split('-')[0] : package.version;

/**
 * Write the given text to a file.
 * @param {string} path - File path
 * @param {string} text - Text to be written
 * @returns {Promise<void>}
 */
function writeToFile(path, text) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, text, 'utf8', err => err ? reject(err) : resolve());
  });
}

/**
 * Generate aggregated es5 JavaScript file.
 * @param {string} entryPath - Browserify entry file path
 * @param {string} outPath - Path of the output JS file
 */
function generateAggregatedES5JavaScript(entryPath, outPath) {
  browserify(entryPath)
    .transform(babelify.configure({ presets: [ 'es2015' ] }))
    .bundle()
    .pipe(fs.createWriteStream(outPath));
}

/**
 * Generate JSON file from a configured template.
 * @param {string} templatePath - Path of the JSON template
 * @param {string} outPath - Path of the generated JSON
 * @returns {Promise.<void>}
 */
function generateJSONFromTemplate(templatePath, outPath) {
  var template = JSON.stringify(require(`../${templatePath}`), null, 2);
  var hbsTemplate = handlebars.compile(template, { noEscape: true });
  return writeToFile(outPath, hbsTemplate(Object.assign({ version: version }, config)));
}

switch (target) {
  case 'api':
    generateAggregatedES5JavaScript('./src/api/index.js', './build/twilio-screenshare.js');
    break;
  case 'extension':
    generateJSONFromTemplate('./src/manifest.json', './build/extension/manifest.json')
      .then(() => generateAggregatedES5JavaScript('./src/extension/index.js', './build/extension/background.js'))
      .catch(err => console.error(err));
    break;
}
