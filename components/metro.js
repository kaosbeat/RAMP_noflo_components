var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;


var Metro = function() {
  var self = this;
  self.icon = 'clock-o';
  self.timer = null;
  self.rate = 1000;

  self.inPorts = {
    "start": new Port('bang'),
    "stop": new Port('bang'),
    "rate": new Port('number')
  };
  self.outPorts = {
    out:   new Port('bang')
  };

  self.inPorts.start.on('bang', function () {
    self.timer = setInterval(function() {
      self.outPorts.out.send(true);
    }, self.rate);
    console.log("rate is "+ self.rate);
  });

  self.inPorts.stop.on('data', function () {
    clearTimeout(self.timer);
  });







};

util.inherits(Metro, Component);

exports.getComponent = function() {
  return new Metro();
};
