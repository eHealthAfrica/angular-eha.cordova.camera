/*jshint expr: true*/
describe('Camera module', function() {
  'use strict';

  var navigatorMock = {};
  var $scope;
  var service;

  beforeEach(module('eha.cordova.service.camera', function($provide) {
    $provide.value('navigator', navigatorMock);
  }));

  beforeEach(inject(function(_ehaCordovaCamera_, _$rootScope_) {
    service = _ehaCordovaCamera_;
    $scope = _$rootScope_.$new();
  }));

  describe('Camera module not available', function() {
    var service;

    beforeEach(inject(function(_ehaCordovaCamera_) {
      service = _ehaCordovaCamera_;
    }));

    describe('getPicture()', function() {
      it('should throw an error', function(done) {
        service.getPicture()
          .should
          .be
          .rejectedWith(
            'Camera module (navigator.camera) not available'
          ).and.notify(done);

        $scope.$digest();
      });
    });
  });

  describe('Camera module available', function() {
    var picture;
    var uri;

    uri = 'I AM A URI';
    picture = 'I AM A PICTURE';

    beforeEach(function() {
      navigatorMock.camera = {
        getPicture: function(resolve, reject, options) {
          var result;
          if (options.destinationType === 0) { // DATA_URL
            result = picture;
          } else if (options.destinationType === 1) { // FILE_URI
            result = uri;
          }
          resolve(result);
        }
      };
      sinon.spy(navigatorMock.camera, 'getPicture');
    });

    describe('getPicture()', function() {
      it('should call navigatorMock.camera.getPicture()', function(done) {
        service.getPicture().should.eventually.equal(picture).and.notify(done);
        $scope.$digest();
        navigatorMock.camera.getPicture.should.have.been.called;
      });

      it('should obey passed options', function(done) {
        service.getPicture({
          destinationType: 1
        }).should.eventually.equal(uri).and.notify(done);
        $scope.$digest();
        navigatorMock.camera.getPicture.should.have.been.called;
      });
    });
  });
});
