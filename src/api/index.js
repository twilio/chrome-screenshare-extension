import requestUserScreen from '../modules/requestuserscreen';

(function(scope) {
  scope['Twilio'] = scope['Twilio'] || {};
  scope['Twilio'].requestUserScreen = requestUserScreen;
})(window);
