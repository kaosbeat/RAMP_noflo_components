var util      = require('util');
var noflo     = require('noflo');
var ArrayPort = noflo.ArrayPort;
var Port      = noflo.Port;
var Component = noflo.Component;


var TopicChange = function() {
  var self = this;

  self.icon = 'list-alt';

  self.description = 'The current topic changed.'

  self.inPorts = {
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new ArrayPort('all')
  };

  self.inPorts.send.on('data', function (data) {
    console.log("Agenda switch");
    self.outPorts.out.send("Agenda switch");
  });
};

util.inherits(TopicChange, Component);

exports.getComponent = function() {
  return new TopicChange();
};
