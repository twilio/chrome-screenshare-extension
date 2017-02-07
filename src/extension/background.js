'use strict';

import EventEmitter from 'events';

/**
 * Listens for screen sharing requests from configured domain.
 * @class
 * @extends EventEmitter
 * @fires Background#screenRequest
 */
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

/**
 * Your {@link Background} has received a new screen sharing request.
 * @param {*} tab - The tab that sent the request
 * @param {function} respond - The function to send a response to the tab the sent the request
 * @event Background#screenRequest
 */

export default new Background();
