var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var DelegateOffSeat = function() {
  var self = this;

  self.icon = 'level-up';

  self.description = 'A certain delegate standing up.'

  self.delegate = '';

  self.inPorts = {
    "delegate": new Port('object'),
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new ArrayPort('all')
  };

  self.inPorts.delegate.on('data', function (data) {
    self.delegate = data;
  });

  self.inPorts.send.on('data', function (data) {
    console.log("Delegate standing up");
    self.outPorts.out.send("Delegate standing up");
  });
};

util.inherits(DelegateOffSeat, Component);

exports.getComponent = function() {
  return new DelegateOffSeat();
};
