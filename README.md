# Twilio Screen Sharing Extension

This project maintains two components. The source code for the screen sharing extension, and
the source code for the JavaScript API for a web app to request the extension to access the
user's screen. The caviat here is that only a web app hosted on a domain registered with the extension
is allowed to communicate with it. The domain is configured while building the extension.

## Setup

Once you clone the repository, run

```
npm install
```

## Building the Twilio Screen Sharing extension

In order to configure the extension, you can use `scripts/config.<dev|prod>.json`. `config.dev.json` is used
to build an extension that allows `localhost` apps to communicate with it, thereby facilitating testing.
`config.prod.json` is used to build the extension which is for the Chrome Web Store.

```
# Output will be in ./build/extension
ENV=dev|prod npm run build:extension
```

## Building the Twilio Screen Sharing API

The screen sharing API is used by any web app hosted on the domain configured in the extension.
The following snipped specifies the API:

```javascript
/**
 * Request the Twilio Screen Sharing extension for the user's desktop stream.
 * @param {string} extensionId - The extension ID of the Twilio Screen Sharing extension
 * @param {MediaTrackConstraints} [screenConstraints] - Optional constraints for the user's desktop stream.
 * @returns {Promise<MediaStream>}
 */
Twilio.Video.requestUserScreen = function requestUserScreen(extensionId, screenConstraints) {};
```

In order to build the JavaScript API, run

```
# Output will be in ./build/twilio-screenshare.js
npm run build:api
```

## Testing the Twilio Screen Sharing extension

* In order to serve the `localhost` page that tests the extension, run

  ```
  # NOTE: Please kill any previous server with - npm run test:server:stop
  npm run test:server:start
  ```

* In order to start the test, run

  ```
  # NOTE: Before running this script, please close all chrome windows because installing
  # an extension from the command line requires chrome to start up.
  npm run test:extension
  ```
  