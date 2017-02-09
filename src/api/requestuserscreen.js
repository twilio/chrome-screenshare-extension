'use strict';

/**
 * Send a request to the Screen Sharing extension for access to the user's desktop.
 * @param {string} extensionId - The extension ID of the Twilio Screen Sharing extension
 * @returns {Promise<string>} ID of the desktop stream
 */
function sendUserScreenRequest(extensionId) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(extensionId, { type: 'requestUserScreen' }, response => {
      response = response || { type: 'failed', payload: { code: 'PERMISSION_DENIED' } };
      response.type === 'success' ? resolve(response.payload) : reject(response.payload);
    });
  });
}

/**
 * Request the Twilio Screen Sharing extension for the user's desktop stream.
 * @param {string} extensionId - The extension ID of the Twilio Screen Sharing extension
 * @param {MediaTrackConstraints} [screenConstraints] - Optional constraints for the user's desktop stream.
 * @returns {Promise<MediaStream>}
 */
export default function requestUserScreen(extensionId, screenConstraints) {
  return sendUserScreenRequest(extensionId).then(desktopMediaSourceId => {
    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: Object.assign({
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: desktopMediaSourceId
        }, screenConstraints)
      }
    });
  });
}
