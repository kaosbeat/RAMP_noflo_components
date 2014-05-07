
var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var Modulo = function() {

  var self = this;
  self.divider = 1;
  self.value = 0;

  self.inPorts = {
    'value': new Port('integer'),
    'divider': new Port('integer')
  };
  self.outPorts = {
    'result':   new Port('integer'),
    'remainder': new Port('integer')
  };

  self.inPorts.value.on('data', function (data) {
    self.value = data;
    self.outPorts.result.send(Math.floor(self.value / self.divider));
    self.outPorts.remainder.send(self.value % self.divider);
    console.log("the modulo = " + self.value % self.divider);
  });

  self.inPorts.divider.on('data', function (data) {
    self.divider = data;
  });

};

util.inherits(Modulo, Component);

exports.getComponent = function() {
  return new Modulo();
};
