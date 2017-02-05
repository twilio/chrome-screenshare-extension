const babelify = require('babelify');
const browserify = require('browserify');
const fs = require('fs');

browserify('./src/api/index.js')
  .transform(babelify.configure({ presets: [ 'es2015' ] }))
  .bundle()
  .pipe(fs.createWriteStream('./build/twilio-screenshare.js'));
