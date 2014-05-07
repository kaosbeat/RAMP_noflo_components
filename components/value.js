var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var Value = function() {

  var self = this;
  self.value = 0;

  self.inPorts = {
    'value': new Port('integer'),
    'bang': new Port('bang')
  };
  self.outPorts = {
    'out':   new Port('integer')
  };

  self.inPorts.value.on('data', function (data) {
	  self.value = data;
    // self.outPorts.out.send(self.value);
  });

  self.inPorts.bang.on('data', function () {
    self.outPorts.out.send(self.value);
    self.outPorts.out.disconnect();
  });


};

util.inherits(Value, Component);

exports.getComponent = function() {
  return new Value();
};
