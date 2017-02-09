'use strict';

import requestUserScreen from './requestuserscreen';

(function(scope) {
  scope['Twilio'] = scope['Twilio'] || {};
  scope['Twilio']['Video'] = scope['Twilio']['Video'] || {};
  scope['Twilio']['Video'].requestUserScreen = requestUserScreen;
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this);
