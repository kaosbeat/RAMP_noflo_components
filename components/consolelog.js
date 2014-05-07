
var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var ConsoleLog = function() {
  var self = this;
  self.string = 0;

  self.inPorts = {
    'string': new Port('string')
  };

  self.inPorts.string.on('data', function (data) {
    self.string = data;
    console.log("Logging info :" + self.string);
  });

};

util.inherits(ConsoleLog, Component);

exports.getComponent = function() {
  return new ConsoleLog();
};
