var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var D3rect = function() {
  var self = this;
  self.icon = 'fa-rect';
  self.x = 100;
  self.y = 100;
  self.width = 50;
  self.height = 50;
  self.rgbfill = '#34e411';

  self.inPorts = {
    'x': new Port('integer'),
    'y': new Port('integer'),
    'width': new Port('integer'),
    'height': new Port('integer'),
    'rgbfill': new Port('string'),
    'sendobject': new Port('bang')
  };


  self.outPorts = {
    'objd3rect':   new Port('string')
  };

  self.inPorts.x.on('data', function (x) {
    self.x = x;
  });

  self.inPorts.y.on('data', function (y) {
    self.y = y;
  });

  self.inPorts.width.on('data', function (width) {
    self.width = width;
  });

  self.inPorts.height.on('data', function (height) {
    self.height = height;
  });

  self.inPorts.rgbfill.on('data', function (rgbfill) {
    self.rgbfill = rgbfill;
  });

  self.inPorts.sendobject.on('data', function () {
    console.log('sending rect');
    var rect = {
            "type": "rect",
            "x": self.x,
            "y": self.y,
            "width": self.width,
            "height": self.height,
            "rgbfill": self.rgbfill
        }
    self.outPorts.objd3rect.send(JSON.stringify(rect));
  });

};

util.inherits(D3rect, Component);

exports.getComponent = function() {
  return new D3rect();
};
