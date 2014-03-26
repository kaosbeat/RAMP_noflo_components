var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var VotingResults = function() {
  var self = this;

  self.icon = 'bar-chart-o';

  self.description = 'The results of the voting are collected and ready.'

  self.inPorts = {
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new ArrayPort('all')
  };

  self.inPorts.send.on('data', function (data) {
    console.log("voting results");
    self.outPorts.out.send("voting results");
  });
};

util.inherits(VotingResults, Component);

exports.getComponent = function() {
  return new VotingResults();
};
