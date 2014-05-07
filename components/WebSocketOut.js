var util      = require('util');
var noflo     = require('noflo');
var io        = require('socket.io-client');
var Port      = noflo.Port;
var Component = noflo.Component;



var WebSocketOut = function() {
  var self = this;
  // self.inPorts = {
  //   "key": new Port('string')
  // };
  // self.outPorts = {
  //   "out":   new Port('string')
  // };

  // self.inPorts.key.on('disconnect', function () {
  //   self.outPorts.out.disconnect();
  // });
  // self.inPorts.key.on('data', function (data) {
  //   self.outPorts.out.send(data);
  // });
  // // console.log(io);
  // self.socket = io.connect('http://localhost:3001');
  // self.socket.on('connect', function(){
  //   console.log("socket connection established");
  //   self.socket.on('new', self.onSocket);
  //   self.socket.on('disconnect', function(){});
  // });

  // self.onSocket = function(data){
  //   console.log("data triggered");
  //   self.outPorts.out.send(data);
  // }
};


util.inherits(WebSocketOut, Component);

exports.WebSocketOut = function() {
  return new WebSocketOut();
};
