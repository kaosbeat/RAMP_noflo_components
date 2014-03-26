var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var DelegateOnSeat = function() {
  var self = this;

  self.icon = 'level-down';

  self.description = 'A certain delegate is just seated.'

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
    console.log("Delegate seated");
    self.outPorts.out.send("Delegate seated");
  });
};

util.inherits(DelegateOnSeat, Component);

exports.getComponent = function() {
  return new DelegateOnSeat();
};
