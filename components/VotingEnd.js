var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var VotingEnd = function() {
  var self = this;

  self.icon = 'gavel';

  self.description = 'Represents the end of a voting.'

  self.inPorts = {
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new Port('all')
  };

  self.inPorts.send.on('data', function (data) {
    console.log("voting ended");
    self.outPorts.out.send("voting ended");
  });
};

util.inherits(VotingEnd, Component);

exports.getComponent = function() {
  return new VotingEnd();
};
