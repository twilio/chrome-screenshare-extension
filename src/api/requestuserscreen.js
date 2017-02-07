'use strict';

/**
 * Request the Twilio Screen Sharing extension for the user's desktop stream.
 * @param {string} extensionId - The extension ID of the Twilio Screen Sharing extension
 * @param {MediaTrackConstraints} [screenConstraints] - Optional constraints for the user's desktop stream.
 * @returns {Promise<MediaStream>}
 */
export default function requestUserScreen(extensionId, screenConstraints) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(extensionId, { type: 'requestUserScreen' }, response => {
      response = response || { type: 'failed', payload: { code: 'PERMISSION_DENIED' } };
      response.type === 'success' ? resolve(response.payload) : reject(response.payload);
    });
  }).then(screenStreamId => {
    var mandatory = Object.assign({
      chromeMediaSource: 'desktop',
      chromeMediaSourceId: screenStreamId
    }, screenConstraints);

    return navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { mandatory: mandatory }
    });
  });
}
