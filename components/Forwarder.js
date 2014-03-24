var noflo     = require('noflo');


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
  self.inPorts.node.on('data', function (data) {
    self.outPorts.out.send(data);
  });
};

exports.getComponent = function() {
  return new Forwarder();
};
