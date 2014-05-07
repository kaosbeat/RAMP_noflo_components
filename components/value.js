var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var Value = function() {

  var self = this;
  this.value = 0;

  self.inPorts = {
    'value': new Port('integer'),
  };
  self.outPorts = {
    'out':   new Port('integer'),
  };

  self.inPorts.value.on('data', function (data) {
	this.value = data;
    self.outPorts.out.send(self.value);
    }
  });


	};

util.inherits(Value, Component);

exports.getComponent = function() {
  return new Value();
};
