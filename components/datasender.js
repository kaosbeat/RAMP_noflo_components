var util      = require('util');
var noflo     = require('noflo');
var Port      = noflo.Port;
var Component = noflo.Component;
var arecibo = "000000101010100000000000010100000101000000010010001000100010010110010101010101010101001001000000000000000000000000000000000000011000000000000000000011010000000000000000000110100000000000000000010101000000000";
var ar = arecibo.split("");


var DataSender = function() {
  var self = this;


  self.inPorts = {
    'send': new Port('bang'),
    'reset': new Port('bang')
  };
  self.outPorts = {
    'out':   new Port('number'),
    'end':   new Port('bang')
  };

  self.inPorts.send.on('data', function () {
    if (ar.length == 0) {
        self.outPorts.end.send(true);
    } else {
      var dar = ar.shift();
      // var intdar = int(dar);
      // console.log(ar[0]);
      self.outPorts.out.send(dar);

    }
  });

  self.inPorts.reset.on('data', function () {
    ar = arecibo.split("");
    self.outPorts.out.disconnect()
    console.log("data has been reset");
  });



};

util.inherits(DataSender, Component);

exports.getComponent = function() {
  return new DataSender();
};
