var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var CameraPreset = function() {
  var self = this;

  self.icon = 'video-camera';

  self.description = 'Activates a certain preset to the camera controller.'

  self.preset = '';
  self.camID  = '';
  self.faceTracking  = '';

  self.inPorts = {
    "preset": new Port('string'),
    "camID": new Port('string'),
    "faceTracking": new Port('boolean'),
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new ArrayPort('all')
  };

  self.inPorts.preset.on('data', function (data) {
    self.preset = data;
  });
  self.inPorts.camID.on('data', function (data) {
    self.camID = data;
  });
  self.inPorts.faceTracking.on('data', function (data) {
    self.faceTracking = data;
  });

  self.inPorts.send.on('data', function (data) {
    console.log(
      {
        "preset":self.preset,
        "camID":self.camID,
        "faceTracking":self.faceTracking
      });
    self.outPorts.out.send({
        "preset":self.preset,
        "camID":self.camID,
        "faceTracking":self.faceTracking
      });
  });
};

util.inherits(CameraPreset, Component);

exports.getComponent = function() {
  return new CameraPreset();
};
