export default function getUserScreen(sources, tab) {
  return new Promise((resolve, reject) => {
    chrome.desktopCapture.chooseDesktopMedia(sources, tab,
      streamId => streamId ? resolve(streamId) : reject());
  });
}
