var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var VotingStart = function() {
  var self = this;

  self.icon = 'gavel';

  self.description = 'Represents the starting event of a voting.'

  self.inPorts = {
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new Port('all')
  };

  self.inPorts.send.on('data', function (data) {
    console.log("voting started");
    self.outPorts.out.send("voting started");
  });
};

util.inherits(VotingStart, Component);

exports.getComponent = function() {
  return new VotingStart();
};
