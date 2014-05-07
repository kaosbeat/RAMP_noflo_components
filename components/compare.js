var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;



var Compare = function() {
  var self = this;
  self.comparator = 0;
  self.value = 0;

  self.inPorts = {
    'value': new Port('integer'),
    'comparator': new Port('integer')
  };
  self.outPorts = {
    'pass':   new Port('bang'),
    'fail':   new Port('bang')
  };

  self.inPorts.value.on('data', function (data) {
    self.value = data;
    if (self.value == self.comparator){
        self.outPorts.pass.send(true);
      }else {
        self.outPorts.fail.send(true);
      }
  });
};

util.inherits(Compare, Component);

exports.getComponent = function() {
  return new Compare();
};
