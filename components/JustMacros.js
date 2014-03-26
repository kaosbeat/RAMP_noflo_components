var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var JustMacros = function() {
  var self = this;

  self.icon = 'code';

  self.description = 'Triggers a certain scenario in Just Macros.'

  self.scenario = '';

  self.inPorts = {
    "scenario": new Port('string'),
    "send": new Port('bang')
  };
  self.outPorts = {
    out:   new Port('all')
  };

  self.inPorts.scenario.on('data', function (data) {
    self.scenario = data;
  });

  self.inPorts.send.on('data', function (data) {
    console.log(self.scenario);
    self.outPorts.out.send(self.scenario);
  });
};

util.inherits(JustMacros, Component);

exports.getComponent = function() {
  return new JustMacros();
};
