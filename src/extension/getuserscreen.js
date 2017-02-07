'use strict';

/**
 * Get the stream id of the user's desktop stream.
 * @param {Array<string>} sources - Possible capture sources ('screen', 'window', 'tab', or 'audio')
 * @param {*} tab - The browser tab that is allowed to use the desktop stream
 * @returns {Promise<string>}
 */
export default function getUserScreen(sources, tab) {
  return new Promise((resolve, reject) => {
    chrome.desktopCapture.chooseDesktopMedia(sources, tab,
      streamId => streamId ? resolve(streamId) : reject());
  });
}
