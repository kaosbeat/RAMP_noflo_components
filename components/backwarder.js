var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var Forwarder = function() {
  var self = this;

  self.inPorts = {
    "in": new Port('string')
  };
  self.outPorts = {
    out:   new Port('string')
  };

  self.inPorts.in.on('disconnect', function () {
    self.outPorts.out.disconnect();
  });
  self.inPorts.in.on('data', function (data) {
    self.outPorts.out.send(data);
  });
};

util.inherits(Forwarder, Component);

exports.getComponent = function() {
  return new Forwarder();
};
