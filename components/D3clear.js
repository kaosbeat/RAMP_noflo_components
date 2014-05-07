var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var D3clear = function() {
  var self = this;
  self.icon = 'fa-eraser';


  self.inPorts = {
    'clearcanvas': new Port('bang')
  };


  self.outPorts = {
    'clear':   new Port('string')
  };

  self.inPorts.clearcanvas.on('data', function () {
    console.log('sending clear');
    var clear = {
            "type": "clear"
        }
    self.outPorts.clear.send(JSON.stringify(clear));
  });

};

util.inherits(D3clear, Component);

exports.getComponent = function() {
  return new D3clear();
};
