/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('agwUi')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('_', window._)
    .constant('ngSnap', window.Snap);

})();
