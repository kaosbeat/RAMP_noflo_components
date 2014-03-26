var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var MeetingEnd = function() {
  var self = this;

  self.icon = 'users';

  self.description = 'Represents the end of a meeting.'

  self.inPorts = {
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new ArrayPort('all')
  };

  self.inPorts.send.on('data', function (data) {
    console.log("meeting ended");
    self.outPorts.out.send("meeting ended");
  });
};

util.inherits(MeetingEnd, Component);

exports.getComponent = function() {
  return new MeetingEnd();
};
