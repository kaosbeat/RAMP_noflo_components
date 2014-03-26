var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var MeetingStart = function() {
  var self = this;

  self.icon = 'users';

  self.description = 'Represents the starting event of a meeting.'

  self.inPorts = {
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new ArrayPort('all')
  };

  self.inPorts.send.on('data', function (data) {
    console.log("meeting started");
    self.outPorts.out.send("meeting started");
  });
};

util.inherits(MeetingStart, Component);

exports.getComponent = function() {
  return new MeetingStart();
};
