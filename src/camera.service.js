;(function() {
  'use strict';
  /**
   * @ngdoc service
   * @name ehaCordovaCamera
   * @module eha.cordova.service.camera
   * @description
   *
   * Service providing an API to apache.cordova.camera
   *
   */
  var ngModule = angular.module('eha.cordova.service.camera', [])
  // Pass navigator as a value so that we can more easily stub/mock.
  .value('navigator', navigator)
  .factory('ehaCordovaCamera', function($q, $log, navigator) {

    var defaults = {
      quality: 70,
      correctOrientation: true,
      targetWidth: 550,
      targetHeight: 550,
      destinationType: 0, // DATA_URL
      encodingType: 0 // JPEG
    };

    /**
     * @ngdoc method
     * @name cordovaCamera#getPicture
     * @methodOf eha.common.services.cordova.camera
     * @param {object} options An object of configuration values to be passed to [org.apache.cordova.camera](https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md)
     * @returns {string} A promise that will either resolve with a picture or reject with an exceptions
     * @description
     *
     * Accepts an object of options
     */
    var getPicture = function(opts) {

      if (!navigator.camera) {
        return $q.reject(
          new Error('Camera module (navigator.camera) not available')
        );
      }

      // Extend defaults
      var options = angular.extend(defaults, opts || {});

      return $q(function(resolve, reject) {
        navigator.camera.getPicture(resolve, reject, options);
      });
    };

    // Public API
    return {
      getPicture: getPicture
    };

  });

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule;
  }

}());
