export default function requestUserScreen(extensionId, screenConstraints) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(extensionId, { type: 'requestUserScreen' },
      response => {
        response = response || { type: 'failed', payload: { code: 'PERMISSION_DENIED' } };
        response.type === 'success' ? resolve(response.payload) : reject(response.payload);
      });
  }).then(screenStreamId => {
    var constraints = {
      audio: false,
      video: {
        mandatory: Object.assign({
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: screenStreamId
        }, screenConstraints)
      }
    };
    return navigator.mediaDevices.getUserMedia(constraints);
  });
}
