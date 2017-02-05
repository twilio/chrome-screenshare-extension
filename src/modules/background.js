import EventEmitter from 'events';

class Background extends EventEmitter {
  constructor() {
    super();
    chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
      switch (message.type) {
        case 'requestUserScreen':
          this.emit('screenRequest', sender.tab, sendResponse);
          break;
        default:
          sendResponse({ type: 'failed', payload: { code: 'BAD_REQUEST' } });
          break;
      }
      return true;
    });
  }
}

export default new Background();
